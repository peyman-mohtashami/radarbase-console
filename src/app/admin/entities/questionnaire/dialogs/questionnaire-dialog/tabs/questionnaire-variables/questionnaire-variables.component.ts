import {Component, inject, } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DialogMode} from '../../../../../../shared/enums/dialog';
import {MatDialog} from '@angular/material/dialog';
import {VariableDialogComponent} from './dialogs/variable-dialog/variable-dialog.component';
import {TableElement} from '../../../../../../shared/models/table.model';
import {VariableTableRowComponent} from './components/variable-table-row/variable-table-row.component';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';
import {TranslatePipe} from '@ngx-translate/core';

export const TableFields: TableElement[] = [
  {name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  { name: 'type', width:"w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  { name: 'variables', width: "w-120", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  {name: "actions", width: "w-24", tableClass: "flex", extensionClass: "hidden"},
];

@Component({
  selector: 'app-questionnaire-variables',
  templateUrl: './questionnaire-variables.component.html',
  imports: [
    MatButton,
    MatIcon,
    VariableTableRowComponent,
    TranslatePipe,
  ]
})
export class QuestionnaireVariablesComponent {
  protected store = inject(QuestionnaireStore);
  protected dialog = inject(MatDialog);

  protected readonly DialogMode = DialogMode;
  protected readonly TableFields = TableFields;

  protected openDialog(mode: string) {
    this.dialog.open(VariableDialogComponent, {
      id: 'variable-dialog',
      data: {id: 'variable-dialog', mode},
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
