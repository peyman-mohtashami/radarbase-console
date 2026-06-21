import { Type } from '@angular/core';
import {RadioQuestionComponent} from './question-types/radio-question/radio-question.component';

export enum QuestionType {
  Radio = 'radio',
}

// export const QUESTION_COMPONENTS: Record<QuestionType, Type<any>> = {
//   [QuestionType.Radio]: RadioQuestionComponent,
// };

export const QUESTION_COMPONENTS: Record<string, Type<any>> = {
  [QuestionType.Radio]: RadioQuestionComponent,
};
