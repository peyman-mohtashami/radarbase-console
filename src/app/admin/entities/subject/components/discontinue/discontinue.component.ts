import {Component, input, output} from '@angular/core';
import { DialogMode } from '../../../../enums/dialog';
import { SubjectDialogDiscontinueComponent } from '../../containers/subject-dialog-discontinue/subject-dialog-discontinue.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from '../../services/subject.service';
import { AppSubject } from "../../models/subject";
import {TranslatePipe} from "@ngx-translate/core";
import {MatMenuItem} from "@angular/material/menu";
import {MatIconButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {SubjectStatus} from '../../../../../shared/models/radar-subject.model';

@Component({
  selector: 'rb-discontinue',
  templateUrl: './discontinue.component.html',
  imports: [
    TranslatePipe,
    MatIconButton,
    MatTooltip,
    MatMenuItem
  ]
})
export class DiscontinueComponent {
  protected readonly SubjectStatus = SubjectStatus;

  entity = input.required<AppSubject>();
  mode = input<string>("BUTTON")

  updateTrigger = output<string>();

  constructor(
    private dialog: MatDialog,
    private entityService: SubjectService
  ) {}

  discontinue() {
    this.openDiscontinueDialog();
  }

  private openDiscontinueDialog() {
    const dialogRef = this.getDiscontinueDialogRef();
    // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: {
          action: DialogMode | string;
          entity: AppSubject;
        }) => {
          if (value.action === DialogMode.DELETE) {
            this.entityService.discontinue(this.entity()).subscribe({
              next: () => this.onDiscontinueSuccess(dialogRef),
              error: (err) => this.onDiscontinueError(err, dialogRef),
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

  private getDiscontinueDialogRef() {
    return this.dialog.open(SubjectDialogDiscontinueComponent, {
      data: {
        mode: DialogMode.DELETE,
        entity: this.entity(),
      },
      panelClass: ['w-full', 'max-w-[700px]!', 'sm:w-1/2'],
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  private onDiscontinueSuccess(
    dialogRef: MatDialogRef<SubjectDialogDiscontinueComponent>,
  ): void {
    this.updateTrigger.emit(this.entity().login);
    // this.applyStateChangesToUrlQueryParams({[mode]: null});
    dialogRef.close();
  }

  private onDiscontinueError(
    err: HttpErrorResponse,
    dialogRef: MatDialogRef<SubjectDialogDiscontinueComponent>
  ) {
    dialogRef.componentInstance.errorHappened(err);
  }
}
