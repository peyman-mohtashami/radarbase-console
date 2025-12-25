import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {GroupTableRowComponent} from '../../components/group-table-row/group-table-row.component';
import {GroupService} from '../../services/group.service';
import {GroupConfigService} from '../../services/group-config.service';
import {GroupDialogService} from '../../services/group-dialog.service';
import {AppGroup, RadarGroup} from '../../models/group';
import {AppProject} from '../../../project/models/project';
import {ListPageHeaderComponent} from '../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-group-list-page',
  templateUrl: './group-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    GroupTableRowComponent,
    EntityListPageComponent,
  ]
})
export class GroupListPageComponent extends BaseEntityListPageComponent<AppGroup, RadarGroup> implements OnInit, OnDestroy {
  override entityService = inject(GroupService);
  override configService = inject(GroupConfigService);
  override dialogService = inject(GroupDialogService);

  override entities = signal<AppGroup[]>(this.activatedRoute.snapshot.data['groupList']);
  project?: AppProject = this.selectedEntitiesService.selectedProject();

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.project?.projectName);
  }

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
