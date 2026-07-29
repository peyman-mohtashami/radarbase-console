import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppOrganization} from '../models/organization';
import {OrganizationStore} from './organization.store';
import {OrganizationDialogComponent} from '../dialogs/organization-dialog/organization-dialog.component';

@Injectable({providedIn: 'root'})
export class OrganizationDialogService {
  private store = inject(OrganizationStore);
  private dialog = inject(MatDialog);

  async openDialog(mode: DialogMode, entity?: AppOrganization) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppOrganization): Promise<MatDialogRef<OrganizationDialogComponent>> {
    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as AppOrganization) : undefined;

    if (this.store.items()) {
      await this.store.getWithQuery();
    }
    const organizationFullList = this.store.items();

    const _data = {id: 'organization-dialog', mode, entity: storedEntity ?? entity, organizationFullList};

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
