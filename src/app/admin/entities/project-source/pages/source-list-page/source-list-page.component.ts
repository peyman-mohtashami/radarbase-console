import {Component, inject, signal, computed} from '@angular/core';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {AppSource} from '../../models/source';
import {SourceTableRowComponent} from '../../components/source-table-row/source-table-row.component';
import {
  DataTableFilterComponent, FilterEvent,
} from '../../../../base-entities/containers/entity-list-page/data-table-filter/data-table-filter.component';
import {EntityListPageComponent} from '../../../../base-entities/containers/entity-list-page/entity-list-page.component';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {TranslatePipe} from '@ngx-translate/core';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectStore} from '../../../project/services/project.store';
import {getHighestPriorityClass} from '../../../../shared/utils/table-extension.util';
import {PageEvent} from '@angular/material/paginator';
import {DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS} from '../../../../base-entities/consts/default-table-values';
import {RbSort, TableElement} from '../../../../base-entities/models/table.model';
import {SelectionModel} from '@angular/cdk/collections';
import {DialogMode} from '../../../../base-entities/enums/dialog';
import {ROLES} from '../../../../../shared/enums/roles';
import {SourceStore} from '../../services/source.store';

@Component({
  selector: 'app-source-list-page',
  templateUrl: './source-list-page.component.html',
  imports: [
    DataTableFilterComponent,
    LoaderComponent,
    SourceTableRowComponent,
    EntityListPageComponent,
    MatButton,
    MatIcon,
    PermissionDirective,
    TranslatePipe,
  ]
})
export class SourceListPageComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private readonly route = inject(ActivatedRoute);

  readonly store = inject(SourceStore);
  readonly projectStore = inject(ProjectStore);
  readonly configService = inject(SourceConfigService);
  readonly dialogService = inject(SourceDialogService);

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
  protected selection = new SelectionModel<AppSource>(true, []);

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
  // override entityService = inject(SourceService);
  // override configService = inject(SourceConfigService);
  // override dialogService = inject(SourceDialogService);
  //
  // override entities = signal<AppSource[]>(this.activatedRoute.snapshot.data['sourceList']);
  // // project?: AppProject = this.selectedEntitiesService.getSelected().project();
  // projectId = this.activatedRoute.snapshot.paramMap.get('projectId');
  // project?: AppProject = findRouteData(this.activatedRoute, 'project');
  //
  // sourceTypes: AppSourceType[] = [];
  //
  //
  // override getEntities() {
  //   // return this.entityService.getWithQuery(this.params(), this.project?.projectName);
  //   return this.entityService.getWithQuery(this.params(), this.projectId ?? undefined);
  // }
  //
  // override ngOnInit() {
  //   if (!this.project) throw new Error('Project not found');
  //   this.sourceTypes = this.project.sourceTypes?.map(s => ({
  //     ...s,
  //     name: `${s.producer}/${s.model}/${s.catalogVersion}`,
  //     search: `${s.producer}/${s.model}/${s.catalogVersion}`
  //   })) ?? [];
  //   super.ngOnInit();
  // }
}
