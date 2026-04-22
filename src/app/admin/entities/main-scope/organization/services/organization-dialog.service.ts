import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppOrganization, RadarOrganization} from '../models/organization';
import {OrganizationService} from './organization.service';
import {OrganizationDialogComponent} from '../containers/organization-dialog/organization-dialog.component';
import {BaseDialogService} from '../../../../base-entities/services/base-dialog.service';
import {OrganizationConfigService} from './organization-config.service';

@Injectable({providedIn: 'root'})
export class OrganizationDialogService extends BaseDialogService<AppOrganization, RadarOrganization, OrganizationDialogComponent>{
  override entityService = inject(OrganizationService);
  override configService = inject(OrganizationConfigService);

  override createDialogRef(mode: DialogMode, entity?: AppOrganization): MatDialogRef<OrganizationDialogComponent> {
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
