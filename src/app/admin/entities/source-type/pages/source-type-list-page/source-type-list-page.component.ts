import {
  Component,
  inject,
  signal,
  computed
} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {SourceTypeTableRowComponent} from '../../components/source-type-table-row/source-type-table-row.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppOrganization} from '../../../organization/models/organization';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {SourceTypeStore} from '../../services/source-type.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';

@Component({
  selector: 'app-source-type-list-page',
  templateUrl: './source-type-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    EntityListPageComponent,
    SourceTypeTableRowComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceTypeListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private readonly route = inject(ActivatedRoute);

  readonly store = inject(SourceTypeStore);
  readonly configService = inject(SourceTypeConfigService);
  readonly dialogService = inject(SourceTypeDialogService);

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
  protected selection = new SelectionModel<AppOrganization>(true, []);

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
