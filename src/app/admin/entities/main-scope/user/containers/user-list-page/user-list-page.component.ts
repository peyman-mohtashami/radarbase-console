import {Component, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {UserService} from '../../services/user.service';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {AppUser, RadarUser} from '../../models/user';
import {UserTableRowComponent} from '../../components/user-table-row/user-table-row.component';
import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  imports: [
    ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    UserTableRowComponent,
    EntityListPageComponent,
  ]
})
export class UserListPageComponent extends BaseEntityListPageComponent<AppUser, RadarUser> {
  protected override entityService = inject(UserService);
  protected override configService = inject(UserConfigService);
  protected override dialogService = inject(UserDialogService);

  override entities = signal<AppUser[]>(this.activatedRoute.snapshot.data['userList']);
}
