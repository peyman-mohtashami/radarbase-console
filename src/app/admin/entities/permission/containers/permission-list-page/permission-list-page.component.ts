import {Component, OnDestroy, OnInit, inject} from '@angular/core';
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

  currentOrganization?: AppOrganization = this.activatedRoute.snapshot.parent?.parent?.data['organization'] ?? this.activatedRoute.snapshot.parent?.parent?.parent?.parent?.data['organization'];
  currentProject?: AppProject = this.activatedRoute.snapshot.parent?.parent?.data['entity'];
  users: AppUser[] = this.activatedRoute.snapshot.data['users'];

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
      users: this.users,
    }
  }
}
