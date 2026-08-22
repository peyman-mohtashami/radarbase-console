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
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {checkValidation, dragDropStyles, QUESTION_TYPES} from '../../services/utils';


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
  styles: dragDropStyles
})
export class QuestionnaireQuestionsComponent {
  protected readonly QUESTION_TYPES = QUESTION_TYPES;

  protected dialog = inject(MatDialog);
  protected store = inject(QuestionnaireStore);

  private readonly injector = inject(Injector);
  private readonly questionsContainer = viewChild<ElementRef<HTMLElement>>('choicesContainer');

  protected addQuestion(type: string, index?: number) {
    const id = crypto.randomUUID();
    const questions: AppQuestion[] = [...(this.store.selected()?.questions ?? [])];
    questions.splice(index ?? questions.length, 0, {
      id,
      field_name: '',
      field_label: {},
      required_field: true,
      field_type: type,
      isActive: true,
    });
    this.updateQuestionList(questions);
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
    const questions = (this.store.selected()?.questions ?? []).filter((_, i) => i !== index);
    this.updateQuestionList(questions);
  }

  protected onSelectQuestion(index: number, question: AppQuestion) {
    this.openQuestionDialog(index, question);
  }

  protected onDrop(event: CdkDragDrop<unknown, unknown, AppQuestion | string>) {
    if (event.previousContainer !== event.container) {
      this.addQuestion(event.item.data as string, event.currentIndex);
      return;
    }

    const questions = [...(this.store.selected()?.questions ?? [])];
    moveItemInArray(questions, event.previousIndex, event.currentIndex);
    this.updateQuestionList(questions);
  }

  private updateQuestionList(questions: AppQuestion[]){
    this.store.selected.update(value => {
      const validated = checkValidation(questions);
      return {
        ...value!,
        questions: [...validated],
        isQuestionsTabValid: validated.every(q => q.isValid)
      }
    });
  }

  openQuestionDialog(index: number, question: AppQuestion) {
    this.dialog.open(QuestionDialogComponent, {
      id: 'question-dialog',
      data: {id: 'question-dialog', entity: question, questions: this.store.selected()?.questions ?? [], index: index, mode: DialogMode.EDIT},
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

