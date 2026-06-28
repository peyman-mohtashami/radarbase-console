import {Component, inject, Input, InputSignal, OnInit, output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatHint, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {MatButton} from '@angular/material/button';
import {
  QuestionHeaderComponent
} from '../../../containers/questionnaire-preview/question/question-header/question-header.component';
import {Validator as CustomValidator} from '../../../../../../../../../shared/utils/validators';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSlideToggle} from '@angular/material/slide-toggle';

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
  ],
  templateUrl: './datetime-question.component.html'
})
export class DatetimeQuestionComponent implements OnInit {
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

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('date_type')) {
        this.form.addControl('date_type', this.fb.control(this.entity().date_type ??'date'));
      }
      if (!this.form.contains('date_min')) {
        this.form.addControl(
          'date_min',
          this.fb.control(this.entity().date_min)
        );
      }
      if (!this.form.contains('date_max')) {
        this.form.addControl(
          'date_max',
          this.fb.control(this.entity().date_max)
        );
      }
    }
  }

  get date_type(): FormControl {
    return this.form.get('date_type') as FormControl;
  }

  get date_min(): FormControl {
    return this.form.get('date_min') as FormControl;
  }

  get date_max(): FormControl {
    return this.form.get('date_max') as FormControl;
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

  protected onPreviewInputChange(event: MatDatepickerInputEvent<Date> | null) {
    if (event === null) {
      return this.previewValueChange.emit(null);
    }
    const value = event.value;
    if (!value) return;
    const timestamp = `${value.getTime()}`;
    this.previewValueChange.emit(timestamp);
  }

  // protected onDateChange($event: MatDatepickerInputEvent<any, any>) {
  //
  // }
}
