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
  selector: 'app-timed-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatError,
    MatFormField,
    MatInput,
  ],
  templateUrl: './timed-question.component.html'
})
export class TimedQuestionComponent implements OnInit {
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
      if (!this.form.contains('field_annotation')) {
        this.form.addControl(
          'field_annotation',
          this.fb.group({
            image: this.fb.control(this.entity().field_annotation?.image, {validators: [CustomValidator.requiredValidator]}),
            unit: this.fb.control(this.entity().field_annotation?.unit, {validators: [CustomValidator.requiredValidator]}),
            timer: this.fb.group({
              start: this.fb.control(this.entity().field_annotation?.timer?.start, {validators: [CustomValidator.requiredValidator]}),
              end: this.fb.control(this.entity().field_annotation?.timer?.end, {validators: [CustomValidator.requiredValidator]}),
            })
          })
        );
      }
    }
  }

  get field_annotation(): FormGroup {
    return this.form.get('field_annotation') as FormGroup;
  }

  get timer(): FormGroup {
    return this.field_annotation.get('timer') as FormGroup;
  }
}
