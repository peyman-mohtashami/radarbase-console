import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {ProjectService} from '../../services/project.service';
import {ProjectConfigService} from '../../services/project-config.service';
import {ProjectDialogService} from '../../services/project-dialog.service';
import {AppProject, RadarProject} from '../../models/project';
import {ProjectTableRowComponent} from '../../components/project-table-row/project-table-row.component';
import {AppOrganization} from '../../../organization/models/organization';
// import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../../base-entities/enums/dialog';

@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    ProjectTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class ProjectListPageComponent extends BaseEntityListPageComponent<AppProject, RadarProject> {
  override entityService = inject(ProjectService);
  override configService = inject(ProjectConfigService);
  override dialogService = inject(ProjectDialogService);

  override entities = signal<AppProject[]>(this.activatedRoute.snapshot.data['projectList']);

  // organization?: AppOrganization = this.selectedEntitiesService.getSelected().organization();
  organizationId = this.activatedRoute.snapshot.paramMap.get('organizationId');

  override GRID_VIEW_ENABLED = true;
  override gridView = true;

  protected override getEntities() {
    // return this.entityService.getWithQuery(this.params(), this.organization?.name);
    return this.entityService.getWithQuery(this.params(), this.organizationId ?? undefined);
  }
}
