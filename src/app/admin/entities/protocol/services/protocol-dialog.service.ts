import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AppProtocol} from "../models/protocol";
import {ProtocolService} from "./protocol.service";
import {AppConfig} from "../../config/models/config";
import {
  ConfigPublishDialogComponent
} from "../../config/containers/config-publish-dialog/config-publish-dialog.component";
import {ProtocolDialogComponent} from "../containers/protocol-dialog/protocol-dialog.component";
import {BaseDialogService} from '../../../services/base-dialog.service';

@Injectable({providedIn: 'root'})
export class ProtocolDialogService extends BaseDialogService<AppProtocol, ProtocolDialogComponent> {
  override entityService = inject(ProtocolService);

  override createDialogRef(mode: DialogMode, data: {entity: AppProtocol | undefined, entities: AppProtocol[]}): MatDialogRef<ProtocolDialogComponent> {
    const {entity, entities} = data;
    const formEntity = entity ? this.entityService.appToFormModel(entity) : undefined;
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(ProtocolDialogComponent, {
          data: {mode, entity: formEntity, entities},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(ProtocolDialogComponent, {
          data: {mode, entity: formEntity, entities},
          panelClass: 'tailwind-slide-panel',
          width: '80%',
          height: '100vh',
          position: {right: '0'},
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
    }

  }

  openPublishDialog(mode: "publish" | "discard", data: {entities: AppProtocol[], projectId?: string, subjectId?: string}) {
    const dialogRef = this.createPublishDialogRef(mode, data);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
      (value: { action: DialogMode | string; entity?: AppConfig[] | undefined }) => {
        if (value.action === 'publish') {
          if (data.entities) {
            this.entityService.publish(data).subscribe({
              next: () => {
                this.dialogUpdateEvent.set({mode: 'published', entity: undefined});
                dialogRef.close();
              },
              error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
            })
          }
        } else if (value.action === 'discard') {
          this.dialogUpdateEvent.set({mode: 'discarded', entity: undefined});
          dialogRef.close();
        }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createPublishDialogRef(mode: "publish" | "discard", data: {entities: AppProtocol[], projectId?: string, subjectId?: string}): MatDialogRef<ConfigPublishDialogComponent> {
    const {entities, projectId, subjectId} = data;
    return this.dialog.open(ConfigPublishDialogComponent, {
      data: {mode, entities},
      width: '50%',
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
