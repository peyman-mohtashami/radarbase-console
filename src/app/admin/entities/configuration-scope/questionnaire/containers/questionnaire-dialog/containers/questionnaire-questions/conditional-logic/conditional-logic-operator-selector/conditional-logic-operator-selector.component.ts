import {Component, inject, input, output} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {ConditionalLogicItem} from '../conditional-logic-dialog/conditional-logic-dialog.component';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';

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

  question = input.required<AppQuestion>();
  conditionalLogicItem = input<ConditionalLogicItem>();

  selectionChange= output<string>();

  questionnaireStateService = inject(QuestionnaireDialogStateService);

  protected onInputChange(event: MatSelectChange<string>) {
    this.selectionChange.emit(event.value);
  }

  protected OPERATORS = [
    {name: 'Equal', value: '='},
    {name: 'Not Equal', value: '!='},
    {name: 'Greater Than', value: '>'},
    {name: 'Greater Than or Equal', value: '>='},
    {name: 'Less Than', value: '<'},
    {name: 'Less Than or Equal', value: '<='},
    // {name: 'Contains', value: 'contains'},
    // {name: 'Does Not Contain', value: 'doesNotContain'},
    // {name: 'Starts With', value: 'startsWith'},
    // {name: 'Ends With', value: 'endsWith'},
    // {name: 'Is Empty', value: 'isEmpty'}
  ]
}
