import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DialogMode} from '../enums/dialog';
import {BaseDialogComponent} from '../components/dialog/base-dialog.component';
import {BaseEntityService} from './base-entity.service';
import {BaseConfigService} from './base-config.service';
import {SelectedEntitiesService} from './selected-entities.service';

@Injectable({providedIn: 'root'})
export class BaseDialogService<T extends {_name: string;}, U, V extends BaseDialogComponent<T>> {
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);
  protected selectedEntitiesService = inject(SelectedEntitiesService);

  protected entityService!: BaseEntityService<T, U>;
  protected configService!: BaseConfigService;

  dialogUpdateEvent: WritableSignal<{mode: DialogMode | string; entity?: T;} | undefined> = signal(undefined);

  processUrlFragment(fragment: string) {
    const entityMetadata = this.configService.getEntityMetadata();
    const [, action, entityType, entityId] = fragment.split('/');
    if (entityType === entityMetadata.name) {
      const entity = entityId ? this.entityService.getEntity(entityId) : undefined;
      switch (action) {
        case 'add':
          this.openDialog(DialogMode.ADD);
          break;
        case 'edit':
          if (entity) this.openDialog(DialogMode.EDIT, entity);
          break;
        case 'delete':
          if (entity) this.openDialog(DialogMode.DELETE, entity);
          break;
      }
    }
  }

  openDialog(mode: DialogMode | string, entity?: T) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity);

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          const _entity = value.entity;
          const _action = value.action;
          if (!_entity) {
            dialogRef.close();
            this.clearFragmentUrl();
            return;
          }
          this.processDialogAction(_action, _entity).subscribe({
            next: (res) => {
              const entity = res ?? _entity;
              this.dialogUpdateEvent.set({mode, entity})
              dialogRef.close();
            },
            error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
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
        this.clearFragmentUrl();
        return of();
    }
  }

  clearFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined // Explicitly remove the fragment
    }).then();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDialogRef(_mode: DialogMode | string, _entity?: T): MatDialogRef<V> {
    throw new Error('Method not implemented.');
  }
}
