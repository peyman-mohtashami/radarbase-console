import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppOrganization} from '../models/organization';
import {OrganizationService} from './organization.service';
import {OrganizationDialogComponent} from '../containers/organization-dialog/organization-dialog.component';
import {BaseDialogService} from '../../../services/base-dialog.service';

@Injectable({providedIn: 'root'})
export class OrganizationDialogService extends BaseDialogService<AppOrganization, OrganizationDialogComponent>{
  override entityService = inject(OrganizationService);

  override createDialogRef(mode: DialogMode, data: {entity: AppOrganization | undefined, entities: AppOrganization[]}): MatDialogRef<OrganizationDialogComponent> {
    const {entity, entities} = data;
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
