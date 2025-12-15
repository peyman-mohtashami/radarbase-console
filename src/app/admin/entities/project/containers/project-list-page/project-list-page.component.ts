import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {ProjectService} from '../../services/project.service';
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {AppProject} from '../../models/project';
import {ProjectTableRowComponent} from '../../components/project-table-row/project-table-row.component';
import {AppOrganization} from '../../../organization/models/organization';
import {AppSourceType} from '../../../source-type/models/source-type';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    ProjectTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class ProjectListPageComponent extends BaseEntityListPageComponent<AppProject> implements OnInit, OnDestroy {
  override entityService = inject(ProjectService);
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);
  override GRID_VIEW_ENABLED = true;
  override gridView = true;

  organization?: AppOrganization = this.activatedRoute.parent?.parent?.snapshot.data['organization'];
  organizations: AppOrganization[] = this.activatedRoute.snapshot.data['organizations'];
  sourceTypes: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypes'];

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getDialogData(entity?: AppProject) {
    return {
      entity: entity,
      entities: this.entities(),
      organization: this.organization,
      organizations: this.organizations,
      sourceTypes: this.sourceTypes
    }
  }
}
