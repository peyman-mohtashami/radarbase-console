import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {PermissionService} from './permission.service';
import {AppUser} from '../models/user';
import {AppProject} from '../../project/models/project';
import {AppOrganization} from '../../organization/models/organization';
import {PermissionDialogComponent} from '../containers/permission-dialog/permission-dialog.component';

export interface UpdateTrigger {
  mode: DialogMode;
  entity: AppUser;
}

@Injectable({providedIn: 'root'})
export class PermissionDialogService {
  private entityService = inject(PermissionService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent$: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity: AppUser | undefined, entities: AppUser[], project?: AppProject, organization?: AppOrganization) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities, project, organization);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppUser }) => {
        this.processDialogAction(value.action, value.entity).subscribe({
          next: (res) => {
            this.dialogUpdateEvent$.set({mode, entity: res ?? value.entity})
            dialogRef.close();
          },
          error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
        });
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  private processDialogAction(actionType: DialogMode, entity: AppUser): Observable<AppUser | void> {
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

  createDialogRef(mode: DialogMode, entity: AppUser | undefined, entities: AppUser[], project?: AppProject, organization?: AppOrganization): MatDialogRef<PermissionDialogComponent> {
    return this.dialog.open(PermissionDialogComponent, {
      data: {mode, entity, entities, project, organization},
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
