import {Component, inject, Input, InputSignal, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../tabs/questionnaire-questions/question-choices-form-array/question-choices-form-array';
import {MatCard, MatCardContent} from '@angular/material/card';
import {
  QuestionHeaderComponent
} from '../../../tabs/questionnaire-preview/question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../tabs/questionnaire-preview/pipes/replace-placeholders.pipe';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-info-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    // MatCard,
    // MatCardContent,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './info-question.component.html'
})
export class InfoQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview' | 'logic';
  @Input() language = signal(this.dialogState.questionnaire()!.defaultLanguage);
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;
  @Input({ required: true }) value!: string;
  @Input({ required: true }) operator!: string;
  @Input({required: true}) answer!: InputSignal<{ value: string}>;

  logicValueChange = output<string>();

  protected isPreviewDisabled = false;
  previewValueChange = output<string | null>();

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('select_choices_or_calculations')) {
        this.form.addControl(
          'select_choices_or_calculations',
          this.fb.array([])
        );
      }
    }
    if (this.type === 'preview') {
      this.onPreviewInputChange(`${Date.now()}`);
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
}
