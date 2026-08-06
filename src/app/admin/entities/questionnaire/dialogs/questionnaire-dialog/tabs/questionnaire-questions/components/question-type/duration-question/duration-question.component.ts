import {Component, inject, Input, InputSignal, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionnaireLanguage} from '../../../../../../../models/questionnaire';
import {
  QuestionChoicesFormArray
} from '../../question-choices-form-array/question-choices-form-array';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-duration-question',
  imports: [
    ReactiveFormsModule,
    // TranslatePipe,
    // MatIcon,
    // QuestionChoicesFormArray,
    // MatSlideToggle,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './duration-question.component.html'
})
export class DurationQuestionComponent implements OnInit {
  private fb = inject(FormBuilder);

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!:  InputSignal<AppQuestionnaireLanguage>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: AppQuestionnaireLanguage[];
  @Input({ required: true }) index!: number;

  ngOnInit(): void {
  }
}
