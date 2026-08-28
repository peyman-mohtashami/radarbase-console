import { Node, mergeAttributes } from '@tiptap/core';

export interface QuestionReferenceAttributes {
  questionId: string;
  questionName: string;
}

export const QuestionReference = Node.create({
  name: 'questionReference',

  group: 'inline',

  inline: true,

  atom: true,

  selectable: true,

  addAttributes() {
    return {
      questionId: {
        default: null,
      },

      questionName: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-question-reference]',
      },
    ];
  },

  // renderHTML({ HTMLAttributes }) {
  //   return [
  //     'span',
  //     mergeAttributes(
  //       HTMLAttributes,
  //       {
  //         'data-question-reference': '',
  //         class: 'question-reference',
  //       }
  //     ),
  //     `{{${HTMLAttributes['data-question-name']}}}`,
  //   ];
  // },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        HTMLAttributes,
        {
          'data-question-reference': '',
          'data-question-id': node.attrs['questionId'],
          'data-question-name': node.attrs['questionName'],
          class: 'question-reference',
        }
      ),
      node.attrs['questionName'],
    ];
  }
});
