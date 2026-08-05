import {Component, inject, signal, OnInit} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {PermissionConfigService} from '../../services/permission-config.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {PermissionTableRowComponent} from '../../components/permission-table-row/permission-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../shared/components/data-table-filter/data-table-filter.component';
import {AppUser} from "../../../user/models/user";
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../shared/enums/dialog';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {TableElement} from '../../../../shared/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ROLES} from '../../../../../shared/enums/roles';
import {PermissionStore} from '../../services/permission.store';
import {OrganizationStore} from '../../../organization/services/organization.store';

@Component({
  selector: 'app-permission-list-page',
  templateUrl: './permission-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    PermissionTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class PermissionListPageComponent implements OnInit {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  readonly store = inject(PermissionStore);
  readonly projectStore = inject(ProjectStore);
  readonly organizationStore = inject(OrganizationStore);
  readonly configService = inject(PermissionConfigService);
  readonly dialogService = inject(PermissionDialogService);
  authService = inject(AuthService);

  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppUser>(true, []);

  projectId = this.projectStore.selected()?.projectName;
  organizationId = this.organizationStore.selected()?.name;

  ngOnInit() {
    this.store.selected.set(null);
    // Reopen a dialog that was interrupted by session expiry, with its entered fields.
    void this.dialogService.restorePendingDialog();
  }

  handleFilterChange(event: FilterEvent) {
    this.store.setFilter(event);
  }

  switchPage(page: PageEvent) {
    this.store.setPage(page);
  }

  switchSort(element: TableElement) {
    this.store.toggleSort(element);
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }
}
