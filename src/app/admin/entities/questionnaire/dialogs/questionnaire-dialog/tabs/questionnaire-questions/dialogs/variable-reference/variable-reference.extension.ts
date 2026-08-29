import {Injector} from '@angular/core';
import {Node, mergeAttributes} from '@tiptap/core';
import {AngularNodeViewRenderer} from 'ngx-tiptap';
import {VariableReferenceComponent} from './variable-reference.component';

export const VariableReference = (injector: Injector) => {
  return Node.create({
    name: 'variableReference',
    group: 'inline',
    inline: true,
    atom: true,
    selectable: true,
    draggable: false,
    addAttributes() {
      return {
        variable: {
          default: null,
        },
        // variableId: {
        //   default: null,
        // },
        // variableName: {
        //   default: '',
        // },
      };
    },

    parseHTML() {
      return [{tag: 'span[data-variable-reference]'}];
    },

    renderHTML({node, HTMLAttributes}) {
      return [
        'span',
        mergeAttributes(
          HTMLAttributes,
          {
            'data-variable-reference': '',
            // 'data-variable': node.attrs['variable'],
            'data-variable-id': JSON.parse(node.attrs['variable']).id,
            // 'data-variable-name': node.attrs['variableName'],
          },
        ),
        // `{{${node.attrs['variableName']}}}`,
        `{{${JSON.parse(node.attrs['variable']).name}}}`,
      ];
    },

    addNodeView() {
      return AngularNodeViewRenderer(VariableReferenceComponent, {injector});
    }
  });
};
