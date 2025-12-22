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

export interface UpdateTrigger {
  mode: DialogMode | string;
  entity?: AppProtocol;
}

@Injectable({providedIn: 'root'})
export class ProtocolDialogService {
  private entityService = inject(ProtocolService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppProtocol | undefined, entities: AppProtocol[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, {entity});

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppProtocol }) => {
        this.dialogUpdateEvent.set({mode: value.action, entity: value.entity});
        dialogRef.close();
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  createDialogRef(mode: DialogMode, data: {entity: AppProtocol | undefined}): MatDialogRef<ProtocolDialogComponent> {
    const formEntity = data.entity ? this.entityService.appToFormModel(data.entity) : undefined;
    const protocolFullList = this.entityService.getAll();

    const _data = {mode, entity: formEntity, entities: protocolFullList};

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
    const dialogRef = this.createPublishDialogRef(mode, entities);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode | string; entity: AppConfig }) => {
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
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  createPublishDialogRef(mode: "publish" | "discard", entities?: AppProtocol[]): MatDialogRef<ConfigPublishDialogComponent> {
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
