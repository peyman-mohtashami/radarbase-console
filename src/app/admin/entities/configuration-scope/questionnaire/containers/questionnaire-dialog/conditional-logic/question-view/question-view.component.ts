import {Component, inject, input, output} from '@angular/core'
import {AppQuestion} from '../../../../models/questionnaire';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';

@Component({
  selector: 'app-question-view',
  templateUrl: 'question-view.component.html',
  imports: [
    MatRadioButton,
    MatRadioGroup,
  ],
})
export class QuestionViewComponent {

  question = input.required<AppQuestion>();
  conditionalLogicItem = input<ConditionalLogicItem>();
  questionnaireStateService = inject(QuestionnaireStateService);
  selectionChange = output<any>();

  protected onInputChange(value: any) {
    this.selectionChange.emit(value);
  }
}
