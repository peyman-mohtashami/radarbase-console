import {Component, inject, input, signal} from "@angular/core";
import {TranslatePipe} from '@ngx-translate/core';
import {
  EntityTableRowComponent
} from '../../../../../../../../shared/components/entity-table-row/entity-table-row.component';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {DialogMode} from '../../../../../../../../shared/enums/dialog';
import {MatTooltip} from '@angular/material/tooltip';
import {QuestionTemplateVariable} from '../../model/template-field.model';
import {TableFields} from '../../questionnaire-variables.component';
import {VariableDialogComponent} from '../../dialogs/variable-dialog/variable-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {QuestionnaireStore} from '../../../../../../services/questionnaire.store';

@Component({
  selector: 'app-variable-table-row',
  templateUrl: './variable-table-row.component.html',
  imports: [
    TranslatePipe,
    EntityTableRowComponent,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ]
})
export class VariableTableRowComponent {
  store = inject(QuestionnaireStore);
  protected dialog = inject(MatDialog);

  entity = input.required<QuestionTemplateVariable>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  protected readonly DialogMode = DialogMode;
  protected readonly TableFields = TableFields;

  protected openDialog(mode: string, entity?: QuestionTemplateVariable) {
    this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode, entity},
      panelClass: 'tailwind-slide-panel',
      width: '40%',
      height: '100vh',
      position: {top: '0', right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
