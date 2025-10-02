import {Component, input, output } from '@angular/core';
import { DialogMode } from '../../../../enums/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';

import { SubjectService } from '../../services/subject.service';
import { SelectionModel } from '@angular/cdk/collections';
import { SubjectDialogAssignGroupComponent } from '../../containers/subject-dialog-assign-group/subject-dialog-assign-group.component';
import { AppSubject } from "../../models/subject";
import { AppGroup } from "../../../group/models/group";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'rb-assign-group',
  templateUrl: './assign-group.component.html',
  imports: [
    MatButton,
    MatIcon
  ]
})
export class AssignGroupComponent {
  groups = input<AppGroup[]>();
  selection = input<SelectionModel<AppSubject>>(new SelectionModel<AppSubject>(true, []));

  updateTrigger = output<string>();

  constructor(
    private dialog: MatDialog,
    private entityService: SubjectService
  ) {}

  assignGroupToSubjects(e?: Event) {
    e?.stopPropagation();

    if (this.selection().selected.length) {
      return this.openAssignGroupToSubjectsDialog();
    }
  }

  private openAssignGroupToSubjectsDialog() {
    const dialogRef = this.getAssignGroupToSubjectsDialogRef();
    // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; groupName: string }) => {
          if (value.action === DialogMode.EDIT) {
            this.entityService
              .addSubjectsToGroup(
                value.groupName,
                this.selection().selected.map((s) => {
                  return { login: s.login };
                })
              )
              .subscribe({
                next: () => this.onAssignGroupToSubjectsSuccess(dialogRef),
                error: (err) =>
                  this.onAssignGroupToSubjectsError(err, dialogRef),
              });
          } else if (value.action === 'close') {
            // this.applyStateChangesToUrlQueryParams({[mode]: null});
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  getAssignGroupToSubjectsDialogRef() {
    return this.dialog.open(SubjectDialogAssignGroupComponent, {
      data: { mode: DialogMode.EDIT, groups: this.groups() },
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  private onAssignGroupToSubjectsSuccess(
    dialogRef: MatDialogRef<SubjectDialogAssignGroupComponent>
  ): void {
    this.updateTrigger.emit('0');
    // this.applyStateChangesToUrlQueryParams({[mode]: null});
    dialogRef.close();
  }

  protected onAssignGroupToSubjectsError(
    err: HttpErrorResponse,
    dialogRef: MatDialogRef<SubjectDialogAssignGroupComponent>
  ) {
    dialogRef.componentInstance.errorHappened(err);
  }
}
