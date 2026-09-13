import {AfterViewInit, Component, ElementRef, ViewChild, input, inject} from '@angular/core';
import {EditorState, StateField} from '@codemirror/state';
import {EditorView, WidgetType, Decoration, DecorationSet} from '@codemirror/view';
import {basicSetup} from 'codemirror';
import {html} from '@codemirror/lang-html';
import {MatDialog} from '@angular/material/dialog';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {FieldTree} from '@angular/forms/signals';
import {
  QuestionPickerDialogComponent
} from '../../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-picker-dialog/question-picker-dialog.component';
import {AppQuestion} from '../../../../admin/entities/questionnaire/models/questionnaire';
import {QuestionnaireStore} from '../../../../admin/entities/questionnaire/services/questionnaire.store';
import {MatTooltip} from '@angular/material/tooltip';
import {TranslatePipe} from '@ngx-translate/core';
import {MatError} from '@angular/material/input';
import {LabelFormFieldComponent} from '../label-form-field/label-form-field.component';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styles: `
    .html-editor ::ng-deep .cm-question-chip {
      display: inline-flex;
      align-items: center;
      gap: 3px;

      padding: 2px 4px 2px 7px;
      margin: 0 2px;

      border-radius: 999px;

      background: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);

      font-family: inherit;
      font-size: 11px;
      line-height: 18px;

      white-space: nowrap;
      vertical-align: middle;

      user-select: none;
    }

    .html-editor ::ng-deep .cm-question-chip-icon {
      font-family: 'Material Symbols Outlined', serif;
      font-size: 12px;
      line-height: 14px;
    }

    .html-editor ::ng-deep .cm-question-chip-text {
      padding: 0 3px;
      font-weight: 500;
    }

    .html-editor ::ng-deep .cm-question-chip-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 18px;
      height: 18px;

      padding: 0;
      margin: 0;

      border: 0;
      border-radius: 50%;

      background: transparent;
      color: inherit;

      cursor: pointer;
    }

    .html-editor ::ng-deep .cm-question-chip-button:hover {
      background: color-mix(
        in srgb,
        currentColor 12%,
        transparent
      );
    }

    .html-editor ::ng-deep .cm-question-chip-button .material-symbols-outlined {
      font-size: 14px;
      line-height: 14px;
    }

    .html-editor.error ::ng-deep .cm-editor {
      border: solid 1px var(--mat-sys-error);
    }
  `,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip,
    TranslatePipe,
    MatError,
    LabelFormFieldComponent,
  ]
})
export class HtmlEditorComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);
  private store = inject(QuestionnaireStore);

  @ViewChild('editorContainer', {static: true})
  editorContainer!: ElementRef<HTMLDivElement>;

  readonly field = input.required<FieldTree<string>>();
  readonly label = input.required<string | null>();

  readonly required = input(false);
  questionIndex = input<number>();
  questionPicker = input<boolean>(true);
  picker = input<boolean>(true);
  readonly errors = input<'none' | 'one' | 'all'>('one');

  private editorView?: EditorView;

  private questionDecorationField!: StateField<DecorationSet>;

  ngAfterViewInit(): void {
    this.createEditor();
  }

  private createEditor(): void {
    this.questionDecorationField = this.createQuestionDecorationField();

    const state = EditorState.create({
      doc: this.field()().value(),
      extensions: [
        basicSetup,
        html(),
        EditorView.lineWrapping,
        this.questionDecorationField,
        EditorView.atomicRanges.of(view => view.state.field(this.questionDecorationField)),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            this.field()().value.set(update.state.doc.toString());
            this.field()().markAsDirty();
          }
          if (update.focusChanged && !update.view.hasFocus) {
            this.field()().markAsTouched();
          }
        }),

        EditorView.theme({
          '&': {
            width: '100%',
            height: '100%',
            fontSize: '12px',

            border: '1px solid var(--mat-sys-outline)',
            borderRadius: '4px',
            boxSizing: 'border-box',
            backgroundColor: 'transparent',

            transition: 'border-color 150ms ease, box-shadow 150ms ease',
          },

          '&:focus-within': {
            borderColor: 'var(--mat-sys-primary)',
            boxShadow: 'inset 0 0 0 1px var(--mat-sys-primary)',
          },

          '.cm-scroller': {
            overflow: 'auto',
          },

          '.cm-content': {
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
            padding: '6px 16px',
          },

          '.cm-line': {
            padding: '0',
          },

          '.cm-activeLine': {
            backgroundColor: 'transparent',
          },

          '.cm-activeLineGutter': {
            backgroundColor: 'transparent',
          },

          '.cm-gutters': {
            display: 'none',
          },

          '&.cm-focused': {
            outline: 'none',
          },
        }),
      ],
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement,
    });
  }

  private createQuestionDecorationField(): StateField<DecorationSet> {
    return StateField.define<DecorationSet>({
      create: state => {
        return this.buildQuestionDecorations(state);
      },
      update: (decorations, transaction) => {
        if (!transaction.docChanged) return decorations;
        return this.buildQuestionDecorations(transaction.state);
      },
      provide: field => EditorView.decorations.from(field),
    });
  }

  private buildQuestionDecorations(state: EditorState): DecorationSet {
    const decorations = [];
    const text = state.doc.toString();
    const regex = /\[\[([^\]]*)]]/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[0];
      const variableName = match[1].trim();
      const question = this.questionPicker() ? this.store.selected()?.questions.find(q => q.field_name === variableName) : variableName;
      const from = match.index;
      const to = from + fullMatch.length;

      decorations.push(
        Decoration.replace({
          widget: new QuestionChipWidget(
            this.questionPicker(),
            question!,
            () => {
              this.removeQuestion(from, to);
            },
          ),
          inclusive: false,
        }).range(from, to),
      );
    }

    return Decoration.set(decorations, true);
  }

  protected openQuestionPickerDialog(): void {
    const editor = this.editorView;
    if (!editor) return;

    const selection = editor.state.selection;

    const dialogRef = this.dialog.open(
      QuestionPickerDialogComponent,
      {
        width: '500px',
        data: {questionPicker: this.questionPicker(), questionIndex: this.questionIndex()},
      },
    );

    dialogRef.afterClosed().subscribe(
      (question: AppQuestion | string | undefined) => {
        if (!question) return;


        const placeholder = this.questionPicker() ? `[[${(question as AppQuestion).field_name}]]` : `[[${(question as string)}]]`;

        const from = selection.main.from;
        const to = selection.main.to;

        editor.dispatch({
          changes: {from, to, insert: placeholder},
          selection: {anchor: from + placeholder.length},
          scrollIntoView: true,
        });

        editor.focus();
      },
    );
  }

  private removeQuestion(from: number, to: number): void {
    const editor = this.editorView;
    if (!editor) return;

    editor.dispatch({
      changes: {
        from,
        to,
        insert: '',
      },
      selection: {
        anchor: from,
      },
      scrollIntoView: true,
    });

    editor.focus();
  }
}

class QuestionChipWidget extends WidgetType {
  constructor(
    private readonly isQuestion: boolean,
    private readonly question: AppQuestion | string,
    private readonly onRemove: () => void,
  ) {
    super();
  }

  toDOM(): HTMLElement {
    const chip = document.createElement('span');
    chip.className = 'cm-question-chip';
    const text = document.createElement('span');
    text.className = 'cm-question-chip-text';
    text.textContent = this.isQuestion ? `[[ ${(this.question as AppQuestion).field_name} ]]` : `[[${(this.question as string)}]]`;

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'cm-question-chip-button';
    removeButton.title = 'Remove question';
    removeButton.innerHTML = `<span class="material-symbols-outlined"> close </span>`;

    removeButton.addEventListener(
      'mousedown',
      event => {
        event.preventDefault();
        event.stopPropagation();
      },
    );

    removeButton.addEventListener(
      'click',
      event => {
        event.preventDefault();
        event.stopPropagation();

        this.onRemove();
      },
    );

    chip.appendChild(text);
    chip.appendChild(removeButton);

    return chip;
  }

  override eq(other: QuestionChipWidget): boolean {
    return (
      other instanceof QuestionChipWidget &&
      other.question === this.question
    );
  }

  override ignoreEvent(): boolean {
    return false;
  }
}
