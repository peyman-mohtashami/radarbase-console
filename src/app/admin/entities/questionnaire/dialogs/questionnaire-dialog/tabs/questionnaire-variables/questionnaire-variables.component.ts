import {Component, inject, } from '@angular/core';
import {QuestionnaireDialogStateService} from '../../services/questionnaire-dialog-state.service';
import {JsonPipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../../../shared/enums/dialog';
import {QuestionTemplateVariable} from './model/template-field.model';
import {MatDialog} from '@angular/material/dialog';
import {VariableDialogComponent} from './dialogs/variable-dialog/variable-dialog.component';


@Component({
  selector: 'app-questionnaire-variables',
  templateUrl: './questionnaire-variables.component.html',
  imports: [
    JsonPipe,
    MatButton,
    MatIcon,
    TranslatePipe,
  ]
})
export class QuestionnaireVariablesComponent {
  protected dialogState = inject(QuestionnaireDialogStateService);

  protected readonly DialogMode = DialogMode;
  protected dialog = inject(MatDialog);

  protected openDialog(mode: DialogMode, entity?: QuestionTemplateVariable) {
    const dialogRef = this.dialog.open(VariableDialogComponent,
      {
        width: '500px',
        data: {mode, entity}
      },
    );

    dialogRef.afterClosed().subscribe(
      (variable: QuestionTemplateVariable | undefined) => {
        if (!variable) {
          return;
        }

        // this.insertVariableAtCursor(input, variable);
      },
    );
  }
}
