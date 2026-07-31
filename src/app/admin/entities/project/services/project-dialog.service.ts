import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppProject} from '../models/project';
import {ProjectConfigService} from './project-config.service';
import {OrganizationStore} from '../../organization/services/organization.store';
import {ProjectStore} from './project.store';
import {
  ProjectDialogComponent,
  ProjectForm,
  StoredProjectDialog
} from '../dialogs/project-dialog/project-dialog.component';
import {SourceTypeStore} from '../../source-type/services/source-type.store';

@Injectable({providedIn: 'root'})
export class ProjectDialogService {
  private store = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private dialog = inject(MatDialog);
  private configService = inject(ProjectConfigService);

  async openDialog(mode: DialogMode, entity?: AppProject, restoredModel?: ProjectForm) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity, restoredModel);
  }

  async restorePendingDialog() {
    if (this.dialog.openDialogs.length) return;

    const state = this.configService.getDialogState<StoredProjectDialog>();
    if (!state) return;

    await this.openDialog(state.mode, state.entity, state.model);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppProject, restoredModel?: ProjectForm): Promise<MatDialogRef<ProjectDialogComponent>> {
    if (!this.store.allItems().length) {
      await this.store.getAll();
    }
    const projectFullList = this.store.allItems();

    if (!this.organizationStore.allItems().length) {
      await this.organizationStore.getAll();
    }
    const organizationFullList = this.organizationStore.allItems();

    if (!this.sourceTypeStore.allItems().length) {
      await this.sourceTypeStore.getAll();
    }
    const sourceTypeFullList = this.sourceTypeStore.allItems();

    const organization = this.organizationStore.selected();

    const _data = {id: 'project-dialog', mode, entity, organization, projectFullList, sourceTypeFullList, organizationFullList, restoredModel};

    return this.dialog.open(ProjectDialogComponent, {
      id: 'project-dialog',
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
