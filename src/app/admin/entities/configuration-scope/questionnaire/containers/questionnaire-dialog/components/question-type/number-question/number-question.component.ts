import {Component, inject, Input, InputSignal, OnInit, output, signal, ChangeDetectionStrategy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {MatFormField, MatHint, MatInput} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {ReplacePlaceholdersPipe} from '../../../containers/questionnaire-preview/pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-number-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatFormField,
    MatInput,
    MatButton,
    QuestionHeaderComponent,
    ReplacePlaceholdersPipe,
    MatHint,
  ],
  providers: [ReplacePlaceholdersPipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './number-question.component.html'
})
export class NumberQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogState = inject(QuestionnaireDialogStateService);
  private replacePlaceholdersPipe = inject(ReplacePlaceholdersPipe);

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

  protected error: any;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('text_validation_min')) {
        this.form.addControl(
          'text_validation_min',
          this.fb.control(this.entity().text_validation_min)
        );
      }
      if (!this.form.contains('text_validation_max')) {
        this.form.addControl(
          'text_validation_max',
          this.fb.control(this.entity().text_validation_max)
        );
      }
      if (!this.form.contains('matrix_group_name')) {
        this.form.addControl(
          'matrix_group_name',
          this.fb.control(this.entity().matrix_group_name)
        );
      }
    }
  }

  get text_validation_min(): FormControl {
    return this.form.get('text_validation_min') as FormControl;
  }

  get text_validation_max(): FormControl {
    return this.form.get('text_validation_max') as FormControl;
  }

  get matrix_group_name(): FormControl {
    return this.form.get('matrix_group_name') as FormControl;
  }

  protected onLogicInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.logicValueChange.emit(value);
  }

  protected onPreviewInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      this.error = null;
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    this.validate(value);

    if (this.error === null) {
      this.previewValueChange.emit(value);
    }
  }

  validate(valueString: string) {
    const minValueString = this.replacePlaceholdersPipe.transform(this.entity()?.text_validation_min);
    const maxValueString = this.replacePlaceholdersPipe.transform(this.entity().text_validation_max);

    const value = parseFloat(valueString);
    const minValue = minValueString !== undefined ? parseFloat(minValueString) : undefined;
    const maxValue = maxValueString !== undefined ? parseFloat(maxValueString) : undefined;

    if (minValue !== undefined && value < minValue) {
      this.error = "MIN_VALIDATION_ERROR";
      return;
    } else if (maxValue !== undefined && value > maxValue) {
      this.error = "MAX_VALIDATION_ERROR";
      return;
    } else {
      this.error = null;
    }
  }

  protected readonly Number = Number;
}
