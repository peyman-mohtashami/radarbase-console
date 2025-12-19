import {Component, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {GroupTableRowComponent} from '../../components/group-table-row/group-table-row.component';
import {GroupService} from '../../services/group.service';
import {GroupConfigService} from '../../services/group-config.service';
import {GroupDialogService} from '../../services/group-dialog.service';
import {AppGroup} from '../../models/group';
import {AppProject} from '../../../project/models/project';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {getCurrentProject} from '../../../../services/util';

@Component({
  selector: 'app-group-list-page',
  templateUrl: './group-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    GroupTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class GroupListPageComponent extends BaseEntityListPageComponent<AppGroup> implements OnInit, OnDestroy {
  override entityService = inject(GroupService);
  override configService = inject(GroupConfigService);
  override dialogService = inject(GroupDialogService);

  override entities = signal<AppGroup[]>(this.activatedRoute.snapshot.data['groupList']);
  project?: AppProject = getCurrentProject(this.activatedRoute.snapshot);

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
