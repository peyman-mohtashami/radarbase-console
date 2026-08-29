import {Injector} from '@angular/core';
import {Node, mergeAttributes} from '@tiptap/core';
import {AngularNodeViewRenderer} from 'ngx-tiptap';
import {QuestionReferenceComponent} from './question-reference.component';

export const QuestionReference = (injector: Injector) => {
  return Node.create({
    name: 'questionReference',
    group: 'inline',
    inline: true,
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes() {
      return {
        questionName: {
          default: '',
        },
      };
    },

    parseHTML() {
      return [{tag: 'span[data-question-reference]'}];
    },

    renderHTML({node, HTMLAttributes}) {
      return [
        'span',
        mergeAttributes(
          HTMLAttributes,
          {
            'data-question-reference': '',
          },
        ),
        `[[${node.attrs['questionName']}]]`,
      ];
    },

    addNodeView() {
      return AngularNodeViewRenderer(QuestionReferenceComponent, {injector});
    }
  });
};
