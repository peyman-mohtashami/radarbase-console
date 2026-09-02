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
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-picker-dialog/question-picker-dialog.component';
import {AppQuestion} from '../../../admin/entities/questionnaire/models/questionnaire';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styles: `
    .html-editor ::ng-deep .cm-variable-chip {
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


    .html-editor ::ng-deep .cm-variable-chip-icon {
      font-family: 'Material Symbols Outlined';
      font-size: 14px;
      line-height: 14px;
    }


    .html-editor ::ng-deep .cm-variable-chip-text {
      padding: 0 3px;
      font-weight: 500;
    }


    .html-editor ::ng-deep .cm-variable-chip-button {
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


    .html-editor ::ng-deep .cm-variable-chip-button:hover {
      background: color-mix(
        in srgb,
        currentColor 12%,
        transparent
      );
    }


    .html-editor ::ng-deep
    .cm-variable-chip-button
    .material-symbols-outlined {
      font-size: 14px;
      line-height: 14px;
    }`,
  imports: [
    MatIconButton,
    MatIcon
  ]
})
export class HtmlEditorComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);

  @ViewChild('editorContainer', {static: true})
  editorContainer!: ElementRef<HTMLDivElement>;

  readonly formField = input.required<FieldTree<string>>();
  questionIndex = input<number>();

  private editorView?: EditorView;

  private variableDecorationField!: StateField<DecorationSet>;

  ngAfterViewInit(): void {
    this.createEditor();
  }

  private createEditor(): void {
    this.variableDecorationField = this.createVariableDecorationField();

    const state = EditorState.create({
      doc: this.formField()().value(),
      extensions: [
        basicSetup,
        html(),
        EditorView.lineWrapping,
        this.variableDecorationField,
        EditorView.atomicRanges.of(view => view.state.field(this.variableDecorationField)),
        EditorView.updateListener.of(update => {
          if (!update.docChanged) return;
          this.formField()().value.set(update.state.doc.toString());
        }),

        EditorView.theme({
          '&': {
            width: '100%',
            height: '100%',
            fontSize: '12px',
          },
          '.cm-scroller': {
            overflow: 'auto',
          },
          '.cm-content': {
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word',
          },
        }),
      ],
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement,
    });
  }

  private createVariableDecorationField(): StateField<DecorationSet> {
    return StateField.define<DecorationSet>({
      create: state => {
        return this.buildVariableDecorations(state);
      },
      update: (decorations, transaction) => {
        if (!transaction.docChanged) return decorations;
        return this.buildVariableDecorations(
          transaction.state,
        );
      },
      provide: field => EditorView.decorations.from(field),
    });
  }

  private buildVariableDecorations(state: EditorState): DecorationSet {
    const decorations = [];
    const text = state.doc.toString();
    const regex = /\{\{([^{}]+)\}\}/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[0];
      const variableName = match[1].trim();
      const from = match.index;
      const to = from + fullMatch.length;

      decorations.push(
        Decoration.replace({
          widget: new VariableChipWidget(
            variableName,

            // Edit
            () => { this.editVariable(variableName, from, to); },

            // Remove
            () => { this.removeVariable(from, to); },
          ),

          inclusive: false,

        }).range(from, to),
      );
    }

    return Decoration.set(decorations,true);
  }

  protected openQuestionPickerDialog(): void {
    const editor = this.editorView;
    if (!editor) return;

    const selection = editor.state.selection;

    const dialogRef = this.dialog.open(
      QuestionPickerDialogComponent,
      {
        width: '500px',
        data: {
          questionIndex: this.questionIndex(),
        },
      },
    );

    dialogRef.afterClosed().subscribe(
      (question: AppQuestion | undefined) => {

        if (!question) return;

        const placeholder = `{{${question.field_name}}}`;

        const from = selection.main.from;
        const to = selection.main.to;

        editor.dispatch({
          changes: {
            from,
            to,
            insert: placeholder,
          },
          selection: {
            anchor: from + placeholder.length,
          },
          scrollIntoView: true,
        });

        editor.focus();
      },
    );
  }

  private removeVariable(from: number, to: number): void {
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

  private editVariable(variableName: string, from: number, to: number): void {

    const dialogRef = this.dialog.open(
      QuestionPickerDialogComponent,
      {
        width: '500px',

        data: {
          questionIndex: this.questionIndex(),

          // Tell the dialog which question is currently selected
          currentVariable: variableName,
        },
      },
    );


    dialogRef.afterClosed().subscribe(
      (question: AppQuestion | undefined) => {

        if (!question) return;

        const placeholder = `{{${question.field_name}}}`;

        this.editorView?.dispatch({
          changes: {
            from,
            to,
            insert: placeholder,
          },
          selection: {
            anchor: from + placeholder.length,
          },
          scrollIntoView: true,
        });

        this.editorView?.focus();
      },
    );
  }
}

class VariableChipWidget extends WidgetType {

  constructor(
    private readonly variableName: string,
    private readonly onEdit: () => void,
    private readonly onRemove: () => void,
  ) {
    super();
  }

  toDOM(): HTMLElement {

    const chip = document.createElement('span');
    chip.className = 'cm-variable-chip';
    const icon = document.createElement('span');
    icon.className = 'cm-variable-chip-icon material-symbols-outlined';
    icon.textContent = 'data_array';
    const text = document.createElement('span');
    text.className = 'cm-variable-chip-text';
    text.textContent = this.variableName;
    const editButton = document.createElement('button');
    editButton.type = 'button';
    editButton.className = 'cm-variable-chip-button';
    editButton.title = 'Edit variable';
    editButton.innerHTML = `<span class="material-symbols-outlined"> edit </span>`;

    editButton.addEventListener(
      'mousedown',
      event => {
        event.preventDefault();
        event.stopPropagation();
      },
    );


    editButton.addEventListener(
      'click',
      event => {
        event.preventDefault();
        event.stopPropagation();

        this.onEdit();
      },
    );

    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'cm-variable-chip-button';
    removeButton.title = 'Remove variable';
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

    chip.appendChild(icon);
    chip.appendChild(text);
    chip.appendChild(editButton);
    chip.appendChild(removeButton);

    return chip;
  }

  override eq(other: VariableChipWidget): boolean {
    return (
      other instanceof VariableChipWidget &&
      other.variableName === this.variableName
    );
  }

  override ignoreEvent(): boolean {
    return false;
  }
}
