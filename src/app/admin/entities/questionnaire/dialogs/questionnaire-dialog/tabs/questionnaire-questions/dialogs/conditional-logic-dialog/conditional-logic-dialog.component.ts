import {AfterViewInit, Component, computed, inject, output, signal,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';

import {TranslatePipe} from "@ngx-translate/core";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {AppQuestion, AppQuestionConditionalLogic, QuestionType} from '../../../../../../models/questionnaire';
import {animateDialogIn, animateDialogOut} from '../../../../../../../../shared/utils/dialog.util';
import {applyEach, FieldTree, form, FormField, validate} from '@angular/forms/signals';
import {MatFormField, MatInput, MatSuffix} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {requiredField} from '../../../../../../../../../shared/utils/signal-form-validators';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerToggle
} from '@angular/material/datepicker';

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
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatSuffix,
  ]
})
export class ConditionalLogicDialogComponent implements AfterViewInit {
  protected readonly QuestionType = QuestionType;
  protected readonly OPERATORS = OPERATORS;
  protected readonly OPERATOR_SYMBOLS: Record<string, string> = OPERATOR_SYMBOLS;
  protected readonly DialogMode = DialogMode;

  private dialogRef = inject(MatDialogRef<ConditionalLogicDialogComponent>);
  protected store = inject(QuestionnaireStore);

  protected dialogData = inject(MAT_DIALOG_DATA) as {
    id: string;
    mode: DialogMode;
    entity?: AppQuestionConditionalLogic;
    question: AppQuestion;
    questions: AppQuestion[];
    selectedIndex: number;
  };

  dialogActionEvent = output<{ action: DialogMode | string, entity?: AppQuestionConditionalLogic }>();

  _lang = computed(() => {
    return this.store.selected()!.defaultLanguage.code
  })

  protected readonly compareQuestions = (a: AppQuestion | null, b: AppQuestion | null) =>
    a?.field_name === b?.field_name;

  model = signal<ConditionalLogicForm>(this.toFormModel(this.dialogData.entity ?? []));

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
    return model.map(
      (group) =>
        group.map(
          rule =>
            `[${rule.operand?.field_name}]${OPERATOR_SYMBOLS[rule.operator]}'${rule.value}'`
        ).join(' and ')
    ).join(' or ') ?? '';
  })

  toFormModel(conditionalLogic: AppQuestionConditionalLogic): ConditionalLogicForm {
    return conditionalLogic.map(
      group => group.map(
        rule => ({
          operand: this.dialogData.questions.find(q => q.field_name === rule.operand) ?? null,
          operator: rule.operator,
          value: rule.value
        })
      )
    );
  }

  addConditionalLogicGroup() {
    this.model.update(conditionalLogic => [
      ...conditionalLogic,
      [{
        operand: null,
        operator: '',
        value: ''
      }]
    ]);
  }

  addConditionalLogicRule(parentIndex: number) {
    this.model.update(conditionalLogic => conditionalLogic.map(
      (group, i) =>
        i === parentIndex ? [...group, {operand: null, operator: '', value: ''}] : group
    ));
  }

  protected toDate(value: string): Date | null {
    if (!value) return null;
    const timestamp = Number(value);
    return Number.isNaN(timestamp) ? null : new Date(timestamp);
  }

  protected setDateValue(field: FieldTree<string>, event: MatDatepickerInputEvent<Date>) {
    const date = event.value;
    const state = field();
    state.value.set(date ? `${date.getTime()}` : '');
    state.markAsDirty();
    state.markAsTouched();
  }

  removeConditionalLogicRule(parentIndex: number, index: number) {
    this.model.update(conditionalLogic => conditionalLogic.map(
      (group, i) =>
        i === parentIndex ? group.filter((_, j) => j !== index) : group
    ).filter(group => group.length > 0));
  }


  ngAfterViewInit() {
    animateDialogIn(this.dialogData.id);
  }

  protected handleSaveAction(): void {
    const validatedModel = this.model().map(
      (group) => group.map(
        rule => ({operand: rule.operand!.field_name, operator: rule.operator, value: rule.value})
      )
    );
    this.dialogActionEvent.emit({action: this.dialogData.mode, entity: validatedModel});
  }

  close() {
    animateDialogOut(this.dialogData.id, this.dialogRef);
  }

}
