import {
  AfterViewInit,
  Component,
  ComponentRef,
  inject,
  OnInit, signal, Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AppQuestion, QuestionType} from '../../../../../../models/questionnaire';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {QuestionsStore} from '../../services/questions.store';
import {checkValidation} from '../../../../services/utils';
import {outputToObservable} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs/operators';
import {RadioQuestionComponent} from '../../question-type/radio-question/radio-question.component';
import {PreviewStore} from '../../../questionnaire-preview/services/preview.store';
import {InfoQuestionComponent} from '../../question-type/info-question/info-question.component';
import {CheckboxQuestionComponent} from '../../question-type/checkbox-question/checkbox-question.component';
import {SliderQuestionComponent} from '../../question-type/slider-question/slider-question.component';
import {RangeQuestionComponent} from '../../question-type/range-question/range-question.component';
import {TextQuestionComponent} from '../../question-type/text-question/text-question.component';
import {DateQuestionComponent} from '../../question-type/date-question/date-question.component';
import {TimeQuestionComponent} from '../../question-type/time-question/time-question.component';
import {AudioQuestionComponent} from '../../question-type/audio-question/audio-question.component';
import {TimedQuestionComponent} from '../../question-type/timed-question/timed-question.component';
import {CalcQuestionComponent} from '../../question-type/calc-question/calc-question.component';
import {DescriptiveQuestionComponent} from '../../question-type/descriptive-question/descriptive-question.component';
import {YesNoQuestionComponent} from '../../question-type/yesno-question/yesno-question.component';
import {NumberQuestionComponent} from '../../question-type/number-question/number-question.component';
import {VariableQuestionComponent} from '../../question-type/variable-question/variable-question.component';

export const QUESTION_COMPONENTS: Record<string, Type<unknown>> = {
  [QuestionType.DESCRIPTIVE]: DescriptiveQuestionComponent,
  [QuestionType.INFO]: InfoQuestionComponent,
  [QuestionType.RADIO]: RadioQuestionComponent,
  [QuestionType.YESNO]: YesNoQuestionComponent,
  [QuestionType.CHECKBOX]: CheckboxQuestionComponent,
  [QuestionType.SLIDER]: SliderQuestionComponent,
  [QuestionType.RANGE]: RangeQuestionComponent,
  [QuestionType.TEXT]: TextQuestionComponent,
  [QuestionType.NUMBER]: NumberQuestionComponent,
  [QuestionType.DATE]: DateQuestionComponent,
  [QuestionType.TIME]: TimeQuestionComponent,
  [QuestionType.AUDIO]: AudioQuestionComponent,
  [QuestionType.TIMED]: TimedQuestionComponent,
  [QuestionType.CALC]: CalcQuestionComponent,
  [QuestionType.VARIABLE]: VariableQuestionComponent
}


@Component({
  selector: 'app-question-dialog',
  imports: [
    MatDialogContent,
    TranslatePipe,
    MatButton,
    MatDialogTitle,
  ],
  templateUrl: './question-dialog.component.html'
})
export class QuestionDialogComponent implements OnInit, AfterViewInit {
  protected readonly QuestionType = QuestionType;
  protected readonly DialogMode = DialogMode;

  protected store = inject(QuestionnaireStore);
  protected questionsStore = inject(QuestionsStore);
  protected dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<QuestionDialogComponent>);

  dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity: AppQuestion;
    questions: AppQuestion[];
    index: number;
    matrixIndex?: number;
  };

  _questionnaire = this.store.selected()!;
  _lang = this._questionnaire.defaultLanguage.code;

  _question = this.dialogData.entity;
  question = signal<AppQuestion>(this.dialogData.entity);

  previewStore = inject(PreviewStore);

  host = viewChild('questionHost', { read: ViewContainerRef });
  private componentRef?: ComponentRef<any>;
  private currentFieldType?: string;

  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  ngOnInit() {
    this.questionsStore.question.set(this._question);
    this.questionsStore.index.set(this.dialogData.index);
    this.loadQuestionEditor();
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    const question = this.dialogData.entity;
    const componentType = QUESTION_COMPONENTS[question.field_type];
    // if (!componentType) return;

    if (!this.componentRef || this.currentFieldType !== question.field_type) {
      host.clear();
      this.componentRef = host.createComponent(componentType);
      this.currentFieldType = question.field_type;

      outputToObservable(this.componentRef.instance.valueChange)
        .pipe(debounceTime(300))
        .subscribe((value) => {
          this.question.set(value as AppQuestion);
        });
    }

    this.componentRef.setInput('matrixIndex', this.dialogData.matrixIndex);
    this.componentRef.setInput('questionnaire', this.store.selected());
    this.componentRef.setInput('language', this.previewStore.language());
    this.componentRef.setInput('answer', question.field_name ? this.previewStore.answers()[question.field_name]?.[0] : null);
  }

  protected handleSaveAction(): void {

    this.store.selected.update(value => {
      const questions = value!.questions.map(q => {
        if (q.id === this._question.id) {
          return this.question();
        }
        return q;
      }) ?? [];
      const validated = checkValidation(questions);
      return {
        ...value!,
        questions: [...validated],
        isQuestionsTabValid: validated.every(q => q.isValid)
      }
    })

    this.close();
  }

  close() {
    this.questionsStore.question.set(null);
    this.questionsStore.index.set(null);
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }
}
