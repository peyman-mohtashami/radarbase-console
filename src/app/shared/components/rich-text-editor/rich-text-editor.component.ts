import {
  Component,
  OnDestroy,
  input,
  output,
} from '@angular/core';

import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TiptapEditorDirective } from 'ngx-tiptap';
import Color from '@tiptap/extension-color';
import {TextStyle} from '@tiptap/extension-text-style';
import {FormsModule} from '@angular/forms';
import {
  QuestionReference
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-reference/question-reference.component';
import {MatDialog} from '@angular/material/dialog';
import {
  Question,
  QuestionPickerDialogComponent
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-picker-dialog/question-picker-dialog.component';

@Component({
  selector: 'app-rich-text-editor',
  imports: [TiptapEditorDirective, FormsModule],
  templateUrl: './rich-text-editor.component.html',
  styles: `
    .editor-container {
      border: 1px solid #d1d5db;
      border-radius: 6px;
      overflow: hidden;
    }

    .toolbar {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px;
      border-bottom: 1px solid #d1d5db;
      background: #f9fafb;
    }

    .toolbar button {
      border: 0;
      background: transparent;
      padding: 6px 9px;
      border-radius: 4px;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #e5e7eb;
    }

    .toolbar button.active {
      background: #dbeafe;
    }

    .toolbar button:disabled {
      opacity: 0.4;
      cursor: default;
    }

    .separator {
      width: 1px;
      height: 24px;
      background: #d1d5db;
      margin: 0 4px;
    }

    /*
     * Tiptap creates a ProseMirror element dynamically.
     */

    :host ::ng-deep .ProseMirror {
      min-height: 200px;
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
      min-height: 200px;
      padding: 16px;
      outline: none;
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
      min-height: 300px;
      padding: 16px;

      border: 0;
      outline: none;

      font-family: monospace;
      font-size: 14px;
      line-height: 1.5;

      resize: vertical;
    }

    :host ::ng-deep .question-reference {
      display: inline-flex;
      align-items: center;

      padding: 2px 8px;

      margin: 0 2px;

      border-radius: 9999px;

      background: #e0e7ff;
      color: #3730a3;

      font-size: 0.875rem;
      font-weight: 500;

      white-space: nowrap;

      cursor: pointer;
    }
  `,
})
export class RichTextEditorComponent implements OnDestroy {

  readonly content = input<string>('');

  readonly contentChange = output<string>();

  readonly editor = new Editor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: false,
        allowBase64: false,
      }),
      TextStyle,
      Color,
      QuestionReference
    ],

    content: this.content(),

    onUpdate: ({ editor }) => {
      this.contentChange.emit(editor.getHTML());
    },
  });

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private readonly dialog: MatDialog,
  ) {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  toggleBold(): void {
    this.editor.chain().focus().toggleBold().run();
  }

  toggleItalic(): void {
    this.editor.chain().focus().toggleItalic().run();
  }

  toggleUnderline(): void {
    this.editor.chain().focus().toggleUnderline().run();
  }

  toggleStrike(): void {
    this.editor.chain().focus().toggleStrike().run();
  }

  setParagraph(): void {
    this.editor.chain().focus().setParagraph().run();
  }

  setHeading(level: 1 | 2 | 3): void {
    this.editor
      .chain()
      .focus()
      .toggleHeading({ level })
      .run();
  }

  toggleBulletList(): void {
    this.editor.chain().focus().toggleBulletList().run();
  }

  toggleOrderedList(): void {
    this.editor.chain().focus().toggleOrderedList().run();
  }

  toggleBlockquote(): void {
    this.editor.chain().focus().toggleBlockquote().run();
  }

  undo(): void {
    this.editor.chain().focus().undo().run();
  }

  redo(): void {
    this.editor.chain().focus().redo().run();
  }

  isActive(name: string, level?: number): boolean {
    return this.editor.isActive(name, {level: level});
  }

  insertImage(): void {
    const url = window.prompt('Image URL');

    if (!url) {
      return;
    }

    this.editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: '',
      })
      .run();
  }

  selectedColor = '#000000';

  setColor(event: Event): void {
    const color = (event.target as HTMLInputElement).value;

    this.selectedColor = color;

    this.editor
      .chain()
      .focus()
      .setColor(color)
      .run();
  }

  unsetColor(): void {
    this.editor
      .chain()
      .focus()
      .unsetColor()
      .run();
  }

  sourceMode = false;

  sourceHtml = '';

  toggleSourceMode(): void {
    if (!this.sourceMode) {
      // Editor → HTML
      this.sourceHtml = this.editor.getHTML();
      this.sourceMode = true;

      return;
    }

    // HTML → Editor
    this.editor.commands.setContent(this.sourceHtml);

    this.sourceMode = false;
  }

  previousQuestions: Question[] = [
    {
      id: 'sport',
      name: 'Which sport do you play?',
    },
    {
      id: 'score',
      name: 'What was your score?',
    },
    {
      id: 'duration',
      name: 'How long did you play?',
    },
  ];

  openQuestionPicker(): void {
    const dialogRef = this.dialog.open(
      QuestionPickerDialogComponent,
      {
        width: '500px',
        data: {
          questions: this.previousQuestions,
        },
      }
    );

    dialogRef.afterClosed().subscribe(
      (question: Question | undefined) => {

        if (!question) {
          return;
        }

        this.insertQuestionReference(question);
      }
    );
  }

  insertQuestionReference(question: Question): void {
    this.editor
      .chain()
      .focus()
      .insertContent({
        type: 'questionReference',

        attrs: {
          questionId: question.id,
          questionName: question.name,
        },
      })
      .run();
  }
}
