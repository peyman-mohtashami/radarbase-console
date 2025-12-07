import {Component, effect, inject, signal, untracked, WritableSignal} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
// import {DetailType} from '../../enums/detail-type';
import {ActivatedRoute, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FilterItem, RbSort, TableElement} from '../../models/table.model';
import {FilterEvent} from '../data-table-filter/data-table-filter.component';
// import {SelectionModel} from '@angular/cdk/collections';
import {Subject} from 'rxjs';
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION,
  PAGE_SIZE_OPTIONS
} from '../../consts/default-table-values';
import {takeUntil} from 'rxjs/operators';
import {ROLES} from '../../../shared/enums/roles';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-base-entities-page',
  template: '',
})
export class BaseEntitiesPageComponent<T extends {_name: string;}> {
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly ROLES = ROLES;
  protected readonly GRID_VIEW_ENABLED = true;

  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  protected entityService: any;// = inject(ClientService);
  protected configService: any;// = inject(ClientConfigService);
  dialogService: any;// = inject(ClientDialogService);

  // entityMetadata = this.configService.getEntityMetadata();
  //tableFields = this.configService.getTableFields();
  // tableFilters = this.configService.getTableFilters();
  // configFields = this.configService.getFormFields();

  entities = signal<T[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities = signal<T[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities = signal<T[]>([]);

  page: WritableSignal<PageEvent>;
  sort: WritableSignal<RbSort>;
  filter: WritableSignal<FilterEvent | undefined> = signal<FilterEvent | undefined>(undefined);

  loading = signal(true);
  extensionClass = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  gridView = true;

  protected _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    // const tableFields = this.configService.getTableFields();
    // const tableFilters: FilterItem[] = this.configService.getTableFilters();
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort = signal({sortField: sortField ?? 'clientId', sortOrder: sortOrder ?? 'asc'});
    // this.filter = signal<FilterEvent>(
    //   tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
    //     map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
    //     return map;
    //   }, {})
    // );

    this.initializeDialogEffect();

    // this.extensionClass.set(this.getHighestPriorityClass(tableFields));
  }

  init() {
    const tableFields = this.configService.getTableFields();
    const tableFilters: FilterItem[] = this.configService.getTableFilters();
    this.filter = signal<FilterEvent>(
      tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.extensionClass.set(this.getHighestPriorityClass(tableFields));

    this.dialogService.dialogUpdateEvent.set(undefined);
    this.applyFilter();
    this.handleDialogUrlFragment();
  }

  destroy() {
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


  protected initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: T }) {
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
    this.loading.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity?: T) {
    if (entity) {
      const entities = untracked(this.entities);
      this.entities.set([entity, ...entities]);
      this.applyFilter();
    }
  }

  private updateEntityInView(entity?: T) {
    if (entity) {
      const updatedEntities = untracked(this.entities).map(e => e._name === entity._name ? entity : e);
      this.entities.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll().subscribe({
      next: (entities: T[]) => {
        this.entities.set(entities);
        this.applyFilter();
      }
    });
  }

  protected handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const entityMetadata = this.configService.getEntityMetadata()
    const [_, action, entityType, entityId] = fragment.split('/');
    if (entityType === entityMetadata.name) {
      const entity = this.visibleEntities().find(e => e._name == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities());
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities());
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities());
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

  private applySorting(): T[] {
    const {sortField, sortOrder} = this.sort();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities().sort((a: Record<string, any>, b: Record<string, any>) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: T[]): T[] {
    const { pageSize, pageIndex } = this.page();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): T[] {
    let filteredEntities = [...this.entities()];

    Object.entries(this.filter()!).forEach(([key, value]) => {
      if (!value) return;
      filteredEntities = filteredEntities.filter((entity: Record<string, any>) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }

  // /** Selection Helper Methods */
  // isAllSelected() {
  //   return this.selection.selected.length === this.visibleEntities().length;
  // }
  //
  // masterToggle() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //   } else {
  //     this.selection.select(...this.visibleEntities());
  //   }
  // }
  //
  // checkboxLabel(row?: any): string {
  //   return row
  //     ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
  //     : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  // }
}
