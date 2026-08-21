export type TemplateVariableFunction =
  | 'value'
  | 'average'
  | 'sum'
  | 'min'
  | 'max'
  | 'first'
  | 'last';

export interface QuestionTemplateVariable {
  id: string;
  name: string;
  type: 'reservedVariable' | 'question' | 'questionnaire' | 'topic';
  reservedVariable?: string;
  questionId?: string;
  questionnaireId?: string;
  method?: string;//TemplateVariableFunction;
  start?: string;
  end?: string;
  function?: string;
  topic?: string;
  topicVariable?: string;
}

// export interface TemplateField {
//   value: string;
//   variables: QuestionTemplateVariable[];
// }

