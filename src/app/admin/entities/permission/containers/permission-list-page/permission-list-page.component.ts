import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {PermissionConfigService} from '../../services/permission-config.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {PermissionTableRowComponent} from '../../components/permission-table-row/permission-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {AppUser, RadarUser} from "../../../user/models/user";
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {PermissionService} from '../../services/permission.service';

@Component({
  selector: 'app-permission-list-page',
  templateUrl: './permission-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    PermissionTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class PermissionListPageComponent extends BaseEntityListPageComponent<AppUser, RadarUser> implements OnInit, OnDestroy {
  override entityService = inject(PermissionService);
  override configService = inject(PermissionConfigService);
  override dialogService = inject(PermissionDialogService);

  override entities = signal<AppUser[]>(this.activatedRoute.snapshot.data['permissionList']);

  currentOrganization?: AppOrganization = this.selectedEntitiesService.selectedOrganization();
  currentProject?: AppProject = this.selectedEntitiesService.selectedProject();

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.currentOrganization, this.currentProject);
  }

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }
}
