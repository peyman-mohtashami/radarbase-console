import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppOrganization, RadarOrganization} from '../models/organization';
import {OrganizationService} from './organization.service';
import {OrganizationDialogComponent} from '../containers/organization-dialog/organization-dialog.component';
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {OrganizationConfigService} from './organization-config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {BaseConfigService} from '../../../../base-entities/services/base-config.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({providedIn: 'root'})
export class OrganizationDialogService {
  entityService = inject(OrganizationService);
  configService = inject(OrganizationConfigService);

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected dialog = inject(MatDialog);

  dialogUpdateEvent: WritableSignal<{mode: DialogMode | string; entity?: AppOrganization;} | undefined> = signal(undefined);

  openDialog(mode: DialogMode, entity?: AppOrganization) {
    if (mode !== DialogMode.ADD && !entity) {
      return;
    }

    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as AppOrganization) : undefined;
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

  processDialogAction(actionType: DialogMode | string, entity: AppOrganization): Observable<AppOrganization | void> {
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

  createDialogRef(mode: DialogMode, entity?: AppOrganization): MatDialogRef<OrganizationDialogComponent> {
    const organizationFullList = this.entityService.getWithQuery();
    const _data = {id: 'organization-dialog', mode, entity, organizationFullList};

    switch (mode) {
      case DialogMode.DELETE:
        return this.dialog.open(OrganizationDialogComponent, {
          data: _data,
          width: '50%',
          hasBackdrop: true,
          disableClose: true,
          autoFocus: false,
          restoreFocus: false
        });
      default:
        return this.dialog.open(OrganizationDialogComponent, {
          id: 'organization-dialog',
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
  }
}
