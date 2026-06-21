import {Component, Input, InputSignal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  RadarOption
} from '../../../../../../../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component';
import {AppQuestion} from '../../../../../../../models/questionnaire';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {JsonPipe} from '@angular/common';
@Component({
  selector: 'app-radio-question',
  imports: [
    ReactiveFormsModule,
    TranslatePipe,
    MatIcon,
    JsonPipe
  ],
  templateUrl: './radio-question.component.html'
})
export class RadioQuestionComponent {
  @Input({ required: true }) language!:  InputSignal<RadarOption>;
  @Input({ required: true }) entity!:  InputSignal<AppQuestion>;
}
