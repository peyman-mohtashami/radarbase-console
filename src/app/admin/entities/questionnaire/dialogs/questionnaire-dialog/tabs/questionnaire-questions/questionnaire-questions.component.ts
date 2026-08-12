import {afterNextRender, Component, ElementRef, inject, Injector, viewChild} from '@angular/core';
import {AppQuestion} from '../../../../models/questionnaire';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionButtonComponent} from './components/question-button/question-button.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {QuestionDialogComponent} from './dialogs/question-dialog/question-dialog.component';
import {DialogMode} from '../../../../../../shared/enums/dialog';
import {QUESTION_TYPES} from '../questionnaire-preview/question-type/question-type.registry';
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
    CdkScrollable,
  ],
  styles: `
    .cdk-drag-preview {
      background: white;
      border-radius: 8px;
      box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%),
      0 8px 10px 1px rgb(0 0 0 / 14%),
      0 3px 14px 2px rgb(0 0 0 / 12%);
    }

    .cdk-drag-placeholder {
      background: #f3f4f6;
      width: 100%;
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

    #questions-drop-list.cdk-drop-list-dragging .question-drop-hint {
      background-color: #eeeeee;
    }


    .cdk-drag-dragging {
      cursor: grabbing;
    }
  `
})
export class QuestionnaireQuestionsComponent {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected dialog = inject(MatDialog);
  protected dialogState = inject(QuestionnaireDialogStateService);

  private readonly injector = inject(Injector);
  private readonly questionsContainer = viewChild<ElementRef<HTMLElement>>('choicesContainer');

  /** Adds a question of the given type at `index` (appended when omitted) and scrolls it into view. */
  protected addQuestion(type: string, index?: number) {
    const id = crypto.randomUUID();

    this.dialogState.questionnaire.update(value => {
      const questions: AppQuestion[] = [...(value?.questions ?? [])];
      questions.splice(index ?? questions.length, 0, {
        id,
        field_name: '',
        field_label: {},
        required_field: true,
        field_type: type,
      });
      checkValidation(questions);
      return {
        ...value!,
        questions,
        isQuestionsTabValid: questions.every(q => q.isValid)
      }
    });

    this.scrollToQuestion(id);
  }

  private scrollToQuestion(id: string) {
    afterNextRender({
      read: () => {
        this.questionsContainer()?.nativeElement
          .querySelector(`[data-question-id="${id}"]`)
          ?.scrollIntoView({behavior: 'smooth', block: 'nearest'});
      }
    }, {injector: this.injector});
  }

  protected removeQuestion(index: number) {
    this.dialogState.questionnaire.update(value => {
      const questions = (value?.questions ?? []).filter((_, i) => i !== index);
      checkValidation(questions);
      return {
        ...value!,
        questions,
        isQuestionsTabValid: questions.every(q => q.isValid)
      }
    });
  }

  protected onSelectQuestion(index: number, question: AppQuestion) {
    this.openQuestionDialog(index, question);
  }

  protected onDrop(event: CdkDragDrop<unknown, unknown, AppQuestion | string>) {
    // Dragged in from the question types palette: create a question of that type at the drop position.
    if (event.previousContainer !== event.container) {
      this.addQuestion(event.item.data as string, event.currentIndex);
      return;
    }

    this.dialogState.questionnaire.update(value => {
      const questions = [...(value?.questions ?? [])];
      moveItemInArray(questions, event.previousIndex, event.currentIndex);
      checkValidation(questions);
      return {
        ...value!,
        questions,
        isQuestionsTabValid: questions.every(q => q.isValid)
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

export function checkValidation(questions: AppQuestion[]) {
  questions.forEach(q => validateQuestion(q));
}

export function validateQuestion(question: AppQuestion) {
  // check conditional logic
  // check calc
  // check template variables
}
