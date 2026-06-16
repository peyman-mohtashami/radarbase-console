import {Component, inject, input, OnInit, output} from '@angular/core';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {QuestionViewComponent} from '../question-view/question-view.component';
// import {AppQuestion} from '../../../../models/questionnaire';
// import {QuestionnaireStateService} from '../../services/questionnaire-state.service';
import {
  OperatorSelectorComponent
} from '../conditional-logic-operator-selector/conditional-logic-operator-selector.component';
import {QuestionnaireStateService} from '../../../../services/questionnaire-state.service';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-conditional-logic-item',
  templateUrl: './conditional-logic-item.component.html',
  imports: [
    MatIcon,
    MatFormField,
    MatIconButton,
    MatOption,
    MatSelect,
    QuestionViewComponent,
    OperatorSelectorComponent,
    JsonPipe,
  ],
})
export class ConditionalLogicItemComponent implements OnInit {
  questions = input.required<AppQuestion[]>();
  index = input.required<number>();
  conditionalLogicItem = input.required<ConditionalLogicItem>();
  selectedIndex = input.required<number>();

  removeEvent = output<number>();
  itemEvent = output<ConditionalLogicItem>();

  // protected questionnaireStateService = inject(QuestionnaireStateService);

  selectedQuestion?: AppQuestion;

  operand = '';
  operator= '';
  value = '';

  ngOnInit() {
    this.selectedQuestion = this.questions().find((question) => question.field_name === this.conditionalLogicItem().operand);
    this.operand = this.conditionalLogicItem().operand;
    this.operator= this.conditionalLogicItem().operator;
    this.value = this.conditionalLogicItem().value;
  }

  removeItem(index: number) {
    this.removeEvent.emit(index);
  }

  protected onOperandChange(event: MatSelectChange<string>) {
    this.operand = event.value;
    this.selectedQuestion = this.questions().find((question) => question.field_name === this.operand);
    if (this.operand && this.operator && this.value) {
      this.itemEvent.emit({operand: this.operand, operator: this.operator, value: this.value})
    }
  }

  protected onOperatorChange(event: string) {
    this.operator = event;
    if (this.operand && this.operator && this.value) {
      this.itemEvent.emit({operand: this.operand, operator: this.operator, value: this.value})
    }
  }

  protected onValueChange(event: any) {
    this.value = event;
    if (this.operand && this.operator && this.value) {
      this.itemEvent.emit({operand: this.operand, operator: this.operator, value: this.value})
    }
  }
}
