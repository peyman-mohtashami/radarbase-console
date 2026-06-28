import {Component, inject, input, output} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {QuestionType} from '../../../../components/question-type/question-type.registry';


export const ALL_OPERATORS = [
  {name: 'Equal', value: '='},
  {name: 'Not Equal', value: '!='},
  {name: 'Greater Than', value: '>'},
  {name: 'Greater Than or Equal', value: '>='},
  {name: 'Less Than', value: '<'},
  {name: 'Less Than or Equal', value: '<='},
  {name: 'Is Empty', value: 'isEmpty'},
  {name: 'Is not Empty', value: 'isNotEmpty'}
];

export const OPERATORS: Record<string, {name:string; value:string;}[]> = {
  [QuestionType.RADIO]: ALL_OPERATORS,
  [QuestionType.CHECKBOX]: [
    ...ALL_OPERATORS,
    {name: 'Contains', value: 'contains'},
    {name: 'Does Not Contain', value: 'doesNotContain'}
  ],
  [QuestionType.SLIDER]: ALL_OPERATORS,
  [QuestionType.RANGE]: ALL_OPERATORS,
  [QuestionType.YESNO]: [
    {name: 'Equal', value: '='},
    {name: 'Not Equal', value: '!='}
  ],
  // [QuestionType.DESCRIPTIVE]: ALL_OPERATORS,
  [QuestionType.TEXT]: [
    {name: 'Equal', value: '='},
    {name: 'Not Equal', value: '!='},
    // {name: 'Contains', value: 'contains'},
    // {name: 'Does Not Contain', value: 'doesNotContain'},
    // {name: 'Starts With', value: 'startsWith'},
    // {name: 'Ends With', value: 'endsWith'},
    // {name: 'Is Empty', value: 'isEmpty'}
  ],
  [QuestionType.NUMBER]: ALL_OPERATORS,
  [QuestionType.DATETIME]: ALL_OPERATORS,
  [QuestionType.DURATION]: ALL_OPERATORS,
  // [QuestionType.TIMED]: ALL_OPERATORS,
  // [QuestionType.AUDIO]: ALL_OPERATORS,
}

@Component({
  selector: 'app-conditional-logic-operator-selector',
  templateUrl: './conditional-logic-operator-selector.component.html',
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

  protected readonly OPERATORS = OPERATORS;

  question = input.required<AppQuestion>();
  conditionalLogicItem = input<ConditionalLogicItem>();

  selectionChange= output<string>();

  protected onInputChange(event: MatSelectChange<string>) {
    this.selectionChange.emit(event.value);
  }

  // protected OPERATORS = [
  //   {name: 'Equal', value: '='},
  //   {name: 'Not Equal', value: '!='},
  //   {name: 'Greater Than', value: '>'},
  //   {name: 'Greater Than or Equal', value: '>='},
  //   {name: 'Less Than', value: '<'},
  //   {name: 'Less Than or Equal', value: '<='},
  //   // {name: 'Contains', value: 'contains'},
  //   // {name: 'Does Not Contain', value: 'doesNotContain'},
  //   // {name: 'Starts With', value: 'startsWith'},
  //   // {name: 'Ends With', value: 'endsWith'},
  //   // {name: 'Is Empty', value: 'isEmpty'}
  // ]

  // protected availableOperators = this.OPERATORS.filter((operator) =>
  //   operator.value !== this.conditionalLogicItem()?.operator);
}
