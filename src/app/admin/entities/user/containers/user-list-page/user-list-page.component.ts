import {Component, OnDestroy, OnInit, inject, signal} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {UserService} from '../../services/user.service';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {AppUser} from '../../models/user';
import {UserTableRowComponent} from '../../components/user-table-row/user-table-row.component';
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
    }
  }
}
