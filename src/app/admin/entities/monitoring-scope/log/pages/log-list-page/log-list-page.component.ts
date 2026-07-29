import {Component, inject, signal, ChangeDetectionStrategy, computed} from '@angular/core';
import {LoaderComponent} from '../../../../../../shared/components/loader/loader.component';
import {LogConfigService} from '../../services/log-config.service';
import {AppLog, LogDto} from '../../models/log';
import {LogTableRowComponent} from '../../components/log-table-row/log-table-row.component';
// import {ListPageHeaderComponent} from '../../../../../base-entities/containers/entity-list-page/list-page-header/list-page-header.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {BaseEntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/base-entity-list-page.component';
import {EntityListPageComponent} from '../../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {LogService} from '../../services/log.service';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Params} from '@angular/router';
import {OrganizationStore} from '../../../../organization/services/organization.store';
import {OrganizationConfigService} from '../../../../organization/services/organization-config.service';
import {OrganizationDialogService} from '../../../../organization/services/organization-dialog.service';
import {getHighestPriorityClass} from '../../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS} from '../../../../../base-entities/consts/default-table-values';
import {RbSort, TableElement} from '../../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {AppOrganization} from '../../../../organization/models/organization';
import {DialogMode} from '../../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../../shared/enums/roles';
import {LogStore} from '../../services/log.store';

@Component({
  selector: 'app-log-list-page',
  templateUrl: './log-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    // ListPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    LogTableRowComponent,
    EntityListPageComponent,
    TranslatePipe,
  ]
})
export class LogListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private readonly route = inject(ActivatedRoute);

  readonly store = inject(LogStore);
  readonly configService = inject(LogConfigService);
  // readonly dialogService = inject(OrganizationDialogService);

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
  protected selection = new SelectionModel<AppLog>(true, []);

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

  // protected async openDialog(dialogMode: DialogMode) {
  //   await this.dialogService.openDialog(dialogMode);
  // }

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
