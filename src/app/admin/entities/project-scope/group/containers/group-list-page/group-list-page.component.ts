import {Component, inject, signal, ChangeDetectionStrategy} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {GroupTableRowComponent} from '../../components/group-table-row/group-table-row.component';
import {GroupService} from '../../services/group.service';
import {GroupConfigService} from '../../services/group-config.service';
import {GroupDialogService} from '../../services/group-dialog.service';
import {AppGroup, RadarGroup} from '../../models/group';
import {AppProject} from '../../../../main-scope/project/models/project';
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
import {findRouteData} from '../../../../main-scope/organization/services/organization.service';

@Component({
  selector: 'app-group-list-page',
  templateUrl: './group-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    GroupTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class GroupListPageComponent extends BaseEntityListPageComponent<AppGroup, RadarGroup> {
  override entityService = inject(GroupService);
  override configService = inject(GroupConfigService);
  override dialogService = inject(GroupDialogService);

  override entities = signal<AppGroup[]>(this.activatedRoute.snapshot.data['groupList']);
  // project?: AppProject = this.selectedEntitiesService.getSelected().project();
  projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
  project?: AppProject = findRouteData(this.activatedRoute, 'project');


  override getEntities() {
    // return this.entityService.getWithQuery(this.params(), this.project?.projectName);
    return this.entityService.getWithQuery(this.params(), this.projectId ?? undefined);
  }
}
