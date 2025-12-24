import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {AppConfig, RadarConfig} from '../models/config';
import {ConfigService} from './config.service';
import {ConfigDialogComponent} from '../containers/config-dialog/config-dialog.component';
import {ConfigPublishDialogComponent} from '../containers/config-publish-dialog/config-publish-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {ConfigConfigService} from './config-config.service';

@Injectable({providedIn: 'root'})
export class ConfigDialogService extends BaseDialogService<AppConfig, RadarConfig, ConfigDialogComponent> {
  override entityService = inject(ConfigService);
  override configService = inject(ConfigConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppConfig): MatDialogRef<ConfigDialogComponent> {
    const _data = {mode, entity};

    return this.dialog.open(ConfigDialogComponent, {
      data: _data,
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

  openPublishDialog(mode: "publish" | "discard", entities: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
    const dialogRef = this.createPublishDialogRef(mode);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe(
      (value) => {
        if (value.action === 'publish') {
          if (entities) {
            this.entityService.publish(entities, clientId, projectId, subjectId).subscribe({
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

