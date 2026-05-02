import { Component, input } from '@angular/core'
// import { AppQuestion } from '../../../../../core/app-lifecycle/questionnaire/models/question'
// import { ReplacePlaceholdersPipe } from '../../../pipes/replace-placeholders.pipe'
import {AppQuestion} from '../../models/question';
import {ReplacePlaceholdersPipe} from '../../pipes/replace-placeholders.pipe';

@Component({
  selector: 'app-question-header',
  imports: [ReplacePlaceholdersPipe],
  templateUrl: './question-header.component.html',
})
export class QuestionHeaderComponent {
  question = input.required<AppQuestion>();
  label = input<boolean>(true);
  sectionHeader = input<boolean>(true);
  note = input<boolean>(true);
}
