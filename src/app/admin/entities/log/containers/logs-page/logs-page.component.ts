import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {TableQueryReflectorDirective} from '../../../../directives/table-query-reflector.directive';
import {RbSort, TableElement} from '../../../../models/table.model';
import {ROLES} from "../../../../../shared/enums/roles";
import {LogConfigService} from '../../services/log-config.service';
import {AppLog} from '../../models/log';
import {DetailType} from '../../../../enums/detail-type';
import {LogTableRowComponent} from '../../components/log-table-row/log-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION,
  PAGE_SIZE_OPTIONS
} from "../../../../consts/default-table-values";

@Component({
  selector: 'app-logs-page',
  templateUrl: './logs-page.component.html',
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    LogTableRowComponent,
  ]
})
export class LogsPageComponent implements OnInit, OnDestroy {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = MIN_ENTITIES_FOR_PAGINATION;
  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  private activatedRoute = inject(ActivatedRoute);
  protected configService = inject(LogConfigService);

  entityMetadata = this.configService.getEntityMetadata();
  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities = signal<AppLog[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities = signal<AppLog[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities = signal<AppLog[]>([]);

  page: WritableSignal<PageEvent>;
  sort: WritableSignal<RbSort>;
  filter: WritableSignal<FilterEvent>;

  loading = signal(true);
  extensionClass = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  gridView = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort = signal({sortField: sortField ?? 'id', sortOrder: sortOrder ?? 'desc'});
    this.filter = signal<FilterEvent>(
      this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.extensionClass.set(this.getHighestPriorityClass(this.tableFields));
  }

  ngOnInit() {
    this.applyFilter();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  /**
   * Determines the highest priority extension class from a list of table fields
   * and maps it to its corresponding class string.
   *
   * @param tableFields - Array of table field objects containing an extensionClass property.
   * @returns The CSS class string corresponding to the highest priority extension class.
   */
  private getHighestPriorityClass(tableFields: { extensionClass?: string }[]): string {
    /**
     * Maps extension class strings to their respective numeric representations.
     */
    const extensionClassMapper: Record<string, number> = {
      'hidden': 0,
      'block xs:hidden': 1,
      'block sm:hidden': 2,
      'block md:hidden': 3,
      'block lg:hidden': 4,
      'block xl:hidden': 5,
      'block 2xl:hidden': 6,
      'block 3xl:hidden': 7,
      'block': 8,
    };

    /**
     * Maps numeric extension class representations back to their corresponding class strings.
     */
    const numericToClassMapper: Record<number, string> = {
      0: 'hidden',
      1: 'block xs:hidden',
      2: 'block sm:hidden',
      3: 'block md:hidden',
      4: 'block lg:hidden',
      5: 'block xl:hidden',
      6: 'block 2xl:hidden',
      7: 'block 3xl:hidden',
      8: 'block',
    };

    let highestPriority = 0;

    tableFields.forEach(field => {
      if (field.extensionClass && extensionClassMapper[field.extensionClass] !== undefined) {
        highestPriority = Math.max(highestPriority, extensionClassMapper[field.extensionClass]);
      }
    });

    return numericToClassMapper[highestPriority];
  }


  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort.set(event.sort);
    this.page.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  switchFilter(event: FilterEvent){
    this.loading.set(true);
    this.filter.set(event);
    this.page.set({...this.page(), pageIndex: 0});
    this.applyFilter();
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;
    const currentSort = this.sort();
    this.sort.set({
      sortField: event.name,
      sortOrder: currentSort?.sortOrder === 'asc' ? 'desc' : 'asc'
    });
    this.applySortAndPagination();
  }

  switchPage(page: PageEvent) {
    this.page.set(page);
    this.applySortAndPagination();
  }

  private applySortAndPagination() {
    const sortedEntities = this.applySorting();
    const pagedEntities = this.applyPagination(sortedEntities);
    this.visibleEntities.set(pagedEntities);
    this.loading.set(false);
  }

  private applySorting(): AppLog[] {
    const {sortField, sortOrder} = this.sort();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppLog[]): AppLog[] {
    const { pageSize, pageIndex } = this.page();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppLog[] {
    let filteredEntities = [...this.entities()];

    Object.entries(this.filter()).forEach(([key, value]) => {
      if (!value) return;
      filteredEntities = filteredEntities.filter((entity) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }
}
