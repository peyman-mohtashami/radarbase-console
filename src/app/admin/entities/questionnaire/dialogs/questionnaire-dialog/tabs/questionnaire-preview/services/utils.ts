import {AnswerWithTimeLog} from '../models/kafka';
import {AppQuestionConditionalLogic} from '../../../../../models/questionnaire';
import {isArray} from '@ngx-translate/core';

export function evaluateConditionalLogic(answers: Record<string, AnswerWithTimeLog>, conditionalLogic: AppQuestionConditionalLogic) {
  return conditionalLogic.some(group => {
    return group.every(rule => {
      const operand = answers[rule.operand]?.value;
      if (!operand) return false;
      const value = rule.value;
      switch(rule.operator) {
        case 'equal':
          if (isArray(operand)) {
            return operand.some(item => item === value);
          }
          return operand === value;
        case 'notEqual':
          return operand !== value;
        case 'greaterThan':
          return Number(operand) > Number(value);
        case 'greaterThanOrEqual':
          return Number(operand) >= Number(value);
        case 'lessThan':
          return Number(operand) < Number(value);
        case 'lessThanOrEqual':
          return Number(operand) <= Number(value);
        case 'isEmpty':
          return operand === null || operand === undefined || operand === '';
        case 'isNotEmpty':
          return operand !== null && operand !== undefined;
        case 'contains':
          return operand?.includes(value);
        default:
          return true;
      }

    })
  })
}


export function extractPlaceholders(str?: string) {
  const matches = str?.match(/\[([^[\]]+)]/g);
  if (!matches) {
    return [];
  }
  return matches.map(match => match.slice(1, -1));
}
