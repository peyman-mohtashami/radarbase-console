import {Component, inject, signal, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {UserConfigService} from '../../services/user-config.service';
import {UserDialogService} from '../../services/user-dialog.service';
import {AppUser, UserDialogMode} from '../../models/user';
import {UserTableRowComponent} from '../../components/user-table-row/user-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {UserStore} from '../../services/user.store';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    UserTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class UserListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(UserStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(UserConfigService);
  readonly dialogService = inject(UserDialogService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppUser>(true, []);

  ngOnInit() {
    // Reopen a dialog that was interrupted by session expiry, with its entered fields.
    void this.dialogService.restorePendingDialog();
  }

  async handleFilterChange(event: FilterEvent) {
    await this.store.setFilter(event);
  }

  async switchPage(page: PageEvent) {
    await this.store.setPage(page);
  }

  async switchSort(element: TableElement) {
    await this.store.toggleSort(element);
  }

  protected async openDialog(dialogMode: UserDialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }

  protected readonly UserDialogMode = UserDialogMode;
}
