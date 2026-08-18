import {Component, computed, inject, input, output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {QuestionnaireStore} from '../../../../../../../services/questionnaire.store';
import {
  ConditionalLogicDialogComponent,
  OPERATOR_SYMBOLS
} from '../../conditional-logic-dialog/conditional-logic-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogMode} from '../../../../../../../../../shared/enums/dialog';
import {AppQuestion, AppQuestionConditionalLogic} from '../../../../../../../models/questionnaire';

@Component({
  selector: 'app-question-conditional-logic',
  templateUrl: './question-conditional-logic.component.html',
  imports: [
    MatIcon,
    MatIconButton,
    TranslatePipe,
  ]
})
export class QuestionConditionalLogicComponent {
  protected store = inject(QuestionnaireStore);
  protected dialog = inject(MatDialog);

  conditionalLogic = input.required<AppQuestionConditionalLogic>();
  questions = input.required<AppQuestion[]>();
  selectedIndex = input.required<number>();

  updateEvent = output<AppQuestionConditionalLogic>();

  branching_logic = computed(() => {
    return this.conditionalLogic()?.map((conditionalLogicItems) =>
      conditionalLogicItems.map(i => `[${i.operand}]${OPERATOR_SYMBOLS[i.operator]}'${i.value}'`).join(' and ')
    ).join(' or ') ?? '';
  })

  protected editConditionalLogic() {
    this.openConditionalLogicDialog();
  }

  openConditionalLogicDialog() {
    const dialogRef = this.dialog.open(ConditionalLogicDialogComponent, {
      id: 'conditional-logic-dialog',
      data: {id: 'conditional-logic-dialog', entity: this.conditionalLogic(), questions: this.questions(), selectedIndex: this.selectedIndex(), mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '60%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (conditionalLogicValue) => {
          if (conditionalLogicValue.entity && conditionalLogicValue.action !== DialogMode.CLOSE) {
            this.updateEvent.emit(conditionalLogicValue.entity ?? []);
          }
          dialogRef.close();
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }
}
