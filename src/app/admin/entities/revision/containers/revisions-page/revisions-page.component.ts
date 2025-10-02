import {Component, OnDestroy, OnInit, signal, effect, computed, inject} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import { TABLE_ANIMATION } from '../../../../animation';
import {
  EntitiesPageHeaderComponent
} from '../../../../components/common-entities-page/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/common-entities-page/data-table-filter/data-table-filter.component';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {RbSort, TableQueryReflectorDirective} from '../../../../directives/table-query-reflector.directive';
import {TableElement} from '../../../../models/table.model';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {RevisionService} from '../../services/revision.service';
import {RevisionConfigService} from '../../services/revision-config.service';
import {AppRevision} from '../../models/revision';
import {RevisionTableRowComponent} from '../../components/revision-table-row/revision-table-row.component';
import {TagComponent} from '../../../../components/tag/tag.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'rb-entities-page',
  templateUrl: './revisions-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    RevisionTableRowComponent,
    TagComponent,
    JsonPipe,
  ]
})
export class RevisionsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  private activatedRoute = inject(ActivatedRoute);
  public entityService = inject(RevisionService);
  private configService = inject(RevisionConfigService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  visibleEntities$ = signal<AppRevision[]>(this.activatedRoute.snapshot.data['entities']);

  page$ = signal<PageEvent>({
    pageIndex: this.activatedRoute.snapshot.queryParams['pageIndex'] ?? 0,
    pageSize: this.activatedRoute.snapshot.queryParams['pageSize'] ?? this.DEFAULT_PAGE_SIZE,
    length: 0,
  });
  sort$ = signal<RbSort>({
    sortField: this.activatedRoute.snapshot.queryParams['sortField'] ?? 'id',
    sortOrder: this.activatedRoute.snapshot.queryParams['sortOrder'] ?? 'desc',
  });
  filter$ = signal<FilterEvent>(
    this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
      map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
      return map;
    }, {})
  )

  previousParamsState$ = signal<{
    page: PageEvent;
    sort: RbSort;
    filter: FilterEvent;
  }>({
    page: this.page$(),
    sort: this.sort$(),
    filter: this.filter$(),
  });

  paramsChanged$ = computed(() => {
    const currentPage = this.page$();
    const currentSort = this.sort$();
    const currentFilter = this.filter$();
    const previousState = this.previousParamsState$();

    return (
      currentPage.pageIndex !== previousState.page.pageIndex ||
      currentPage.pageSize !== previousState.page.pageSize ||
      currentSort.sortField !== previousState.sort.sortField ||
      currentSort.sortOrder !== previousState.sort.sortOrder ||
      JSON.stringify(currentFilter) !== JSON.stringify(previousState.filter)
    );
  });

  loading$ = signal(false);
  extensionClass$ = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    effect(() => {
      if (this.paramsChanged$()) {
        this.previousParamsState$.set({
          page: this.page$(),
          sort: this.sort$(),
          filter: this.filter$(),
        });

        this.loadEntities(this.page$(), this.sort$(), this.filter$()).subscribe({
          next: value => {
            this.selection.clear();
            this.loading$.set(false);
            this.visibleEntities$.set(value);
          }
        })
      }
    });

    this.extensionClass$.set(this.getHighestPriorityClass(this.tableFields));
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

  ngOnInit() {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private loadEntities(
    page: PageEvent,
    sort: RbSort,
    filter: FilterEvent
  ): Observable<any[]> {
    const params: Params = {
      pageIndex: page.pageIndex,
      pageSize: page.pageSize,
    };
    if (sort.sortField !== '' && sort.sortOrder !== '') {
      params['sortField'] = sort.sortField;
      params['sortOrder'] = sort.sortOrder;
    }
    if (filter) {
      Object.keys(filter).forEach((key) => {
        if (filter[key]) {
          params[key] = filter[key];
        }
      });
    }
    return this.entityService.getWithQuery(params);
  }


  handleFilterChange(event: FilterEvent){
    this.filter$.set(event);
  }

  switchPage(page: PageEvent) {
    this.page$.set(page);
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;

    const sort: RbSort = {sortField: event.name, sortOrder: this.sort$()?.sortOrder === 'asc' ? 'desc' : 'asc'};
    this.sort$.set(sort);
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort$.set(event.sort);
    this.page$.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }
}
