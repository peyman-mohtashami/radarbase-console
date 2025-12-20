import {inject, Injectable} from '@angular/core';
import {DialogMode} from '../../../enums/dialog';
import {MatDialogRef} from '@angular/material/dialog';
import {AppProject} from '../models/project';
import {ProjectService} from './project.service';
import {ProjectDialogComponent} from '../containers/project-dialog/project-dialog.component';
import {AppOrganization, RadarOrganization} from '../../organization/models/organization';
import {AppSourceType} from '../../source-type/models/source-type';
import {BaseDialogService} from '../../../services/base-dialog.service';
import {ProjectConfigService} from './project-config.service';
import {OrganizationService} from '../../organization/services/organization.service';
import {SourceTypeService} from '../../source-type/services/source-type.service';

@Injectable({providedIn: 'root'})
export class ProjectDialogService extends BaseDialogService<AppProject, ProjectDialogComponent> {
  override entityService = inject(ProjectService);
  override configService = inject(ProjectConfigService);

  organizationService = inject(OrganizationService);
  sourceTypeService = inject(SourceTypeService);

  override createDialogRef(mode: DialogMode, data: {entity: AppProject | undefined, entities: AppProject[], organization: RadarOrganization | undefined, organizations: AppOrganization[], sourceTypes: AppSourceType[]}): MatDialogRef<ProjectDialogComponent> {
    const projectFullList = this.entityService.getWithQuery();
    const organizationFullList = this.organizationService.getWithQuery();
    const sourceTypeFullList = this.sourceTypeService.getWithQuery();
    const _data = {mode, entity: data.entity, organization: data.organization, projectFullList, sourceTypeFullList, organizationFullList};

    return this.dialog.open(ProjectDialogComponent, {
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
