import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {AppProtocol, RadarProtocol} from "../models/protocol";
import {ProtocolService} from "./protocol.service";
import {
  ConfigPublishDialogComponent
} from "../../config/containers/config-publish-dialog/config-publish-dialog.component";
import {ProtocolDialogComponent} from "../containers/protocol-dialog/protocol-dialog.component";
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {ProtocolConfigService} from './protocol-config.service';

@Injectable({providedIn: 'root'})
export class ProtocolDialogService extends BaseDialogService<AppProtocol, RadarProtocol, ProtocolDialogComponent> {
  override entityService = inject(ProtocolService);
  override configService = inject(ProtocolConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppProtocol): MatDialogRef<ProtocolDialogComponent> {
    const protocolFullList = this.entityService.getWithQuery();

    const _data = {id: 'protocol-dialog', mode, entity, protocolFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(ProtocolDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(ProtocolDialogComponent, {
          id: 'protocol-dialog',
          data: _data,
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

  openPublishDialog(mode: "publish" | "discard", entities: AppProtocol[], projectId?: string, subjectId?: string) {
    const dialogRef = this.createPublishDialogRef(mode);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
      (value) => {
        if (value.action === 'publish') {
          if (entities) {
            this.entityService.publish(entities, projectId, subjectId).subscribe({
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
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createPublishDialogRef(mode: "publish" | "discard"): MatDialogRef<ConfigPublishDialogComponent> {
    const originalList = this.entityService.cache;
    const updatedList = this.entityService.updatedList;
    return this.dialog.open(ConfigPublishDialogComponent, {
      data: {mode, originalList, updatedList},
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: {right: '0'},
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }
}
