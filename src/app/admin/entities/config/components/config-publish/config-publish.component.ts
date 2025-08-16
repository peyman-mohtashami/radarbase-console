import {Component, EventEmitter, input, Input, output, Output} from '@angular/core';
import { DialogMode } from '../../../../enums/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfigService } from "../../services/config.service";
import { ConfigPublishDialogComponent } from "../../containers/config-publish-dialog/config-publish-dialog.component";
import {AppConfig} from "../../models/config";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'rb-config-publish',
  templateUrl: './config-publish.component.html',
  imports: [
    MatButton
  ]
})
export class ConfigPublishComponent {
  entity = input.required<AppConfig[]>()
  updateTrigger = output<string>();

  constructor(
    private dialog: MatDialog,
    private entityService: ConfigService,
  ) {}

  onPublish(entity: AppConfig[], e?: Event) {
    console.log(1111, entity)
    e?.stopPropagation();
    if (entity) {
      return this.openDialog(entity);
    }
  }


  publish(entities: AppConfig[]) {
    return this.entityService.publish(entities);
  }

  private openDialog(entity: AppConfig[]) {
    const dialogRef = this.getDialogRef(entity);
    // this.applyStateChangesToUrlQueryParams({ [mode]: entity? entity.name : 'new' });

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: {
          action: DialogMode | string;
          entity: AppConfig[];
        }) => {
          this.publish(entity).subscribe({
            next: () => this.onSuccess(dialogRef, entity),
            error: (err) => this.onError(err, dialogRef),
          });
          // } else if (value.action === 'close') {
          //   // this.applyStateChangesToUrlQueryParams({[mode]: null});
          // }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  getDialogRef(entity?: AppConfig[]) {
    return this.dialog.open(ConfigPublishDialogComponent, {
      data: { mode: DialogMode.DELETE, entity },
      panelClass: ['w-full', 'sm:w-1/2'],
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  private onSuccess(
    dialogRef: MatDialogRef<ConfigPublishDialogComponent>,
    entity: AppConfig[]
  ): void {
    this.updateTrigger.emit('0');
    // this.applyStateChangesToUrlQueryParams({[mode]: null});
    dialogRef.close();
  }

  protected onError(
    err: HttpErrorResponse,
    dialogRef: MatDialogRef<ConfigPublishDialogComponent>
  ) {
    dialogRef.componentInstance.errorHappened(err);
  }

  onDiscard() {
    this.updateTrigger.emit('0');
  }
}
