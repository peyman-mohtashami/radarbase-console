import {AfterViewInit, Component, computed, inject, output, signal,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {AppQuestion, AppQuestionConditionalLogic, QuestionType} from '../../../../../../models/questionnaire';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {applyEach, form, FormField, validate} from '@angular/forms/signals';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
// import {QuestionType} from '../../../questionnaire-preview/question/question-type/question-type.registry';
import {requiredField} from '../../../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

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
  [QuestionType.DATE]: [
    {name: 'Equal', value: 'equal'},
    {name: 'Not Equal', value: 'notEqual'},
    {name: 'Greater Than', value: 'greaterThan'},
    {name: 'Greater Than or Equal', value: 'greaterThanOrEqual'},
    {name: 'Less Than', value: 'lessThan'},
    {name: 'Less Than or Equal', value: 'lessThanOrEqual'},
    {name: 'Is Empty', value: 'isEmpty'},
    {name: 'Is not Empty', value: 'isNotEmpty'},
  ],
  [QuestionType.TIME]: [
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

export type ConditionalLogicForm = ConditionalLogicGroupForm[];
export type ConditionalLogicGroupForm = ConditionalLogicRuleForm[];

export interface  ConditionalLogicRuleForm {
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
  protected readonly OPERATOR_SYMBOLS: Record<string, string> = OPERATOR_SYMBOLS;
  protected readonly DialogMode = DialogMode;

  private dialogRef = inject(MatDialogRef<ConditionalLogicDialogComponent>);
  protected store = inject(QuestionnaireStore);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?:  AppQuestionConditionalLogic;
    questions: AppQuestion[];
    selectedIndex: number;
  };

  dialogActionEvent = output<{ action: DialogMode | string, entity?: AppQuestionConditionalLogic }>();

  model = signal<ConditionalLogicForm>(this.toFormModel(this.dialogData.entity ?? []));

  _lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code
  })

  protected readonly compareQuestions = (a: AppQuestion | null, b: AppQuestion | null) =>
    a?.field_name === b?.field_name;

  protected form = form(this.model, (schema) => {
    applyEach(schema, (group) => {
      applyEach(group, (rule) => {
        requiredField(rule.operand);
        validate(rule.operand, ({value}) => {
          const operand = value();

          if (!operand) {
            return null;
          }

          const isAllowedOperand = this.dialogData.questions
            .slice(0, this.dialogData.selectedIndex)
            .some(question =>
              question.field_name === operand.field_name &&
              question.field_type !== 'descriptive' &&
              question.field_type !== 'audion' &&
              question.field_type !== 'info'
            );

          return isAllowedOperand
            ? null
            : {
              kind: 'invalidOperand',
              message: 'Selected question is no longer available',
            };
        });

        requiredField(rule.operator);
        requiredField(rule.value);
      })
    })
  });

  branching_logic = computed(() => {
    const model = this.model();
    return model.map((conditionalLogicItems) =>
      conditionalLogicItems.map(i => `[${i.operand?.field_name}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
    ).join(' or ') ?? '';
  })

  toFormModel(conditionalLogic: AppQuestionConditionalLogic): ConditionalLogicForm {
    return conditionalLogic.map(items => items.map(item => ({
      operand: this.dialogData.questions.find(q => q.field_name === item.operand) ?? null,
      operator: item.operator,
      value: item.value
    })))
  }

  addConditionalLogicGroup() {
    this.model.update(groups => [...groups, [{
      operand: null,
      operator: '',
      value: ''
    }]]);
  }

  addConditionalLogicRule(parentIndex: number) {
    this.model.update(groups => groups.map((group, i) =>
      i === parentIndex
        ? [...group, {operand: null, operator: '', value: ''}]
        : group
    ));
  }

  removeConditionalLogicRule(parentIndex: number, index: number) {
    this.model.update(groups => groups.map((group, i) =>
      i === parentIndex
         ? group.filter((_, j) => j !== index)
         : group
    ).filter(group => group.length > 0));
  }


  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected handleSaveAction(): void {
    const t = this.model().map((group) => group.map(i => {
      return {operand: i.operand!.field_name, operator: i.operator, value: i.value};
    }));
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: t});
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }
}
