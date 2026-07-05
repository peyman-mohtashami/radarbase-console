import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DialogMode} from '../enums/dialog';
import {BaseEntityDialogComponent} from '../containers/entity-dialog/base-entity-dialog.component';
import {BaseEntityService} from './base-entity.service';
import {BaseConfigService} from './base-config.service';
import {SelectedEntitiesService} from '../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class BaseDialogService<T extends {_name: string;}, U, V extends BaseEntityDialogComponent<T>> {
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  protected selectedEntitiesService = inject(SelectedEntitiesService);

  protected entityService!: BaseEntityService<T, U>;
  protected configService!: BaseConfigService;

  dialogUpdateEvent: WritableSignal<{mode: DialogMode | string; entity?: T;} | undefined> = signal(undefined);

  openDialog(mode: DialogMode | string, entity?: T) {
    if (mode !== DialogMode.ADD && !entity) {
      return;
    }

    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as T) : undefined;
    const dialogRef = this.createDialogRef(mode, storedEntity ?? entity);
    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          const _entity = value.entity;
          const _action = value.action;
          if (!_entity) {
            this.configService.setLatestFormEntry(null);
            dialogRef.close();
            return;
          }
          this.configService.setLatestFormEntry(_entity);
          this.processDialogAction(_action, _entity).subscribe({
            next: (res) => {
              this.configService.setLatestFormEntry(null);
              const entity = res ?? _entity;
              this.dialogUpdateEvent.set({mode, entity})
              dialogRef.close();
              setTimeout(() => {
                this.dialogUpdateEvent.set(undefined);
              })
            },
            error: (error: HttpErrorResponse) => {
              this.configService.setLatestFormEntry(null);
              dialogRef.componentInstance.errorHappened(error)
            },
          });
        }
      );

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  processDialogAction(actionType: DialogMode | string, entity: T): Observable<T | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
      default:
        return of();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDialogRef(_mode: DialogMode | string, _entity?: T): MatDialogRef<V> {
    throw new Error('Method not implemented.');
  }
}
