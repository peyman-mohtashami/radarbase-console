import {Component, Input, InputSignal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {
  RadarOption
} from '../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../models/questionnaire';
import {ValidatorError} from '../../../../../../../../../shared/utils/validators';

@Component({
  selector: 'app-audio-question',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './audio-question.component.html'
})
export class AudioQuestionComponent {

  protected readonly ValidatorError = ValidatorError;

  @Input({ required: true }) type!: 'form' | 'button'| 'preview';
  @Input({ required: true }) language!: InputSignal<RadarOption>;
  @Input({ required: true }) entity!: InputSignal<AppQuestion>;
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) languages!: RadarOption[];
  @Input({ required: true }) index!: number;
}
