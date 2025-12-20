import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {DialogMode} from '../../../../enums/dialog';
import {UserService} from '../../services/user.service';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {AppUser} from '../../models/user';
import {UserTableRowComponent} from '../../components/user-table-row/user-table-row.component';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../components/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../components/entity-list-page/base-entity-list-page.component';
import {EntitiesPageComponent} from '../../../../components/entity-list-page/entities-page.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    UserTableRowComponent,
    EntitiesPageComponent,
  ]
})
export class UserListPageComponent extends BaseEntityListPageComponent<AppUser> implements OnInit, OnDestroy {
  protected override entityService = inject(UserService);
  protected override configService = inject(UserConfigService);
  protected override dialogService = inject(UserDialogService);

  override entities = signal<AppUser[]>(this.activatedRoute.snapshot.data['userList']);
  projects: AppProject[] = this.activatedRoute.snapshot.data['projectFullList'];
  organizations: AppOrganization[] = this.activatedRoute.snapshot.data['organizationFullList'];

  // override processUrlFragment(fragment: string) {
  //   const entityMetadata = this.configService.getEntityMetadata()
  //   const [, action, entityType, entityId] = fragment.split('/');
  //   if (entityType === entityMetadata.name) {
  //     const entity = this.entities().find(e => e.id == entityId);
  //     switch (action) {
  //       case 'add':
  //         this.dialogService.openDialog(DialogMode.ADD, {entities: this.entities(), projects: this.projects, organizations: this.organizations});
  //         break;
  //       case 'edit':
  //         if (entity) this.dialogService.openDialog(DialogMode.EDIT, {entity, entities: this.entities(), projects: this.projects, organizations: this.organizations});
  //         break;
  //       case 'delete':
  //         if (entity) this.dialogService.openDialog(DialogMode.DELETE, {entity, entities: this.entities(), projects: this.projects, organizations: this.organizations});
  //         break;
  //       case 'activate':
  //         if (entity) this.dialogService.openDialog('activate', {entity, entities: this.entities(), projects: this.projects, organizations: this.organizations});
  //         break;
  //     }
  //   }
  // }

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
      projects: this.projects,
      organizations: this.organizations
    }
  }
}
