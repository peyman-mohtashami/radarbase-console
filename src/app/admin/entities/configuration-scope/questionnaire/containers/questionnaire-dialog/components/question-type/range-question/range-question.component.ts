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

@Component({
  selector: 'app-range-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatSlideToggle,
  ],
  templateUrl: './range-question.component.html'
})
export class RangeQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!:  InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
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
      if (!this.form.contains('show_selected_label')) {
        this.form.addControl(
          'show_selected_label',
          this.fb.control(this.entity().show_selected_label)
        );
      }
    }
  }

  get choices(): FormArray {
    return this.form.get('select_choices_or_calculations') as FormArray;
  }

  get show_selected_label(): FormControl {
    return this.form.get('show_selected_label') as FormControl;
  }
}
