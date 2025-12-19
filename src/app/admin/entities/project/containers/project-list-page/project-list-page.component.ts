import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
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
import {getCurrentOrganization} from '../../../../services/util';

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

  override entities = signal<AppProject[]>(this.activatedRoute.snapshot.data['projectList']);
  organizationFullList: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];
  sourceTypeFullList: AppSourceType[] = this.activatedRoute.snapshot.data['sourceTypeFullList'];

  organization?: AppOrganization = getCurrentOrganization(this.activatedRoute.snapshot);

  override GRID_VIEW_ENABLED = true;
  override gridView = true;

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getDialogData(entity?: AppProject) {
    return {
      entity: entity,
      // entities: this.entities(),
      organization: this.organization,
      organizations: this.organizationFullList,
      sourceTypes: this.sourceTypeFullList
    }
  }

  protected override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.organization?.name);
  }
}
