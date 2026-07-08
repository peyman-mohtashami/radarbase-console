import {Component, computed, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {DialogMode} from '../../enums/dialog';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FilterItem, RbSort, TableElement} from '../../models/table.model';
import {FilterEvent} from './data-table-filter/data-table-filter.component';
import {Subject} from 'rxjs';
import {
  DEFAULT_PAGE_SIZE, MIN_ENTITIES_FOR_FILTERS,
} from '../../consts/default-table-values';
import {skip, takeUntil} from 'rxjs/operators';
import {ROLES} from '../../../../shared/enums/roles';
import {SelectionModel} from '@angular/cdk/collections';
import {toObservable} from '@angular/core/rxjs-interop';
import {BaseEntityService} from '../../services/base-entity.service';
import {BaseConfigService} from '../../services/base-config.service';
import {BaseDialogService} from '../../services/base-dialog.service';
import {BaseEntityDialogComponent} from '../entity-dialog/base-entity-dialog.component';

@Component({
  selector: 'app-base-entity-list-page',
  template: '',
})
export class BaseEntityListPageComponent<T extends { _name: string; }, U> implements OnInit, OnDestroy {
  protected readonly DialogMode = DialogMode;
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;

  private router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);

  protected entityService!: BaseEntityService<T, U>;
  protected configService!: BaseConfigService;
  protected dialogService!: BaseDialogService<T, U, BaseEntityDialogComponent<T>>;

  protected GRID_VIEW_ENABLED = false;
  gridView = false;

  entities = signal<T[]>([]);

  page = signal<PageEvent | undefined>(undefined);
  sort = signal<RbSort | undefined>(undefined);
  filter = signal<FilterEvent | undefined>(undefined);

  params = computed(() => {
    const params: Params = {
      pageIndex: this.page()?.pageIndex,
      pageSize: this.page()?.pageSize,
      sortField: this.sort()?.sortField,
      sortOrder: this.sort()?.sortOrder,
      ...this.filter(),
    };
    return params;
  });

  loading = signal(false);
  extensionClass = signal('hidden');

  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<T>(true, []);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    toObservable(this.params)
      .pipe(
        skip(1),
        takeUntil(this._destroy$)
      )
      .subscribe(() => {
        this.loading.set(true);
        this.refreshEntities();
      });

    this.initializeDialogEffect();
  }

  ngOnInit() {
    this.gridView = this.configService.getViewMode() === 'grid';
    const tableFields = this.configService.getTableFields();
    const tableFilters: FilterItem[] = this.configService.getTableFilters();
    this.page = signal<PageEvent>({
      pageIndex: this.activatedRoute.snapshot.queryParams['pageIndex'] ?? 0,
      pageSize: this.activatedRoute.snapshot.queryParams['pageSize'] ?? this.configService.getStoredPageSize() ?? DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort = signal<RbSort>({
      sortField: this.activatedRoute.snapshot.queryParams['sortField'] ?? 'id',
      sortOrder: this.activatedRoute.snapshot.queryParams['sortOrder'] ?? 'desc',
    });
    this.filter = signal<FilterEvent>(
      tableFilters.reduce((map: Record<string, string | undefined>, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );
    this.extensionClass.set(this.getHighestPriorityClass(tableFields));
    // this.handleDialogUrlFragment();
  }

  ngOnDestroy() {
    this.dialogService?.dialogUpdateEvent.set(undefined);
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


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService?.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleDialogUpdate(updated: { mode: DialogMode | string, entity?: T }) {
    this.refreshEntities();
    // this.removeFragmentUrl();
    this.loading.set(false);
    setTimeout(() => {
      this.selection.clear();
    }, 0);
  }

  protected addEntityToView(entity?: T) {
    if (entity) {
      const entities = untracked(this.entities);
      this.entities.set([entity, ...entities]);
    }
  }

  protected refreshEntities() {
    this.getEntities().subscribe({
      next: (value: T[]) => {
        setTimeout(() => {
          this.selection.clear();
        }, 0);
        this.loading.set(false);
        this.entities.set(value);
      }
    });
  }

  protected getEntities() {
    return this.entityService.getWithQuery(this.params())
  }


  // removeFragmentUrl() {
  //   this.router.navigate([], {
  //     relativeTo: this.activatedRoute,
  //     queryParamsHandling: 'preserve',
  //     fragment: undefined
  //   }).then();
  // }

  // private handleDialogUrlFragment() {
  //   this.activatedRoute.fragment
  //     .pipe(takeUntil(this._destroy$))
  //     .subscribe(fragment => {
  //       if (fragment) this.dialogService.processUrlFragment(fragment);
  //     });
  // }

  handleFilterChange(event: FilterEvent) {
    this.filter.set(event);
  }

  switchPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;

    const sort: RbSort = {sortField: event.name, sortOrder: this.sort()?.sortOrder === 'asc' ? 'desc' : 'asc'};
    this.sort.set(sort);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  toggleViewMode() {
    this.gridView = !this.gridView;
    this.configService.setViewMode(this.gridView ? 'grid' : 'list');
  }

  protected openDialog(dialogMode: DialogMode) {
    this.dialogService.openDialog(dialogMode);
  }
}
