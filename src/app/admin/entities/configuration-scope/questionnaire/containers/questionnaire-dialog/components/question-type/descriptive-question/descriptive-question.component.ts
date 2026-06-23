import {Component, inject, Input, InputSignal, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
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
  selector: 'app-descriptive-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    QuestionChoicesFormArray,
  ],
  templateUrl: './descriptive-question.component.html'
})
export class DescriptiveQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!:  InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;

  ngOnInit(): void {}
}
