import {Component, inject, } from '@angular/core';
import {JsonPipe, NgTemplateOutlet} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../../../shared/enums/dialog';
import {QuestionTemplateVariable} from './model/template-field.model';
import {MatDialog} from '@angular/material/dialog';
import {VariableDialogComponent} from './dialogs/variable-dialog/variable-dialog.component';
import {
  DataTableFilterComponent
} from '../../../../../../shared/components/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../../../shared/components/entity-list-page/entity-list-page.component';
import {LoaderComponent} from '../../../../../../../shared/components/loader/loader.component';
import {PermissionDirective} from '../../../../../../../core/auth/directives/show-if-has-role.directive';
import {
  QuestionnaireTableRowComponent
} from '../../../../components/questionnaire-table-row/questionnaire-table-row.component';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatPaginator} from '@angular/material/paginator';
import {TableQueryReflectorDirective} from '../../../../../../shared/directives/table-query-reflector.directive';
import {FilterItem, TableElement} from '../../../../../../shared/models/table.model';
import {FormFieldType} from '../../../../../../shared/models/dialog.model';
import {VariableTableRowComponent} from './components/variable-table-row/variable-table-row.component';
import {QuestionnaireStore} from '../../../../services/questionnaire.store';

export const TableFields: TableElement[] = [
  {name: 'name', tableClass: "block", extensionClass: "hidden", sortable: true},
  // { name: 'type', width:"w-40", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  // { name: 'completionWindow', width: "w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  { name: 'questionId', width: "w-32", tableClass: "hidden lg:block", extensionClass: "block lg:hidden" },
  {
    name: 'questionnaireId',
    width: "w-32",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  {
    name: 'function',
    width: "w-28",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  {
    name: 'timeWindow',
    width: "w-40",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  // {
  //   name: 'end',
  //   width: "w-40",
  //   tableClass: "hidden lg:block",
  //   extensionClass: "block lg:hidden",
  // },
  {
    name: 'usedIn',
    width: "w-40",
    tableClass: "hidden lg:block",
    extensionClass: "block lg:hidden",
  },
  {name: "actions", width: "w-24", tableClass: "flex", extensionClass: "hidden"},
];

@Component({
  selector: 'app-questionnaire-variables',
  templateUrl: './questionnaire-variables.component.html',
  imports: [
    JsonPipe,
    MatButton,
    MatIcon,
    TranslatePipe,
    DataTableFilterComponent,
    EntityListPageComponent,
    LoaderComponent,
    PermissionDirective,
    QuestionnaireTableRowComponent,
    MatCheckbox,
    MatPaginator,
    NgTemplateOutlet,
    TableQueryReflectorDirective,
    VariableTableRowComponent,
  ]
})
export class QuestionnaireVariablesComponent {
  protected store = inject(QuestionnaireStore);

  protected readonly DialogMode = DialogMode;
  protected dialog = inject(MatDialog);

  protected openDialog(mode: string) {
    // const dialogRef = this.dialog.open(VariableDialogComponent,
    //   {
    //     width: '500px',
    //     data: {mode, entity}
    //   },
    // );
    //
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
      data: {id: 'variable-dialog', mode}, //, entity: this.model().conditionalLogic, questions: this.dialogData.questions, selectedIndex: this.dialogData.index, mode: DialogMode.EDIT},
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



  // export const filters: FilterItem[] = [
  //   {name: 'search', label: 'ADMIN.questionnaire.filters.search', type: FormFieldType.INPUT},
  // ]

  protected readonly TableFields = TableFields;
}
