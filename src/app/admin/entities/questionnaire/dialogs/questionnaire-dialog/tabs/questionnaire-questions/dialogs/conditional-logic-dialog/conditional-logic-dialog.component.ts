import {
  AfterViewInit, Component, inject, output, signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent, MatDialogRef, MatDialogTitle,
} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {HttpErrorResponse} from '@angular/common/http';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {
  ErrorMessageBoxComponent
} from '../../../../../../../../../shared/components/message-box/error-message-box.component';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {AppQuestion} from '../../../../../../models/questionnaire';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {form, FormField} from '@angular/forms/signals';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {QuestionnaireDialogStateService} from '../../../../services/questionnaire-dialog-state.service';
import {QuestionType} from '../../components/question-type/question-type.registry';

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


export interface ConditionalLogicItem {
  operand: string;
  operator: string;
  value: string;
}

export interface ConditionalLogicItemForm {
  operand: AppQuestion | null;
  operator: string;
  value: string;
}

@Component({
  selector: 'app-conditional-logic-dialog',
  templateUrl: './conditional-logic-dialog.component.html',
  imports: [
    TranslatePipe,
    MatDialogContent,
    ErrorMessageBoxComponent,
    MatButton,
    MatIcon,
    TagComponent,
    MatIconButton,
    MatDialogTitle,
    MatFormField,
    MatOption,
    MatSelect,
    FormField,
    MatInput,
  ]
})
export class ConditionalLogicDialogComponent implements AfterViewInit {
  protected readonly OPERATORS = OPERATORS;
  protected readonly DialogMode = DialogMode;

  private dialogRef = inject(MatDialogRef<ConditionalLogicDialogComponent>);
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: ConditionalLogicItem[][];
    questions: AppQuestion[];
    selectedIndex: number;
  };

  loading = signal(false);
  error = signal<HttpErrorResponse | null>(null);

  dialogActionEvent = output<{ action: DialogMode | string, entity?: ConditionalLogicItem[][] }>();

  conditionalLogicItemsArray: ConditionalLogicItem[][] = [];
  conditionalLogicString = '';

  model = signal<ConditionalLogicItemForm[][]>(this.toFormModel(this.dialogData.entity ?? []));

  form = form(this.model);

  toFormModel(conditionalLogic: ConditionalLogicItem[][]): ConditionalLogicItemForm[][] {
    return conditionalLogic.map(items => items.map(item => ({
      operand: this.dialogData.questions.find(q => q.field_name === item.operand) ?? null,
      operator: item.operator,
      value: item.value
    })))
  }

  addConditionalLogicItems() {
    this.model.update(items => [...items, [{
      operand: null,
      operator: '',
      value: ''
    }]]);
  }

  // removeConditionalLogicItems(index: number) {
  //   this.model.update(items => {
  //     const newItems = [...items];
  //     newItems.splice(index, 1);
  //     return newItems;
  //   });
  // }

  addConditionalLogicItem(parentIndex: number) {
    this.model.update(items => items.map((group, i) =>
      i === parentIndex
        ? [...group, {operand: null, operator: '', value: ''}]
        : group
    ));
  }

  removeConditionalLogicItem(parentIndex: number, index: number) {
    this.model.update(items => items.map((group, i) =>
      i === parentIndex
        ? group.filter((_, j) => j !== index)
        : group
    ));
  }


  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected handleSaveAction(): void {
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: this.conditionalLogicItemsArray});
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

  // protected onItemEvent(event: ConditionalLogicItem[], index: number) {
  //   if (event.length) {
  //     this.conditionalLogicItemsArray[index] = event;
  //   } else {
  //     this.conditionalLogicItemsArray.splice(index, 1);
  //   }
  //
  //   this.conditionalLogicString = this.conditionalLogicItemsArray.map((conditionalLogicItems) =>
  //     conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
  //   ).join(' or ');
  // }

}
