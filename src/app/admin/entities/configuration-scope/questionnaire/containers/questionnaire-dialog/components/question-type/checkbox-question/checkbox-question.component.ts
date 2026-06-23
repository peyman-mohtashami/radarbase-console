import {Component, inject, Input, InputSignal, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../../containers/questionnaire-questions/question-choices-form-array/question-choices-form-array';

@Component({
  selector: 'app-checkbox-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
  ],
  templateUrl: './checkbox-question.component.html'
})
export class CheckboxQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!: InputSignal<RadarOption>;
  @Input({ required: true }) entity!: InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('select_choices_or_calculations')) {
        this.form.addControl(
          'select_choices_or_calculations',
          this.fb.array([])
        );
      }
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }
}
