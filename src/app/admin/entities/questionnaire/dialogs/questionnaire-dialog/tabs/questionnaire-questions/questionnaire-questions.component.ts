import {Component, inject} from '@angular/core';
import {AppQuestion} from '../../../../models/questionnaire';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionButtonComponent} from './components/question-button/question-button.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from './dialogs/question-dialog/question-dialog.component';
import {DialogMode} from '../../../../../../shared/enums/dialog';
import {QUESTION_TYPES} from './components/question-type/question-type.registry';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';

@Component({
  selector: 'app-questionnaire-questions',
  templateUrl: 'questionnaire-questions.component.html',
  imports: [
    CdkDropList,
    TranslatePipe,
    QuestionButtonComponent,
    MatButton,
    CdkDrag,
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
export class QuestionnaireQuestionsComponent {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected dialog = inject(MatDialog);
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected addQuestion(type: string) {
    this.dialogState.questionnaire.update(value => {
      return {
        ...value!,
        questions: [...(value?.questions ?? []), {
          id: `${Date.now()}`,
          field_name: '',
          field_label: {},
          field_type: type,
          dragId: crypto.randomUUID(),
        }]
      }
    });
  }

  protected removeQuestion(index: number) {
    this.dialogState.questionnaire.update(value => {
      return {
        ...value!,
        questions: [...(value?.questions ?? []).splice(index, 1)]
      }
    });
  }

  protected onSelectQuestion(index: number, question: AppQuestion) {
    this.openQuestionDialog(index, question);
  }

  protected onDrop(event: CdkDragDrop<AppQuestion>) {
    moveItemInArray(
      this.dialogState.questionnaire()?.questions ?? [],
      event.previousIndex,
      event.currentIndex
    );

    this.dialogState.questionnaire.update(value => {
      return {
        ...value!,
        questions: [...(value?.questions ?? [])]
      }
    });
  }

  openQuestionDialog(index: number, question: AppQuestion) {
    this.dialog.open(QuestionDialogComponent, {
      id: 'question-dialog',
      data: {id: 'question-dialog', entity: question, questions: this.dialogState.questionnaire()?.questions ?? [], index: index, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '70%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
