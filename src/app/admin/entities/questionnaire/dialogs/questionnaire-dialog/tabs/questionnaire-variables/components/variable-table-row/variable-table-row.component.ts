import {Component, inject, input, signal} from "@angular/core";
import {TranslatePipe} from '@ngx-translate/core';
import {
  EntityTableRowComponent
} from '../../../../../../../../shared/components/entity-table-row/entity-table-row.component';
import {TagComponent} from '../../../../../../../../../shared/components/tag/tag.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionTemplateVariable} from '../../model/template-field.model';
import {TableFields} from '../../questionnaire-variables.component';
import {VariableDialogComponent} from '../../dialogs/variable-dialog/variable-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-variable-table-row',
  templateUrl: './variable-table-row.component.html',
  imports: [
    TranslatePipe,
    EntityTableRowComponent,
    TagComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ]
})
export class VariableTableRowComponent {
  // protected readonly ROLES = ROLES;
  // protected readonly DetailType = DetailType;

  // configService = inject(QuestionnaireConfigService);
  // dialogService = inject(QuestionnaireDialogService);
  // store = inject(QuestionnaireStore);

  entity = input.required<QuestionTemplateVariable>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  // duplicateEvent = output<void>();
  // activeEvent = output<boolean>();

  // async openDialog() {
  //   // await this.dialogService.openDialog(DialogMode.EDIT, this.entity());
  // }
  protected dialog = inject(MatDialog);

  protected readonly DialogMode = DialogMode;

  // protected onAction(mode: DialogMode) {
  //
  // }

  protected openDialog(mode: string, entity?: QuestionTemplateVariable) {
    // const dialogRef = this.dialog.open(VariableDialogComponent,
    //   {
    //     width: '500px',
    //     data: {mode, entity}
    //   },
    // );

    // dialogRef.afterClosed().subscribe(
    //   (variable: QuestionTemplateVariable | undefined) => {
    //     if (!variable) {
    //       return;
    //     }
    //
    //     // this.insertVariableAtCursor(input, variable);
    //   },
    // );

    const dialogRef = this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode, entity}, //, entity: this.model().conditionalLogic, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });

    const dialogActionSubscription = dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) {
          return;
        }
        console.log('Class: QuestionDialogComponent, Function: , Line 470 variable' , variable);

        // this.insertVariableAtCursor(name, input, variable);
      },
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  protected readonly TableFields = TableFields;
}
