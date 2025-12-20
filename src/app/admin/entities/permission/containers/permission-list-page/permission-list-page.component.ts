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
import {AppUser} from "../../../user/models/user";
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';
import {PermissionService} from '../../services/permission.service';
import {getCurrentOrganization, getCurrentProject} from '../../../../services/util';

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
export class PermissionListPageComponent extends BaseEntityListPageComponent<AppUser> implements OnInit, OnDestroy {
  override entityService = inject(PermissionService);
  override configService = inject(PermissionConfigService);
  override dialogService = inject(PermissionDialogService);

  override entities = signal<AppUser[]>(this.activatedRoute.snapshot.data['permissionList']);
  // users: AppUser[] = this.activatedRoute.snapshot.data['userList'];

  currentOrganization?: AppOrganization = getCurrentOrganization(this.activatedRoute.snapshot);
  currentProject?: AppProject = getCurrentProject(this.activatedRoute.snapshot);

  override getEntities() {
    return this.entityService.getWithQuery(this.params(), this.currentOrganization, this.currentProject);
  }

  ngOnInit() {
    super.init();
  }

  ngOnDestroy() {
    super.destroy();
  }

  override getDialogData(entity?: AppUser) {
    return {
      entity: entity,
      entities: this.entities(),
      project: this.currentProject,
      organization: this.currentOrganization,
      // users: this.users,
    }
  }
}
