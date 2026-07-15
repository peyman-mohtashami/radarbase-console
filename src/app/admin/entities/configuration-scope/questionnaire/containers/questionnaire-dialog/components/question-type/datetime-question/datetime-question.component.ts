import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../models/questionnaire';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {Validator as CustomValidator} from '../../../../../../../../../shared/utils/validators';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatIcon} from '@angular/material/icon';
import {AnswerWithTimeLog} from '../../../containers/questionnaire-preview/models/kafka';

@Component({
  selector: 'app-datetime-question',
  imports: [
    ReactiveFormsModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatSuffix,
    MatButton,
    MatHint,
    MatLabel,
    QuestionHeaderComponent,
    MatOption,
    MatSelect,
    TranslatePipe,
    MatSlideToggle,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './datetime-question.component.html'
})
export class DatetimeQuestionComponent implements OnInit {
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
      if (!this.form.contains('date_type')) {
        this.form.addControl('date_type', this.fb.control(this.entity().date_type ??'date'));
      }
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

  get date_type(): FormControl {
    return this.form.get('date_type') as FormControl;
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

  protected get logicDateValue(): Date | null {
    if (!this.value) return null;

    const timestamp = Number(this.value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  protected onLogicInputChange(event: MatDatepickerInputEvent<Date>) {
    const value = event.value;
    if (!value) return;
    const timestamp = `${value.getTime()}`;
    this.logicValueChange.emit(timestamp);
  }

  protected get previewDateValue(): Date | null {
    if (!this.answer()?.value) return null;

    const timestamp = Number(this.answer().value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  protected onPreviewDateInputChange(event: MatDatepickerInputEvent<Date> | null) {
    if (event === null) {
      return this.previewValueChange.emit(null);
    }
    const value = event.value;
    if (!value) return;
    const timestamp = `${value.getTime()}`;
    this.previewValueChange.emit(timestamp);
  }

  protected onPreviewTimeInputChange(event: Event | null) {
    if (event === null) {
      this.previewValueChange.emit(null);
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    this.previewValueChange.emit(value);
  }

  // protected onDateChange($event: MatDatepickerInputEvent<any, any>) {
  //
  // }
}
