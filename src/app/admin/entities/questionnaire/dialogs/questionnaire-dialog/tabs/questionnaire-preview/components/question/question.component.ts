import {
  Component, effect,
  input,
  OnInit,
  output, viewChild, ViewContainerRef,
  ComponentRef, inject
} from '@angular/core'
import {AnswerWithTimeLog} from '../../models/kafka';
import {AppQuestion, AppQuestionnaire, QuestionType} from '../../../../../../models/questionnaire';
import {debounceTime} from 'rxjs/operators';
import {outputToObservable} from '@angular/core/rxjs-interop';
import {PreviewStore} from '../../services/preview.store';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import { Type } from '@angular/core';
import {RadioQuestionComponent} from '../question-type/radio-question/radio-question.component';
import {CheckboxQuestionComponent} from '../question-type/checkbox-question/checkbox-question.component';
import {SliderQuestionComponent} from '../question-type/slider-question/slider-question.component';
import {RangeQuestionComponent} from '../question-type/range-question/range-question.component';
import {YesNoQuestionComponent} from '../question-type/yesno-question/yesno-question.component';
import {InfoQuestionComponent} from '../question-type/info-question/info-question.component';
import {DescriptiveQuestionComponent} from '../question-type/descriptive-question/descriptive-question.component';
import {TextQuestionComponent} from '../question-type/text-question/text-question.component';
import {NumberQuestionComponent} from '../question-type/number-question/number-question.component';
import {AudioQuestionComponent} from '../question-type/audio-question/audio-question.component';
import {TimedQuestionComponent} from '../question-type/timed-question/timed-question.component';
import {CalculationQuestionComponent} from '../question-type/calculation-question/calculation-question.component';
import {DateQuestionComponent} from '../question-type/date-question/date-question.component';
import {TimeQuestionComponent} from '../question-type/time-question/time-question.component';
import {VariableQuestionComponent} from '../question-type/variable-question/variable-question.component';


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
  [QuestionType.CALC]: CalculationQuestionComponent,
  [QuestionType.VARIABLE]: VariableQuestionComponent,
}


@Component({
  selector: 'app-question',
  templateUrl: 'question.component.html',
})
export class QuestionComponent implements OnInit {

  store = inject(QuestionnaireStore);
  previewStore = inject(PreviewStore);

  question = input.required<AppQuestion>();
  questionnaire = input<AppQuestionnaire>();

  answerEvent = output<AnswerWithTimeLog>()

  startTime = Date.now();

  host = viewChild('questionHost', { read: ViewContainerRef });

  private componentRef?: ComponentRef<any>;
  private currentFieldType?: string;

  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    const question = this.question();
    const componentType = QUESTION_COMPONENTS[question.field_type];
    // if (!componentType) return;

    if (!this.componentRef || this.currentFieldType !== question.field_type) {
      host.clear();
      this.componentRef = host.createComponent(componentType);
      this.currentFieldType = question.field_type;

      outputToObservable(this.componentRef.instance.valueChange)
        .pipe(debounceTime(300))
        .subscribe((value: any) => {
          this.emitAnswer(value);
        });
    }

    this.componentRef.setInput('language', this.previewStore.language());
    this.componentRef.setInput('question', question);
    this.componentRef.setInput('questionnaire', this.store.selected());
    this.componentRef.setInput('answer', question.field_name ? this.previewStore.answers()[question.field_name]?.[0] : null);
  }

  ngOnInit(): void {
    // this.question().editable = true; //this.protocol().editable
    this.startTime = Date.now()
  }

  emitAnswer(event: string | null): void {
    const { required_field, field_name, field_type } = this.question();
    const answer = this.createAnswer(field_name, field_type, event);
    this.answerEvent.emit(answer);
  }

  private createAnswer(id: string, type: string, value: string | null): AnswerWithTimeLog {
    return {
      id,
      type,
      value,
      startTime: this.startTime,
      endTime: Date.now()
    };
  }
}
