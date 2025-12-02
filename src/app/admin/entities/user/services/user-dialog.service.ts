import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {AppUser} from '../models/user';
import {UserDialogComponent} from '../containers/user-dialog/user-dialog.component';
import {AppProject} from '../../project/models/project';
import {AppOrganization} from '../../organization/models/organization';
import {UserActivateDialogComponent} from '../containers/user-activate-dialog/user-activate-dialog.component';

export interface UpdateTrigger {
  mode: DialogMode | string;
  entity: AppUser;
}

@Injectable({providedIn: 'root'})
export class UserDialogService {
  private entityService = inject(UserService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);

  openDialog(mode: DialogMode | string, entity: AppUser | undefined, entities: AppUser[], projects: AppProject[], organizations: AppOrganization[]) {
    if (mode !== DialogMode.ADD && !entity) {
      this.clearFragmentUrl();
      return;
    }

    const dialogRef = this.createDialogRef(mode, entity, entities, projects, organizations);

    const dialogActionSubscription = dialogRef.componentInstance.dialogActionEvent.subscribe({
      next: (value: { action: DialogMode; entity: AppUser }) => {
        this.processDialogAction(value.action, value.entity).subscribe({
          next: (res) => {
            this.dialogUpdateEvent.set({mode, entity: res ?? value.entity})
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

  private processDialogAction(actionType: DialogMode | string, entity: AppUser): Observable<AppUser | void> {
    switch (actionType) {
      case DialogMode.ADD:
        return this.entityService.add(entity);
      case DialogMode.EDIT:
        return this.entityService.update(entity);
      case DialogMode.DELETE:
        return this.entityService.delete(entity);
      case 'activate':
        return this.entityService.sendActivationEmail(entity);
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

  createDialogRef(mode: DialogMode | string, entity: AppUser | undefined, entities: AppUser[], projects: AppProject[], organizations: AppOrganization[]): MatDialogRef<UserDialogComponent | UserActivateDialogComponent> {
    switch (mode) {
      case 'activate':
        return this.dialog.open(UserActivateDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      case DialogMode.DELETE:
        return this.dialog.open(UserDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(UserDialogComponent, {
          data: {mode, entity, entities, projects, organizations},
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
}
