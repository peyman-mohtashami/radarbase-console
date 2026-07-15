import {AfterViewInit, Component, ElementRef, inject, input, ViewChild} from '@angular/core';
import {
  ReactiveFormsModule
} from '@angular/forms';
// import {MatError, MatFormField} from "@angular/material/form-field";
// import {MatInput} from "@angular/material/input";
// import {CdkTextareaAutosize} from "@angular/cdk/text-field";
// import {TranslateModule} from "@ngx-translate/core";
// import {RadarOption} from "../../../../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
// import {QuestionnaireStateService} from "../../services/questionnaire-state.service";
import {JsonPipe} from '@angular/common';
// import {
//   ConditionalLogicDialogComponent
// } from '../../conditional-logic/conditional-logic-dialog/conditional-logic-dialog.component';
// import {DialogMode} from '../../../../../../../base-entities/enums/dialog';
import {MatDialog} from '@angular/material/dialog';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {DynamicVariableComponent} from '../dynamic-variable/dynamic-variable-dialog/dynamic-variable.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
// import {DynamicVariableComponent} from '../../dynamic-variable/dynamic-variable-dialog/dynamic-variable.component';

type EditorNode =
  | { type: 'text'; value: string }
  | {
  type: 'question';
  questionnaireId: number;
  questionId: number;
  label: string;
};

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  imports: [
    ReactiveFormsModule,
    // MatFormField,
    // MatInput,
    // CdkTextareaAutosize,
    // MatError,
    // TranslateModule,
    JsonPipe,
  ],
  styles: `
    //.editor {
    //  border: 1px solid #cf3ca5;
    //  padding: 8px;
    //  min-height: 120px;
    //  border-radius: 6px;
    //}

    //.token {
    //  background: #4ea793;
    //  border: 1px solid #ef5516;
    //  border-radius: 12px;
    //  padding: 2px 8px;
    //  margin: 0 2px;
    //  display: inline-block;
    //  cursor: pointer;
    //}
  `
})
export class TextEditorComponent implements AfterViewInit {

  questionnaireStateService = inject(QuestionnaireDialogStateService);
  protected dialog = inject(MatDialog);

  // languages = input.required<RadarOption[]>();
  // label = input.required<string | undefined>();
  // placeholder = input<string>('');
  // required = input<boolean>(false);
  // disabled = input<boolean>(false);
  // textarea = input<boolean>(false);
  // textareaRows = input<number>(3);
  // textareaAutosize = input<boolean>(false);

  @ViewChild('editor') editor!: ElementRef<HTMLDivElement>;

  model: EditorNode[] = [
    { type: 'text', value: 'Hello ' },
    {
      type: 'question',
      questionnaireId: 1,
      questionId: 3,
      label: 'Questionnaire 1: Question 3'
    },
    { type: 'text', value: ' Good morning!' }
  ];

  ngAfterViewInit() {
    this.render();
  }

  render() {
    const el = this.editor.nativeElement;
    el.innerHTML = '';

    this.model.forEach(node => {
      if (node.type === 'text') {
        el.appendChild(document.createTextNode(node.value));
      } else {
        const span = document.createElement('span');
        span.className = 'bg-primary/20 token border border-primary rounded-lg py-1 px-2 mx-1 inline-block cursor-pointer';
        span.contentEditable = 'false';
        span.dataset["qid"] = node.questionnaireId.toString();
        span.dataset["qnid"] = node.questionId.toString();
        span.textContent = node.label;

        el.appendChild(span);
      }
    });
  }

  onInput() {
    const el = this.editor.nativeElement;
    const newModel: EditorNode[] = [];

    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        newModel.push({
          type: 'text',
          value: node.textContent || ''
        });
      } else if (
        node instanceof HTMLElement &&
        node.classList.contains('token')
      ) {
        newModel.push({
          type: 'question',
          questionnaireId: Number(node.dataset["qid"]),
          questionId: Number(node.dataset["qnid"]),
          label: node.textContent || ''
        });
      }
    });

    this.model = newModel;
  }

  insertQuestion() {
    // simulate dialog result
    const data = {
      questionnaireId: 2,
      questionId: 5,
      label: 'Questionnaire 2: Question 5'
    };

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);

    const span = document.createElement('span');
    span.className = 'bg-primary/20 token border border-primary rounded-lg py-1 px-2 mx-1 inline-block cursor-pointer';
    span.contentEditable = 'false';
    span.dataset["qid"] = data.questionnaireId.toString();
    span.dataset["qnid"] = data.questionId.toString();
    span.textContent = data.label;

    range.deleteContents();
    range.insertNode(span);

    // move cursor after token
    range.setStartAfter(span);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);

    this.onInput(); // update model
  }

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('token')) {
      const dialogRef = this.dialog.open(DynamicVariableComponent, {
        id: 'dynamic-variable-dialog',
        data: {id: 'dynamic-variable-dialog', entity: {value: target.textContent}, mode: DialogMode.EDIT},
        // panelClass: 'tailwind-slide-panel',
        // width: '70%',
        // height: '100vh',
        // position: {top: '0', right: '0'},
        hasBackdrop: true,
        disableClose: true,
        autoFocus: false,
        restoreFocus: false
      });

      const dialogActionSubscription =
        dialogRef.componentInstance.dialogActionEvent.subscribe(
          (value) => {
            console.log('Class: QuestionFormGroupComponent, Function: , Line 190 value' , value);
            // this.form.patchValue({branching_logic: value.entity?.value});
            dialogRef.close();
          }
        );

      dialogRef.afterClosed().subscribe(() => {
        dialogActionSubscription.unsubscribe();
      });

      // const newLabel = prompt('Edit label', target.textContent || '');
      //
      // if (newLabel !== null) {
      //   target.textContent = newLabel;
      //   this.onInput();
      // }
    }
  }
}
