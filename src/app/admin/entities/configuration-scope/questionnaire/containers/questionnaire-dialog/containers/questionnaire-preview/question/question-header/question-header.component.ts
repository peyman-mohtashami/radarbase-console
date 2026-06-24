import {Component, inject, input} from '@angular/core'
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {
  RadarOption
} from '../../../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe, JsonPipe],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  language = input<RadarOption>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);

  questionnaireStateService = inject(QuestionnaireDialogStateService);

}
