import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {DialogMode} from '../enums/dialog';
import {BaseDialogComponent} from '../components/dialog/base-dialog.component';

// export interface UpdateTrigger {
//   mode: DialogMode;
//   entity: AppOrganization;
// }

@Injectable({providedIn: 'root'})
export class BaseDialogService<T, U extends BaseDialogComponent<T>> {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);

  protected entityService: any;// = inject(OrganizationService);

  dialogUpdateEvent: WritableSignal<{mode: DialogMode; entity: T;} | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: T | undefined, entities: T[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities);

    const dialogActionSubscription =
      dialogRef.componentInstance.dialogActionEvent.subscribe(
        (value) => {
          const _entity = value.entity;
          const _action = value.action;
          if (!_entity) {
            dialogRef.close();
            return;
          }
          this.processDialogAction(_action, _entity).subscribe({
            next: (res) => {
              const entity = res ?? _entity;
              // this.dialogUpdateEvent.set({mode, entity: {...entity, projects: entity.projects}})
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

  private processDialogAction(actionType: DialogMode, entity: T): Observable<T | void> {
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

  createDialogRef(mode: DialogMode, entity: T | undefined, entities: T[]): MatDialogRef<U> {
    throw new Error('Method not implemented.');
  }
}
