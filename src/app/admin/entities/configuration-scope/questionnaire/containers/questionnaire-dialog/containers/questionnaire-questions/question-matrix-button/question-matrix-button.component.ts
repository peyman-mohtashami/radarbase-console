import {Component, effect, inject, input, OnInit, output, viewChild, ViewContainerRef} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {TranslatePipe} from "@ngx-translate/core";
import {MatIcon} from '@angular/material/icon';
import {AppQuestion, AppQuestionnaire} from '../../../../../models/questionnaire';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatTooltip} from '@angular/material/tooltip';
import {UpperCasePipe} from '@angular/common';
import {QUESTION_COMPONENTS} from '../../../components/question-type/question-type.registry';
import {QuestionnaireDialogStateService} from '../../../services/questionnaire-dialog-state.service';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {QuestionDialogComponent} from '../question-dialog/question-dialog.component';
import {DialogMode} from '../../../../../../../../base-entities/enums/dialog';
import {AppUiQuestion} from '../questionnaire-questions.component';
import {MatDialog} from '@angular/material/dialog';
import {QuestionButtonComponent} from '../question-button/question-button.component';

@Component({
  selector: 'app-question-matrix-button',
  templateUrl: './question-matrix-button.component.html',
  imports: [
    MatIconButton,
    TranslatePipe,
    MatIcon,
    TagComponent,
    MatTooltip,
    UpperCasePipe,
    CdkDrag,
    CdkDropList,
    QuestionButtonComponent,
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
export class QuestionMatrixButtonComponent implements OnInit {
  protected dialogState = inject(QuestionnaireDialogStateService);
  protected dialog = inject(MatDialog);

  entity = input.required<AppQuestion>();
  index = input.required<number>();

  host = viewChild('questionHost', { read: ViewContainerRef });

  removeEvent = output<void>();
  selectEvent = output<void>();

  changeEvent = output<Partial<AppQuestion>>();
  validEvent = output<boolean>();

  subQuestions: AppUiQuestion[] = [];

  constructor() {
    effect(() => this.loadQuestionEditor());
  }

  ngOnInit() {
    this.subQuestions = this.entity().subQuestions?.map(q => ({
      ...q,
      _dragId: crypto.randomUUID(),
      valid: true,
    })) ?? [];
  }

  protected removeQuestion(event: PointerEvent) {
    event.stopPropagation();
    this.removeEvent.emit();
  }

  protected selectQuestion() {
    this.selectEvent.emit();
  }

  private loadQuestionEditor(): void {
    const host = this.host();
    if (!host) return;

    host.clear();
    const componentType = QUESTION_COMPONENTS[this.entity().field_type];
    const componentRef = host.createComponent(componentType);
    componentRef.instance.type = 'button';
    componentRef.instance.entity = this.entity;
  }

  protected addSubQuestion(event: Event, type: string) {
    console.log('Class: QuestionMatrixButtonComponent, Function: addSubQuestion, Line 76 ' , );
    event.stopPropagation();
    this.subQuestions.push({
      id: `${Date.now()}`,
      field_name: '',
      field_label: {},
      field_type: type,
      _dragId: crypto.randomUUID(),
    });
    console.log('Class: QuestionMatrixButtonComponent, Function: addSubQuestion, Line 92 this.subQuestions' , this.subQuestions);

    this.changeEvent.emit({subQuestions: this.subQuestions});
  }

  protected removeSubQuestion(index: number) {
    this.subQuestions.splice(index, 1);

    console.log('Class: QuestionMatrixButtonComponent, Function: removeSubQuestion, Line 100 this.subQuestions' , this.subQuestions);

    this.validEvent.emit(this.subQuestions.every(q => q.valid));
    this.changeEvent.emit({subQuestions: this.subQuestions});
  }

  protected onSelectSubQuestion(index: number, question: AppQuestion) {
    this.openSubQuestionDialog(index, question);
  }

  protected onDropSubQuestion(event: CdkDragDrop<any>) {
    moveItemInArray(
      this.subQuestions,
      event.previousIndex,
      event.currentIndex
    );

    this.subQuestions = [...this.subQuestions];

    this.changeEvent.emit({
      subQuestions: this.subQuestions
    });
  }

  openSubQuestionDialog(index: number, question: AppQuestion) {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      id: 'question-dialog',
      data: {id: 'question-dialog', entity: question, questions: this.subQuestions, index: index, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '70%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.changeEvent.subscribe(
        (value) => {
          this.subQuestions = this.subQuestions.map((q, i) => i === index ? {...q, ...value} : q);
          console.log('^^^Class: QuestionMatrixButtonComponent, Function: , Line 142 this.subQuestions' , this.subQuestions);
          this.validEvent.emit(this.subQuestions.every(q => q.valid));
          console.log('^^^Class: QuestionMatrixButtonComponent, Function: , Line 144 ' , {subQuestions: this.subQuestions});
          this.changeEvent.emit({subQuestions: this.subQuestions});
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }
}
