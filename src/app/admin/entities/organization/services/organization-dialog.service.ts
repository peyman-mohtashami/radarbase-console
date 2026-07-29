import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppOrganization} from '../models/organization';
import {OrganizationStore} from './organization.store';
import {OrganizationConfigService} from './organization-config.service';
import {
  OrganizationDialogComponent,
  OrganizationForm,
  StoredOrganizationDialog,
} from '../dialogs/organization-dialog/organization-dialog.component';

@Injectable({providedIn: 'root'})
export class OrganizationDialogService {
  private store = inject(OrganizationStore);
  private dialog = inject(MatDialog);
  private configService = inject(OrganizationConfigService);

  async openDialog(mode: DialogMode, entity?: AppOrganization, restoredModel?: OrganizationForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredOrganizationDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppOrganization, restoredModel?: OrganizationForm): Promise<MatDialogRef<OrganizationDialogComponent>> {
    if (!this.store.allItems().length) {
      await this.store.getAll();
    }
    const organizationFullList = this.store.allItems();

    const _data = {id: 'organization-dialog', mode, entity, organizationFullList, restoredModel};

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
