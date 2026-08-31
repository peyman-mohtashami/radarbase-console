import {
  Component,
  OnDestroy,
  input,
  inject, OnInit, signal, Injector,
} from '@angular/core';

import {Editor, Extension, mergeAttributes} from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TiptapEditorDirective } from 'ngx-tiptap';
import Color from '@tiptap/extension-color';
import {TextStyle} from '@tiptap/extension-text-style';
import {FormsModule} from '@angular/forms';
// import {
//   QuestionReference
// } from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-reference/question-reference.component';
import {MatDialog} from '@angular/material/dialog';
import {
  QuestionPickerDialogComponent
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-picker-dialog/question-picker-dialog.component';
import {MatIcon} from '@angular/material/icon';
import {FieldTree} from '@angular/forms/signals';
import {AppQuestion} from '../../../admin/entities/questionnaire/models/questionnaire';
import {
  VariableDialogComponent
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-variables/dialogs/variable-dialog/variable-dialog.component';
import {
  QuestionTemplateVariable
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-variables/model/template-field.model';
import {
  QuestionReference
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-reference/question-reference.extension';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {
  VariableReference
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/variable-reference/variable-reference.extension';

@Component({
  selector: 'app-rich-text-editor',
  imports: [TiptapEditorDirective, FormsModule, MatIcon, MatIconButton, MatTooltip, HtmlEditorComponent],
  templateUrl: './rich-text-editor.component.html',
  styles: `
    //.editor-container {
    //  border: 1px solid #d1d5db;
    //  border-radius: 6px;
    //  overflow: hidden;
    //}
    //
    //.toolbar {
    //  display: flex;
    //  align-items: center;
    //  gap: 4px;
    //  padding: 6px;
    //  border-bottom: 1px solid #d1d5db;
    //  background: #f9fafb;
    //}

    //.toolbar button {
    //  border: 0;
    //  background: transparent;
    //  padding: 6px 9px;
    //  border-radius: 4px;
    //  cursor: pointer;
    //}

    //.toolbar button:hover {
    //  background: #e5e7eb;
    //}
    //
    //.toolbar button.active {
    //  background: #dbeafe;
    //}
    //
    //.toolbar button:disabled {
    //  opacity: 0.4;
    //  cursor: default;
    //}

    //.separator {
    //  width: 1px;
    //  height: 24px;
    //  background: #d1d5db;
    //  margin: 0 4px;
    //}

    /*
     * Tiptap creates a ProseMirror element dynamically.
     */

    :host ::ng-deep .ProseMirror {
      min-height: 100px;
      padding: 16px;
      outline: none;
    }

    :host ::ng-deep .ProseMirror p {
      margin: 0 0 8px;
    }

    :host ::ng-deep .ProseMirror h1 {
      font-size: 2rem;
      font-weight: 700;
      margin: 16px 0 8px;
    }

    :host ::ng-deep .ProseMirror h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 14px 0 8px;
    }

    :host ::ng-deep .ProseMirror h3 {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 12px 0 8px;
    }

    :host ::ng-deep .ProseMirror ul,
    :host ::ng-deep .ProseMirror ol {
      padding-left: 24px;
    }

    :host ::ng-deep .ProseMirror blockquote {
      border-left: 3px solid #d1d5db;
      padding-left: 16px;
      margin-left: 0;
    }

    :host ::ng-deep .ProseMirror {
      min-height: 30px;
      padding: 8px;
      outline: none;
      font-size: 12px;
    }

    :host ::ng-deep .ProseMirror p {
      margin: 0 0 8px;
    }

    :host ::ng-deep .ProseMirror ul {
      list-style-type: disc;
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    :host ::ng-deep .ProseMirror ol {
      list-style-type: decimal;
      padding-left: 1.5rem;
      margin: 0.5rem 0;
    }

    :host ::ng-deep .ProseMirror li {
      margin: 0.25rem 0;
    }

    :host ::ng-deep .ProseMirror blockquote {
      border-left: 3px solid #d1d5db;
      padding-left: 16px;
      margin-left: 0;
    }

    .source-editor {
      display: block;
      width: 100%;
      min-height: 30px;
      padding: 8px;

      border: 0;
      outline: none;

      font-family: monospace;
      font-size: 12px;
      line-height: 1.5;

      resize: vertical;
    }

    //:host ::ng-deep .question-reference {
    //  display: inline-flex;
    //  align-items: center;
    //
    //  padding: 2px 8px;
    //
    //  margin: 0 2px;
    //
    //  border-radius: 9999px;
    //
    //  background: rgb(16 121 95 / 0.2);
    //  color: #10795f;
    //
    //  font-size: 0.875rem;
    //  font-weight: 500;
    //
    //  white-space: nowrap;
    //
    //  cursor: pointer;
    //}
  `,
})
export class RichTextEditorComponent implements OnInit, OnDestroy {
  protected dialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  readonly formField = input.required<FieldTree<string>>();
  hideQuestionPicker = input<boolean>(false);
  questionIndex = input<number>();

  readonly editor = signal<Editor | null>(null);

  ngOnInit() {
    const value = this.formField()().value();

    this.editor.set(
      new Editor({
        extensions: [
          // StarterKit,
          //
          // Image.configure({
          //   inline: false,
          //   allowBase64: false,
          // }),
          //
          // TextStyle,
          // Color,
          // QuestionReference(
          //   this.injector,
          // ),
          // VariableReference(
          //   this.injector,
          // ),

          StarterKit,

          TextStyle,
          Color,

          HtmlAttributes,

          Image.configure({
            inline: false,
            allowBase64: false,
          }),
          Iframe,

          QuestionReference(
            this.injector,
          ),

          VariableReference(
            this.injector,
          ),
        ],

        content: value ?? '',

        onUpdate: ({ editor }) => {
          this.formField()().value.set(editor.getHTML());
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.editor()?.destroy();
  }

  toggleBold(): void {
    this.editor()?.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor()?.chain().focus().toggleItalic().run();
  }

  toggleUnderline(): void {
    this.editor()?.chain().focus().toggleUnderline().run();
  }

  toggleStrike(): void {
    this.editor()?.chain().focus().toggleStrike().run();
  }

  setParagraph(): void {
    this.editor()?.chain().focus().setParagraph().run();
  }

  setHeading(level: 1 | 2 | 3): void {
    this.editor()?.chain().focus().toggleHeading({ level }).run();
  }

  toggleBulletList(): void {
    this.editor()?.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor()?.chain().focus().toggleOrderedList().run();
  }

  toggleBlockquote(): void {
    this.editor()?.chain().focus().toggleBlockquote().run();
  }

  undo(): void {
    this.editor()?.chain().focus().undo().run();
  }

  redo(): void {
    this.editor()?.chain().focus().redo().run();
  }

  isActive(name: string, level?: number): boolean {
    return !!this.editor()?.isActive(name, {level: level});
  }

  insertImage(): void {
    const url = window.prompt('Image URL');

    if (!url) {
      return;
    }

    this.editor()?.chain().focus().setImage({
      src: url,
      alt: '',
    }).run();
  }

  selectedColor = '#000000';

  setColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;

    this.selectedColor = color;

    this.editor()?.chain().focus().setColor(color).run();
  }

  unsetColor(): void {
    this.editor()?.chain().focus().unsetColor().run();
  }

  sourceMode = false;

  sourceHtml = '';

  toggleSourceMode(): void {
    if (!this.sourceMode) {
      this.sourceHtml = this.editor()?.getHTML() ?? '';
      this.sourceMode = true;
      return;
    }

    this.editor()?.commands.setContent(this.sourceHtml);
    this.sourceMode = false;
  }

  openQuestionPicker(): void {
    const dialogRef = this.dialog.open(
      QuestionPickerDialogComponent,
      {
        width: '500px',
        data: {
          questionIndex: this.questionIndex(),
        },
      }
    );

    dialogRef.afterClosed().subscribe(
      (question: AppQuestion | undefined) => {
        if (!question) return;
        this.insertQuestionReference(question);
      }
    );
  }

  insertQuestionReference(question: AppQuestion): void {
    this.editor()?.chain().focus().insertContent({
      type: 'questionReference',

      attrs: {
        // questionId: question.id,
        questionName: question.field_name,
      },
    }).run();


  }

  openVariablePicker(): void {
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode: 'insert'},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        console.log('Class: RichTextEditorComponent, Function: , Line 371 variable' , variable);
        if (!variable) return;
        this.insertVariableReference(variable);
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  insertVariableReference(variable: QuestionTemplateVariable): void {
    this.editor()?.chain().focus().insertContent({
        type: 'variableReference',
        attrs: {
          variable: JSON.stringify(variable),
          // variableId: variable.id,
          // variableName: variable.name,
        },
      }).run();
  }
}


export const HtmlAttributes = Extension.create({
  name: 'htmlAttributes',

  addGlobalAttributes() {
    return [
      {
        types: [
          'paragraph',
          'heading',
          'blockquote',
          'bulletList',
          'orderedList',
          'listItem',
          'image',
          'horizontalRule',
        ],

        attributes: {
          class: {
            default: null,

            parseHTML: element =>
              element.getAttribute('class'),

            renderHTML: attributes =>
              attributes['class']
                ? { class: attributes['class'] }
                : {},
          },

          style: {
            default: null,

            parseHTML: element =>
              element.getAttribute('style'),

            renderHTML: attributes =>
              attributes['style']
                ? { style: attributes['style'] }
                : {},
          },
        },
      },
    ];
  },
});

import { Node } from '@tiptap/core';
import {HtmlEditorComponent} from '../html-editor/html-editor.component';

export const Iframe = Node.create({
  name: 'iframe',

  group: 'block',

  atom: true,

  selectable: true,

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: element => element.getAttribute('src'),
        renderHTML: attributes =>
          attributes['src']
            ? { src: attributes['src'] }
            : {},
      },

      title: {
        default: null,
        parseHTML: element => element.getAttribute('title'),
        renderHTML: attributes =>
          attributes['title']
            ? { title: attributes['title'] }
            : {},
      },

      width: {
        default: null,
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes =>
          attributes['width']
            ? { width: attributes['width'] }
            : {},
      },

      height: {
        default: null,
        parseHTML: element => element.getAttribute('height'),
        renderHTML: attributes =>
          attributes['height']
            ? { height: attributes['height'] }
            : {},
      },

      class: {
        default: null,
        parseHTML: element => element.getAttribute('class'),
        renderHTML: attributes =>
          attributes['class']
            ? { class: attributes['class'] }
            : {},
      },

      style: {
        default: null,
        parseHTML: element => element.getAttribute('style'),
        renderHTML: attributes =>
          attributes['style']
            ? { style: attributes['style'] }
            : {},
      },

      allow: {
        default: null,
        parseHTML: element => element.getAttribute('allow'),
        renderHTML: attributes =>
          attributes['allow']
            ? { allow: attributes['allow'] }
            : {},
      },

      allowfullscreen: {
        default: false,
        parseHTML: element =>
          element.hasAttribute('allowfullscreen'),
        renderHTML: attributes =>
          attributes['allowfullscreen']
            ? { allowfullscreen: '' }
            : {},
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(HTMLAttributes),
    ];
  },
});
