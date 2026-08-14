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
  type: 'question';
  questionId: string;
  questionnaireId?: string;
  function: string;//TemplateVariableFunction;
  start?: string;
  end?: string;
}

// export interface TemplateField {
//   value: string;
//   variables: QuestionTemplateVariable[];
// }

