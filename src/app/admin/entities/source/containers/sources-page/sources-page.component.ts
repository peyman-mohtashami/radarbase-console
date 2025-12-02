import {Component, computed, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {TableQueryReflectorDirective} from '../../../../directives/table-query-reflector.directive';
import {RbSort, TableElement} from '../../../../models/table.model';
import {DialogMode} from '../../../../enums/dialog';
import {ROLES} from "../../../../../shared/enums/roles";
import {SourceService} from '../../services/source.service';
import {SourceConfigService} from '../../services/source-config.service';
import {SourceDialogService} from '../../services/source-dialog.service';
import {AppSource} from '../../models/source';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslatePipe} from '@ngx-translate/core';
import {SourceTableRowComponent} from '../../components/source-table-row/source-table-row.component';
import {AppSourceType} from '../../../source-type/models/source-type';
import {AppProject} from '../../../project/models/project';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION,
  PAGE_SIZE_OPTIONS
} from "../../../../consts/default-table-values";

@Component({
  selector: 'app-sources-page',
  templateUrl: './sources-page.component.html',
  imports: [
    DataTableFilterComponent,
    EntitiesPageHeaderComponent,
    LoaderComponent,
    MatCheckbox,
    MatPaginator,
    TableQueryReflectorDirective,
    TranslatePipe,
    SourceTableRowComponent,
  ]
})
export class SourcesPageComponent implements OnInit, OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = MIN_ENTITIES_FOR_PAGINATION;
  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public entityService = inject(SourceService);
  protected configService = inject(SourceConfigService);
  public dialogService = inject(SourceDialogService);

  entityMetadata = this.configService.getEntityMetadata();
  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  visibleEntities = signal<AppSource[]>(this.activatedRoute.snapshot.data['entities']);

  sourceTypes: AppSourceType[] = [];

  project: AppProject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];

  page = signal<PageEvent>({
    pageIndex: this.activatedRoute.snapshot.queryParams['pageIndex'] ?? 0,
    pageSize: this.activatedRoute.snapshot.queryParams['pageSize'] ?? DEFAULT_PAGE_SIZE,
    length: 0,
  });
  sort = signal<RbSort>({
    sortField: this.activatedRoute.snapshot.queryParams['sortField'] ?? 'id',
    sortOrder: this.activatedRoute.snapshot.queryParams['sortOrder'] ?? 'desc',
  });
  filter = signal<FilterEvent>(
    this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
      map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
      return map;
    }, {})
  )

  previousParamsState = signal<{
    page: PageEvent;
    sort: RbSort;
    filter: FilterEvent;
  }>({
    page: this.page(),
    sort: this.sort(),
    filter: this.filter(),
  });

  paramsChanged = computed(() => {
    const currentPage = this.page();
    const currentSort = this.sort();
    const currentFilter = this.filter();
    const previousState = this.previousParamsState();

    return (
      currentPage.pageIndex !== previousState.page.pageIndex ||
      currentPage.pageSize !== previousState.page.pageSize ||
      currentSort.sortField !== previousState.sort.sortField ||
      currentSort.sortOrder !== previousState.sort.sortOrder ||
      JSON.stringify(currentFilter) !== JSON.stringify(previousState.filter)
    );
  });

  loading = signal(false);
  extensionClass = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);

  _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    effect(() => {
      if (this.paramsChanged()) {
        this.previousParamsState.set({
          page: this.page(),
          sort: this.sort(),
          filter: this.filter(),
        });

        this.loadEntities(this.page(), this.sort(), this.filter()).subscribe({
          next: value => {
            this.selection.clear();
            this.loading.set(false);
            this.visibleEntities.set(value);
          }
        })
      }
    });
    this.initializeDialogEffect();

    this.extensionClass.set(this.getHighestPriorityClass(this.tableFields));
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
      const updated = this.dialogService.dialogUpdateEvent();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppSource }) {
    switch (updated.mode) {
      case DialogMode.ADD:
        this.addEntityToView(updated.entity);
        break;
      case DialogMode.EDIT:
        this.updateEntityInView(updated.entity);
        break;
      case DialogMode.DELETE:
        this.refreshEntities();
        break;
    }
    this.removeFragmentUrl();
    this.loading.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity?: AppSource) {
    if (entity) {
      const visibleEntities = untracked(this.visibleEntities);
      this.visibleEntities.set([entity, ...visibleEntities]);
    }
  }

  private updateEntityInView(entity?: AppSource) {
    if (entity) {
      const updatedEntities = untracked(this.visibleEntities).map(e => e.id === entity.id ? entity : e);
      this.visibleEntities.set(updatedEntities);
    }
  }

  private refreshEntities() {
    this.loadEntities(this.page(), this.sort(), this.filter()).subscribe({
      next: value => {
        this.selection.clear();
        this.loading.set(false);
        this.visibleEntities.set(value);
      }
    });
  }

  removeFragmentUrl() {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
      fragment: undefined
    }).then();
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
    if (entityType === this.entityMetadata.name) {
      const entity = this.visibleEntities().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.project!, this.sourceTypes);
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.project!, this.sourceTypes);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.project!, this.sourceTypes);
          break;
      }
    }
  }

  ngOnInit() {
    if (!this.project) throw new Error('Project not found');
    this.sourceTypes = this.project.sourceTypes?.map(s => ({
      ...s,
      _name: `${s.producer}/${s.model}/${s.catalogVersion}`,
      _search: `${s.producer}/${s.model}/${s.catalogVersion}`
    })) ?? [];
    this.handleDialogUrlFragment();
  }

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
    return this.entityService.getWithQuery(this.project.projectName, params);
  }


  handleFilterChange(event: FilterEvent){
    this.filter.set(event);
  }

  switchPage(page: PageEvent) {
    this.page.set(page);
  }

  switchSort(event: TableElement) {
    if (!event.sortable) return;

    const sort: RbSort = {sortField: event.name, sortOrder: this.sort()?.sortOrder === 'asc' ? 'desc' : 'asc'};
    this.sort.set(sort);
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort.set(event.sort);
    this.page.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }

  /** Selection Helper Methods */
  isAllSelected() {
    return this.selection.selected.length === this.visibleEntities().length;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.visibleEntities());
    }
  }

  checkboxLabel(row?: any): string {
    return row
      ? `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`
      : `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  }


}
