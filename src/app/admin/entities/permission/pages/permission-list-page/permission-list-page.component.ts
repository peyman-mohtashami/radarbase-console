import {Component, inject, signal, ChangeDetectionStrategy, computed} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {PermissionConfigService} from '../../services/permission-config.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {PermissionTableRowComponent} from '../../components/permission-table-row/permission-table-row.component';
// import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../shared/components/data-table-filter/data-table-filter.component';
import {AppUser, UserDto} from "../../../user/models/user";
// import {BaseEntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../shared/components/entity-list-page/entity-list-page.component';
import {AuthService} from '../../../../../core/auth/services/auth.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {DialogMode} from '../../../../shared/enums/dialog';
import {ActivatedRoute, Params} from '@angular/router';
import {UserStore} from '../../../user/services/user.store';
import {ProjectStore} from '../../../project/services/project.store';
import {UserConfigService} from '../../../user/services/user-config.service';
import {UserDialogService} from '../../../user/services/user-dialog.service';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS} from '../../../../shared/consts/default-table-values';
import {RbSort, TableElement} from '../../../../shared/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {ROLES} from '../../../../../shared/enums/roles';
import {PermissionStore} from '../../services/permission.store';
import {OrganizationStore} from '../../../organization/services/organization.store';

@Component({
  selector: 'app-permission-list-page',
  templateUrl: './permission-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    PermissionTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    // MatIconButton,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class PermissionListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private readonly route = inject(ActivatedRoute);

  readonly store = inject(PermissionStore);
  readonly projectStore = inject(ProjectStore);
  readonly organizationStore = inject(OrganizationStore);
  readonly configService = inject(PermissionConfigService);
  readonly dialogService = inject(PermissionDialogService);
  authService = inject(AuthService);

  private readonly queryParams = this.route.snapshot.queryParams;
  readonly entities = this.store.items;
  protected gridView = this.configService.getViewMode() === 'grid';

  readonly extensionClass = signal(getHighestPriorityClass(this.configService.getTableFields()));

  readonly page = signal<PageEvent>({
    pageIndex: this.queryParams['pageIndex'] ?? 0,
    pageSize: this.queryParams['pageSize'] ?? this.configService.getStoredPageSize() ?? DEFAULT_PAGE_SIZE,
    length: 0,
  });

  readonly sort = signal<RbSort>({
    sortField: this.queryParams['sortField'] ?? 'id',
    sortOrder: this.queryParams['sortOrder'] ?? 'desc',
  });

  readonly filter = signal<FilterEvent>(this.buildInitialFilter());

  readonly params = computed<Params>(() => ({
    pageIndex: this.page().pageIndex,
    pageSize: this.page().pageSize,
    sortField: this.sort().sortField,
    sortOrder: this.sort().sortOrder,
    ...this.filter(),
  }));

  protected isFilterOpened = true;
  protected selection = new SelectionModel<AppUser>(true, []);

  projectId = this.projectStore.selected()?.projectName;
  organizationId = this.organizationStore.selected()?.name;

  async handleFilterChange(event: FilterEvent) {
    this.filter.set(event);
    await this.reload();
  }

  async switchPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
    await this.reload();
  }

  async switchSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
    await this.reload();
  }

  toggleViewMode() {
    this.gridView = !this.gridView;
    this.configService.setViewMode(this.gridView ? 'grid' : 'list');
  }

  protected async openDialog(dialogMode: DialogMode) {
    await this.dialogService.openDialog(dialogMode);
  }

  private reload() {
    return this.store.getWithQuery(this.params());
  }

  private buildInitialFilter(): FilterEvent {
    return this.configService.getTableFilters().reduce<FilterEvent>((filter, {name}) => {
      filter[name] = this.queryParams[name];
      return filter;
    }, {});
  }
}
