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
  selector: 'app-text-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
    MatSlideToggle,
  ],
  templateUrl: './text-question.component.html'
})
export class TextQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!:  InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;

  ngOnInit(): void {
    if (this.type === 'form') {
      if (!this.form.contains('multi_line')) {
        this.form.addControl(
          'multi_line',
          this.fb.control(this.entity().multi_line)
        );
      }
    }
  }

  get multi_line(): FormControl {
    return this.form.get('multi_line') as FormControl;
  }
}
