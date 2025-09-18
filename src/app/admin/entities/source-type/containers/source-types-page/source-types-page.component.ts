import {Component, effect, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {TABLE_ANIMATION} from '../../../../animation';
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
import {instanceConfig} from '../../../../../core/config/store/config.selectors';
import {DialogMode} from '../../../../enums/dialog';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {filters, TableElements} from '../../config';
import {AppSourceType} from '../../models/source-type';
import {SourceTypeTableRowComponent} from '../../components/source-type-table-row/source-type-table-row.component';
import {SourceTypeService} from '../../services/sourceType.service';
import {SourceTypeDialogService} from '../../services/source-type-dialog.service';

@Component({
  selector: 'rb-source-types-page',
  templateUrl: './source-types-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    SourceTypeTableRowComponent,
    AsyncPipe,
    MatCheckbox,
    JsonPipe,
  ]
})
export class SourceTypesPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;
  // protected readonly GRID_VIEW_ENABLED = false;
  protected readonly TABLE_FILTERS = filters;
  protected readonly TABLE_ELEMENTS = TableElements;

  entities$ = signal<AppSourceType[]>([]);
  processedEntities$ = signal<AppSourceType[]>([])
  visibleEntities$ = signal<AppSourceType[]>([]);
  sourceTypes: AppSourceType[];

  page$: WritableSignal<PageEvent>;
  sort$: WritableSignal<RbSort>;
  filter$: WritableSignal<FilterEvent>;

  loading$ = signal(true);
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  // gridView;

  config$;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private entityService: SourceTypeService,
    public dialogService: SourceTypeDialogService,
    private store: Store,
  ) {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page$ = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? this.DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort$ = signal({sortField: sortField ?? 'id', sortOrder: sortOrder ?? 'desc'});
    this.filter$ = signal<FilterEvent>(
      this.TABLE_FILTERS.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.entities$.set(this.activatedRoute.snapshot.data['entities']);
    this.processedEntities$.set(this.activatedRoute.snapshot.data['entities']);

    this.sourceTypes = this.activatedRoute.snapshot.data['sourceTypes'];
    // this.gridView = this.GRID_VIEW_ENABLED;
    this.config$ = this.store.select(instanceConfig)

    this.initializeDialogEffect();
  }

  ngOnInit() {
    this.handleDialogUrlFragment();
    this.applyFilter();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) this.handleDialogUpdate(updated);
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppSourceType }) {
    switch (updated.mode) {
      case DialogMode.ADD:
        this.addEntityToView(updated?.entity);
        break;
      case DialogMode.EDIT:
        this.updateEntityInView(updated?.entity);
        break;
      case DialogMode.DELETE:
        this.refreshEntities();
        break;
    }
    this.removeFragmentUrl();
    this.loading$.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity?: AppSourceType) {
    if (entity) {
      const visibleEntities = untracked(this.visibleEntities$);
      this.visibleEntities$.set([entity, ...visibleEntities]);
    }
  }

  private updateEntityInView(entity?: AppSourceType) {
    if (entity) {
      const updatedEntities = untracked(this.visibleEntities$).map(e => e.id === entity.id ? entity : e);
      this.visibleEntities$.set(updatedEntities);
    }
  }

  private refreshEntities() {
    this.entityService.getAll().subscribe({
      next: (entities) => this.visibleEntities$.set(entities)
    });
  }

  private handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType, entityId] = fragment.split('/');
    if (entityType === 'sourceType') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined);
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity);
          break;
      }
    }
  }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort$.set(event.sort);
    this.page$.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  switchFilter(event: FilterEvent){
    this.loading$.set(true);
    this.filter$.set(event);
    this.page$.set({...this.page$(), pageIndex: 0});
    this.applyFilter();
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;
    const currentSort = this.sort$();
    this.sort$.set({
      sortField: event.name,
      sortOrder: currentSort?.sortOrder === 'asc' ? 'desc' : 'asc'
    });
    this.applySortAndPagination();
  }

  switchPage(page: PageEvent) {
    this.page$.set(page);
    this.applySortAndPagination();
  }

  private applySortAndPagination() {
    const sortedEntities = this.applySorting();
    const pagedEntities = this.applyPagination(sortedEntities);
    this.visibleEntities$.set(pagedEntities);
    this.loading$.set(false);
  }

  private applySorting(): AppSourceType[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppSourceType[]): AppSourceType[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppSourceType[] {
    let filteredEntities = [...this.entities$()];

    Object.entries(this.filter$()).forEach(([key, value]) => {
      if (!value) return;

      // Handle "search:" prefixed keys
      if (key.startsWith('search')) {
        const filters = key
          .replace(/search\s*:\s*/i, "")
          .split(",")
          .map((filter) => filter.trim())
          .filter(Boolean);

        filteredEntities = filteredEntities.filter((entity) =>
          filters.some(
            (filter) =>
              entity[filter]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
          )
        );
      } else {
        // General key-based filtering
        filteredEntities = filteredEntities.filter((entity) =>
          entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
        );
      }
    });

    return filteredEntities;
  }

  /** Selection Helper Methods */
  isAllSelected() {
    return this.selection.selected.length === this.visibleEntities$().length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.visibleEntities$());
    }
  }

  checkboxLabel(row?: any): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }
}
