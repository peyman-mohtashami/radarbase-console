import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AppOrganization} from '../models/organization';
import {OrganizationService} from './organization.service';
import {OrganizationDialogComponent} from '../containers/organization-dialog/organization-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';

//
// export interface UpdateTrigger {
//   mode: DialogMode;
//   entity: AppOrganization;
// }

@Injectable({providedIn: 'root'})
export class OrganizationDialogService extends BaseDialogService<AppOrganization, OrganizationDialogComponent>{
  override entityService = inject(OrganizationService);

  override createDialogRef(mode: DialogMode, entity: AppOrganization | undefined, entities: AppOrganization[]): MatDialogRef<OrganizationDialogComponent> {
    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(OrganizationDialogComponent, {
          data: {mode, entity, entities},
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(OrganizationDialogComponent, {
          data: {mode, entity, entities},
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

//
// export interface UpdateTrigger {
//   mode: DialogMode;
//   entity: AppOrganization;
// }
//
// @Injectable({providedIn: 'root'})
// export class OrganizationDialogService {
//   private entityService = inject(OrganizationService);
//   private router = inject(Router);
//   private activatedRoute = inject(ActivatedRoute);
//   private dialog = inject(MatDialog);
//
//   dialogUpdateEvent: WritableSignal<UpdateTrigger | undefined> = signal(undefined);
//
//   openDialog(mode: DialogMode, entity: AppOrganization | undefined, entities: AppOrganization[]) {
//     if (mode !== DialogMode.ADD && !entity) {
//       this.clearFragmentUrl();
//       return;
//     }
//
//     const dialogRef = this.createDialogRef(mode, entity, entities);
//
//     const dialogActionSubscription =
//       dialogRef.componentInstance.dialogActionEvent.subscribe(
//         (value) => {
//           const _entity = value.entity;
//           const _action = value.action;
//           if (!_entity) {
//             dialogRef.close();
//             return;
//           }
//           this.processDialogAction(_action, _entity).subscribe({
//             next: (res) => {
//               const entity = res ?? _entity;
//               this.dialogUpdateEvent.set({mode, entity: {...entity, projects: entity.projects}})
//               dialogRef.close();
//             },
//             error: (error: HttpErrorResponse) => dialogRef.componentInstance.errorHappened(error),
//           });
//         }
//       );
//
//     dialogRef.afterClosed().subscribe(() => {
//       dialogActionSubscription.unsubscribe();
//     });
//   }
//
//   private processDialogAction(actionType: DialogMode, entity: AppOrganization): Observable<AppOrganization | void> {
//     switch (actionType) {
//       case DialogMode.ADD:
//         return this.entityService.add(entity);
//       case DialogMode.EDIT:
//         return this.entityService.update(entity);
//       case DialogMode.DELETE:
//         return this.entityService.delete(entity);
//       default:
//         this.clearFragmentUrl();
//         return of();
//     }
//   }
//
//   clearFragmentUrl() {
//     this.router.navigate([], {
//       relativeTo: this.activatedRoute,
//       queryParamsHandling: 'preserve',
//       fragment: undefined // Explicitly remove the fragment
//     }).then();
//   }
//
//   createDialogRef(mode: DialogMode, entity: AppOrganization | undefined, entities: AppOrganization[]): MatDialogRef<OrganizationDialogComponent> {
//     switch (mode) {
//       case DialogMode.DELETE:
//         return this.dialog.open(OrganizationDialogComponent, {
//           data: {mode, entity, entities},
//           width: '50%',
//           hasBackdrop: true,
//           disableClose: true,
//           autoFocus: false,
//           restoreFocus: false
//         });
//       default:
//         return this.dialog.open(OrganizationDialogComponent, {
//           data: {mode, entity, entities},
//           panelClass: 'tailwind-slide-panel',
//           width: '50%',
//           height: '100vh',
//           position: {right: '0'},
//           hasBackdrop: true,
//           disableClose: true,
//           autoFocus: false,
//           restoreFocus: false
//         });
//     }
//
//   }
// }
