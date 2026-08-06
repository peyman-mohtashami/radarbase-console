import {Component, inject, input, output, ChangeDetectionStrategy} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {AppQuestion} from '../../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../../services/questionnaire-dialog-state.service';
import {QuestionType} from '../../../components/question-type/question-type.registry';

export const OPERATOR_SYMBOLS: Record<string, string> = {
  equal: '=',
  notEqual: '!=',
  greaterThan: '>',
  greaterThanOrEqual: '>=',
  lessThan: '<',
  lessThanOrEqual: '<=',
  isEmpty: '=',
  isNotEmpty: '!=',
  contains: '∋',
  doesNotContain: '∌',
  matchRegexp: '=~',
};

export const OPERATORS: Record<string, {name: string; value: string}[]> = {
  [QuestionType.RADIO]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.SLIDER]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.RANGE]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.NUMBER]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.DATETIME]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.YESNO]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.TEXT]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Contains', value: 'contains'},
    {name: 'Does Not Contain', value: 'doesNotContain'},
    {name: 'Match regex', value: 'matchRegexp'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.CHECKBOX]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
}

@Component({
  selector: 'app-conditional-logic-operator-selector',
  templateUrl: './conditional-logic-operator-selector.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    FormsModule,
    MatFormField,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
  ],
})
export class OperatorSelectorComponent {
  questionnaireStateService = inject(QuestionnaireDialogStateService);

  question = input.required<AppQuestion>();
  conditionalLogicItem = input<ConditionalLogicItem>();

  selectionChange= output<string>();

  protected onInputChange(event: MatSelectChange<string>) {
    this.selectionChange.emit(event.value);
  }

  protected readonly OPERATORS = OPERATORS;
}
