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
import {
  VariableDialogComponent
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-variables/dialogs/variable-dialog/variable-dialog.component';
import {
  QuestionTemplateVariable
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-variables/model/template-field.model';
import {QuestionnaireStore} from '../../../admin/entities/questionnaire/services/questionnaire.store';
import {MatTooltip} from '@angular/material/tooltip';

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
      font-family: 'Material Symbols Outlined',serif;
      font-size: 12px;
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


    .html-editor ::ng-deep .cm-variable-chip-button .material-symbols-outlined {
      font-size: 14px;
      line-height: 14px;
    }

    //----------
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
      font-family: 'Material Symbols Outlined',serif;
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
    }`,
  imports: [
    MatIconButton,
    MatIcon,
    MatTooltip
  ]
})
export class HtmlEditorComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);

  @ViewChild('editorContainer', {static: true})
  editorContainer!: ElementRef<HTMLDivElement>;

  readonly formField = input.required<FieldTree<string>>();
  questionIndex = input<number>();

  private editorView?: EditorView;

  private questionDecorationField!: StateField<DecorationSet>;
  private variableDecorationField!: StateField<DecorationSet>;

  ngAfterViewInit(): void {
    this.createEditor();
  }

  private createEditor(): void {
    this.questionDecorationField = this.createQuestionDecorationField();
    this.variableDecorationField = this.createVariableDecorationField();

    const state = EditorState.create({
      doc: this.formField()().value(),
      extensions: [
        basicSetup,
        html(),
        EditorView.lineWrapping,
        this.variableDecorationField,
        this.questionDecorationField,
        EditorView.atomicRanges.of(view => view.state.field(this.variableDecorationField)),
        EditorView.atomicRanges.of(view => view.state.field(this.questionDecorationField)),
        EditorView.updateListener.of(update => {
          if (!update.docChanged) return;
          this.formField()().value.set(update.state.doc.toString());
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

  private createVariableDecorationField(): StateField<DecorationSet> {
    return StateField.define<DecorationSet>({
      create: state => {
        return this.buildVariableDecorations(state);
      },
      update: (decorations, transaction) => {
        if (!transaction.docChanged) return decorations;
        return this.buildVariableDecorations(transaction.state);
      },
      provide: field => EditorView.decorations.from(field),
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

  private buildVariableDecorations(state: EditorState): DecorationSet {
    const decorations = [];
    const text = state.doc.toString();
    const regex = /\{\{([^{}]+)}}/g;
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
            () => { this.editVariable(variableName, from, to); },
            () => { this.removeVariable(from, to); },
          ),
          inclusive: false,
        }).range(from, to),
      );
    }

    return Decoration.set(decorations,true);
  }

  private store = inject(QuestionnaireStore);

  private buildQuestionDecorations(state: EditorState): DecorationSet {
    const decorations = [];
    const text = state.doc.toString();
    const regex = /\[\[([^\]]*)]]/g;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[0];
      const variableName = match[1].trim();
      const question = this.store.selected()?.questions.find(q => q.field_name === variableName);
      const from = match.index;
      const to = from + fullMatch.length;

      decorations.push(
        Decoration.replace({
          widget: new QuestionChipWidget(
            // variableName,
            question!,
            // () => { this.editVariable(variableName, from, to); },
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
        data: {questionIndex: this.questionIndex()},
      },
    );

    dialogRef.afterClosed().subscribe(
      (question: AppQuestion | undefined) => {
        if (!question) return;

        const placeholder = `[[${question.field_name}]]`;

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

  protected openVariableDialog(mode: string) {
    const editor = this.editorView;
    if (!editor) return;

    const selection = editor.state.selection;
    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) return;

        const placeholder = `{{${variable.name}}}`;

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


class QuestionChipWidget extends WidgetType {
  constructor(
    private readonly question: AppQuestion,
    // private readonly onEdit: () => void,
    private readonly onRemove: () => void,
  ) {
    super();
  }

  toDOM(): HTMLElement {
    const chip = document.createElement('span');
    chip.className = 'cm-question-chip';
    // const icon = document.createElement('span');
    // icon.className = 'cm-question-chip-icon material-symbols-outlined';
    // icon.textContent = 'data_array';
    const text = document.createElement('span');
    text.className = 'cm-question-chip-text';
    text.textContent = `[[ ${this.question.field_name} ]]`;
    // const editButton = document.createElement('button');
    // editButton.type = 'button';
    // editButton.className = 'cm-variable-chip-button';
    // editButton.title = 'Edit variable';
    // editButton.innerHTML = `<span class="material-symbols-outlined"> edit </span>`;

    // editButton.addEventListener(
    //   'mousedown',
    //   event => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //   },
    // );


    // editButton.addEventListener(
    //   'click',
    //   event => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     this.onEdit();
    //   },
    // );

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

    // chip.appendChild(icon);
    chip.appendChild(text);
    // chip.appendChild(editButton);
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
