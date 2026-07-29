import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../base-entities/enums/dialog';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AppProject} from '../models/project';
import {ProjectConfigService} from './project-config.service';
import {SourceTypeService} from '../../source-type/services/source-type.service';
import {OrganizationStore} from '../../organization/services/organization.store';
import {ProjectStore} from './project.store';
import {ProjectDialogComponent} from '../dialogs/project-dialog/project-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {findRouteData} from '../../../shared/utils/route';
import {SourceTypeStore} from '../../source-type/services/source-type.store';

@Injectable({providedIn: 'root'})
export class ProjectDialogService {
  private projectStore = inject(ProjectStore);
  private organizationStore = inject(OrganizationStore);
  private sourceTypeStore = inject(SourceTypeStore);
  private configService = inject(ProjectConfigService);
  private dialog = inject(MatDialog);
  private activatedRoute = inject(ActivatedRoute);


  async openDialog(mode: DialogMode, entity?: AppProject) {
    if (mode !== DialogMode.ADD && !entity) return;
    await this.createDialogRef(mode, entity);
  }

  private async createDialogRef(mode: DialogMode, entity?: AppProject): Promise<MatDialogRef<ProjectDialogComponent>> {
    const storedEntityString = null; //this.configService.getLatestFormEntry();
    const storedEntity = storedEntityString ? (JSON.parse(storedEntityString) as AppProject) : undefined;

    if (this.projectStore.items()) {
      await this.projectStore.getWithQuery();
    }
    const projectFullList = this.projectStore.items();

    if (this.organizationStore.items()) {
      await this.organizationStore.getWithQuery();
    }
    const organizationFullList = this.organizationStore.items();

    if (this.sourceTypeStore.items()) {
      await this.sourceTypeStore.getWithQuery();
    }
    const sourceTypeFullList = this.sourceTypeStore.items();

    const organization = this.organizationStore.selected();

    const _data = {id: 'project-dialog', mode, entity, organization, projectFullList, sourceTypeFullList, organizationFullList};

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
