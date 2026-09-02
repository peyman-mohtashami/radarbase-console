import {AfterViewInit, Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {FieldTree} from '@angular/forms/signals';
import {EditorView} from '@codemirror/view';
import {EditorState} from '@codemirror/state';
import {basicSetup} from 'codemirror';
import {html} from '@codemirror/lang-html';
import {
  variableDecorations
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/variable-chip-widget/variable-chip-widget';
import {
  QuestionPickerDialogComponent
} from '../../../admin/entities/questionnaire/dialogs/questionnaire-dialog/tabs/questionnaire-questions/dialogs/question-picker-dialog/question-picker-dialog.component';
import {AppQuestion} from '../../../admin/entities/questionnaire/models/questionnaire';
import {MatDialog} from '@angular/material/dialog';
import {EditorSelection} from '@codemirror/state';

@Component({
  selector: 'app-html-editor',
  imports: [
    MatIcon,
    MatIconButton,
  ],
  templateUrl: 'html-editor.component.html',
  styles: `
    .html-editor {
      width: 100%;
      height: 100%;
    }

    .html-editor ::ng-deep .cm-variable-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;

      padding: 2px 8px;
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

      cursor: pointer;
    }

    .html-editor ::ng-deep .cm-variable-chip-icon {
      font-family: 'Material Symbols Outlined';
      font-size: 14px;
      line-height: 14px;
    }

    .html-editor ::ng-deep .cm-variable-chip-text {
      font-weight: 500;
    }
  `,
})
export class HtmlEditorComponent implements AfterViewInit {
  private readonly dialog = inject(MatDialog);

  @ViewChild('editorContainer', { static: true })
  editorContainer!: ElementRef<HTMLDivElement>;

  readonly formField = input.required<FieldTree<string>>();
  questionIndex = input<number>();

  private editorView?: EditorView;

  private savedSelection?: EditorSelection;

  ngAfterViewInit(): void {
    this.createEditor();
  }

  private createEditor(): void {

    const state = EditorState.create({
      doc: this.formField()().value(),
      extensions: [
        basicSetup,
        html(),
        EditorView.lineWrapping,
        variableDecorations,
        EditorView.atomicRanges.of(
          view => view.state.field(variableDecorations),
        ),
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
          '.cm-line': {
            padding: '0',
          },
        }),
      ],
    });

    this.editorView = new EditorView({
      state,
      parent: this.editorContainer.nativeElement,
    });
  }

  protected openQuestionPickerDialog(): void {
    const editor = this.editorView;
    if (!editor) return;

    this.savedSelection = editor.state.selection;

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

        this.insertVariableAtCursor(question);
      },
    );
  }

  private insertVariableAtCursor(question: AppQuestion): void {
    const editor = this.editorView;
    if (!editor) return;

    const placeholder = `[[${question.field_name}]]`;

    const selection =  this.savedSelection ?? editor.state.selection;

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

    this.savedSelection = undefined;
  }
}
