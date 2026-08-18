// // import {AnswerWithTimeLog} from "../../../core/data-ingestion/kafka/models/kafka";
//
//
// import {AnswerWithTimeLog} from '../models/kafka';
//
// export function evaluateConditionalLogic(answers: Record<string, AnswerWithTimeLog>, conditionalLogic: string) {
//   const orArray = parseConditionString(conditionalLogic);
//   return orArray.some(andArray => andArray.every(c => checkSingleCondition(c, answers)));
// }
//
// export function parseConditionString(str: string): string[][] {
//   return str
//     .split(/\s+or\s+/)
//     .map(orPart => orPart.split(/\s+and\s+/).map(s => s.trim()));
// }
//
// export function checkSingleCondition(condition: string, answers: Record<string, AnswerWithTimeLog>) {
//   // Match pattern: [operand] operator stringValue
//   const regex = /^\[([^\]]+)]\s*(<=|>=|!=|<>|<|>|=)\s*(.+)$/;
//   const match = condition.match(regex);
//
//   if (!match) return true; //! throw Error
//
//   const operand = match[1];
//   const operator = match[2];
//   let stringValue = match[3].trim();
//
//   // Remove quotes if present
//   if ((stringValue.startsWith("'") && stringValue.endsWith("'")) ||
//     (stringValue.startsWith('"') && stringValue.endsWith('"'))) {
//     stringValue = stringValue.slice(1, -1);
//   }
//
//   // Convert to number if it's a valid number
//   const numValue = Number(stringValue);
//   const value = !isNaN(numValue) && stringValue !== '' ? numValue : stringValue;
//
//   const stringAnswer = answers[operand]?.value; // convert it to number if it is a number otherwise text
//   const numAnswer = Number(stringAnswer);
//   const answer = !isNaN(numAnswer) && stringAnswer !== '' ? numAnswer : stringAnswer;
//
//   if (answer === undefined || answer === null) return true; //! throw Error
//
//   switch (operator) {
//     case '<=': return answer <= value;
//     case '>=': return answer >= value;
//     case '!=': return answer !== value;
//     case '<': return answer < value;
//     case '>': return answer > value;
//     case '=': return answer === value;
//   }
//
//   return true; //! throw Error;
// }
