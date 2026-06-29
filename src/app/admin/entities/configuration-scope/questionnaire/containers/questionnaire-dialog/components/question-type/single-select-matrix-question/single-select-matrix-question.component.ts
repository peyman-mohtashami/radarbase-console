import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion, AppQuestionnaire} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../containers/questionnaire-questions/question-choices-form-array/question-choices-form-array';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
// import {
//   QuestionButtonComponent
// } from '../../../containers/questionnaire-questions/question-button/question-button.component';
import {MatDialog} from '@angular/material/dialog';
import {
  QuestionDialogComponent
} from '../../../containers/questionnaire-questions/question-dialog/question-dialog.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {AppUiQuestion} from '../../../containers/questionnaire-questions/questionnaire-questions.component';
import {QUESTION_TYPES} from '../question-type.registry';
import {RangeQuestionComponent} from '../range-question/range-question.component';

@Component({
  selector: 'app-single-select-matrix-question',
  imports: [
    ReactiveFormsModule,
    MatButton,
    CdkDropList,
    TranslatePipe,
    CdkDrag,
    // QuestionButtonComponent,
    RangeQuestionComponent,
    MatIcon,
    // TranslatePipe,
    // MatIcon,
    // QuestionChoicesFormArray,
    // MatRadioButton,
    // MatRadioGroup,
    // MatFormField,
    // MatOption,
    // MatSelect,
    // MatButton,
    // ReplacePlaceholdersPipe,
    // QuestionHeaderComponent,
    // CdkDrag,
    // CdkDropList,
    // QuestionButtonComponent,
  ],
  templateUrl: './single-select-matrix-question.component.html'
})
export class SingleSelectMatrixQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.selectedQuestionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  protected dialog = inject(MatDialog);

  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  changeEvent = output<Partial<AppQuestionnaire>>();
  validEvent = output<boolean>();

  questions: AppUiQuestion[] = [];

  ngOnInit(): void {
    if (this.type === 'form') {
      // if (!this.form.contains('select_choices_or_calculations')) {
      //   this.form.addControl(
      //     'select_choices_or_calculations',
      //     this.fb.array([])
      //   );
      // }
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  protected onLogicInputChange(value: MatSelectChange<string>) {
    this.logicValueChange.emit(value.value);
  }

  protected onPreviewInputChange(value: string | null) {
    this.previewValueChange.emit(value);
  }

  protected addQuestion(type: string) {
    this.questions.push({
      id: `${Date.now()}`,
      field_name: '',
      field_label: {},
      field_type: type,
      _dragId: crypto.randomUUID(),
    });

    this.changeEvent.emit({questions: this.questions});
  }

  protected removeQuestion(index: number) {
    this.questions.splice(index, 1);

    this.validEvent.emit(this.questions.every(q => q.valid));
    this.changeEvent.emit({questions: this.questions});
  }

  protected onSelectQuestion(index: number, question: AppQuestion) {
    this.openQuestionDialog(index, question);
  }

  protected onDrop(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.questions,
      event.previousIndex,
      event.currentIndex
    );

    this.questions = [...this.questions];

    this.changeEvent.emit({
      questions: this.questions
    });
  }

  openQuestionDialog(index: number, question: AppQuestion) {
    // const dialogRef = this.dialog.open(QuestionDialogComponent, {
    //   id: 'matrix-question-dialog',
    //   // data: {id: 'matrix-question-dialog', entity: question, questions: this.questions, index: index, mode: DialogMode.EDIT},
    //   panelClass: 'tailwind-slide-panel',
    //   width: '70%',
    //   height: '100vh',
    //   position: {top: '0', right: '0'},
    //   hasBackdrop: true,
    //   disableClose: true,
    //   autoFocus: false,
    //   restoreFocus: false
    // });
    //
    // const dialogActionSubscription =
    //   dialogRef.componentInstance.changeEvent.subscribe(
    //     (value) => {
    //       this.questions = this.questions.map((q, i) => i === index ? {...q, ...value} : q);
    //       this.validEvent.emit(this.questions.every(q => q.valid));
    //       this.changeEvent.emit({questions: this.questions});
    //     }
    //   );
    //
    // dialogRef.afterClosed().subscribe(() => {
    //   dialogActionSubscription.unsubscribe();
    // });
  }
}
