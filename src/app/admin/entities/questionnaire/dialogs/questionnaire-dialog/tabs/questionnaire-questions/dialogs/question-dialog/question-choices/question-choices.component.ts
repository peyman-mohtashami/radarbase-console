import {Component, computed, inject, input, signal} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList} from '@angular/cdk/drag-drop';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField, MatInput} from '@angular/material/input';
import {FieldTree, FormField} from '@angular/forms/signals';
import {QuestionnaireDialogStateService} from '../../../../../services/questionnaire-dialog-state.service';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-question-choices',
  templateUrl: './question-choices.component.html',
  imports: [
    CdkDropList,
    MatIcon,
    MatIconButton,
    TranslatePipe,
    CdkDrag,
    MatFormField,
    MatInput,
    CdkDragHandle,
    FormField,
    CdkTextareaAutosize,
  ],
  styles: `
    .cdk-drag-preview {
      background: white;
      border-radius: 8px;
      box-shadow:
        0 5px 5px -3px rgb(0 0 0 / 20%),
        0 8px 10px 1px rgb(0 0 0 / 14%),
        0 3px 14px 2px rgb(0 0 0 / 12%);
    }

    .cdk-drag-placeholder {
      background: #f3f4f6;
      border: 2px dashed #9ca3af;
      border-radius: 8px;
      opacity: 0.6;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .cdk-drop-list-dragging .cdk-drag:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `
})
export class QuestionChoicesComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  readonly formField = input.required<FieldTree<{code: string; label: Record<string, string>;}[]>>();

  isValid = signal(false);

  lang = computed(() => {
    return this.dialogState.questionnaire()!.defaultLanguage!.code;
  })

  addChoice() {
    this.formField()().value.update(v => [
      ...v,
      {code: '', label: {[this.lang()]: ''}},
    ]);
  }

  removeChoice(index: number) {
    this.formField()().value.update(v => v.filter((_, i) => i !== index));
  }

  protected onDrop(event: CdkDragDrop<any>) {
    // const control = this.choices.at(event.previousIndex);
    //
    // this.choices.removeAt(event.previousIndex);
    // this.choices.insert(event.currentIndex, control);
  }
}
