import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {PermissionConfigService} from '../../services/permission-config.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {PermissionTableRowComponent} from '../../components/permission-table-row/permission-table-row.component';
// import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {AppUser, RadarUser} from "../../../user/models/user";
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {PermissionService} from '../../services/permission.service';
import {AuthService} from '../../../../../../core/auth/services/auth.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../../base-entities/enums/dialog';

@Component({
  selector: 'app-permission-list-page',
  templateUrl: './permission-list-page.component.html',
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    PermissionTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class PermissionListPageComponent extends BaseEntityListPageComponent<AppUser, RadarUser> {
  override entityService = inject(PermissionService);
  override configService = inject(PermissionConfigService);
  override dialogService = inject(PermissionDialogService);

  protected authService = inject(AuthService);

  override entities = signal<AppUser[]>(this.activatedRoute.snapshot.data['permissionList']);

  // currentOrganization?: AppOrganization = this.selectedEntitiesService.getSelected().organization();
  // currentProject?: AppProject = this.selectedEntitiesService.getSelected().project();

  organizationId = this.activatedRoute.snapshot.params['organizationId'];
  projectId = this.activatedRoute.snapshot.params['projectId'];

  override getEntities() {
    // return this.entityService.getWithQuery(this.params(), this.currentOrganization, this.currentProject);
    return this.entityService.getWithQuery(this.params(), this.organizationId ?? undefined, this.projectId ?? undefined);
  }
}
