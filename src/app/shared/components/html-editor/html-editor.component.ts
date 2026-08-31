import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  // effect,
  input,
  // output,
} from '@angular/core';

import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import {FieldTree} from '@angular/forms/signals';

@Component({
  selector: 'app-html-editor',
  templateUrl: './html-editor.component.html',
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .html-editor {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
    }
    //:host {
    //  display: block;
    //  height: 100%;
    //}
    //
    //.html-editor {
    //  height: 100%;
    //  border: 1px solid #d1d5db;
    //  border-radius: 0.5rem;
    //  overflow: hidden;
    //}
  `,
})
export class HtmlEditorComponent implements AfterViewInit, OnDestroy {

  @ViewChild('editorContainer', { static: true })
  editorContainer!: ElementRef<HTMLDivElement>;

  readonly formField = input.required<FieldTree<string>>();
  // readonly value = input<string>('');

  // readonly valueChange = output<string>();

  private editorView?: EditorView;

  private initialized = false;

  ngAfterViewInit(): void {
    this.createEditor();
    this.initialized = true;
  }

  private createEditor(): void {
    const state = EditorState.create({
      doc: this.formField()().value(),

      extensions: [
        basicSetup,
        html(),

        EditorView.lineWrapping,

        EditorView.updateListener.of(update => {
          if (!update.docChanged) {
            return;
          }

          this.formField()().value.set(update.state.doc.toString())

          // this.valueChange.emit(
          //   update.state.doc.toString()
          // );
        }),

        EditorView.theme({
          '&': {
            width: '100%',
            height: '100%',
            fontSize: `12px`,
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

  ngOnDestroy(): void {
    this.editorView?.destroy();
  }
}
