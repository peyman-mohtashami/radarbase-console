import {Component, inject, Input, InputSignal, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../containers/questionnaire-questions/question-choices-form-array/question-choices-form-array';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatInput} from '@angular/material/input';

@Component({
  selector: 'app-number-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatSlideToggle,
    MatFormField,
    MatInput,
  ],
  templateUrl: './number-question.component.html'
})
export class NumberQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!:  InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;

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
    }
  }

  get text_validation_min(): FormControl {
    return this.form.get('text_validation_min') as FormControl;
  }

  get text_validation_max(): FormControl {
    return this.form.get('text_validation_max') as FormControl;
  }
}
