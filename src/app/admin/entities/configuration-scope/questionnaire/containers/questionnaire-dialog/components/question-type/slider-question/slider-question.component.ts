import {Component, inject, Input, InputSignal, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {Validator as CustomValidator, ValidatorError} from '../../../../../../../../../shared/utils/validators';
import {MatError, MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-slider-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
  ],
  templateUrl: './slider-question.component.html'
})
export class SliderQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  protected readonly ValidatorError = ValidatorError;

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!: InputSignal<RadarOption>;
  @Input({ required: true }) entity!: InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('range')) {
        this.form.addControl(
          'range',
          this.fb.group({
            min: this.fb.control(this.entity().range?.min, {validators: [CustomValidator.requiredValidator]}),
            max: this.fb.control(this.entity().range?.max, {validators: [CustomValidator.requiredValidator]}),
            step: this.fb.control(this.entity().range?.step, {validators: [CustomValidator.requiredValidator]}),
          })
        );
      }
    }
  }

  get range(): FormGroup {
    return this.form.get('range') as FormGroup;
  }
}
