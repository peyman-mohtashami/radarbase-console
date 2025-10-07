import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
import {TABLE_ANIMATION} from '../../../../animation';
import {LoaderComponent} from '../../../../../shared/components/loader/loader.component';
import {RbSort, TableQueryReflectorDirective} from '../../../../directives/table-query-reflector.directive';
import {TableElement} from '../../../../models/table.model';
import {DialogMode} from '../../../../enums/dialog';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {GroupTableRowComponent} from '../../components/group-table-row/group-table-row.component';
import {GroupService} from '../../services/group.service';
import {GroupConfigService} from '../../services/group-config.service';
import {GroupDialogService} from '../../services/group-dialog.service';
import {AppGroup} from '../../models/group';
import {AppProject} from '../../../project/models/project';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';

@Component({
  selector: 'rb-groups-page',
  templateUrl: './groups-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    GroupTableRowComponent,
  ]
})
export class GroupsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(GroupService);
  private configService = inject(GroupConfigService);
  public dialogService = inject(GroupDialogService);

  project: AppProject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  fields = this.configService.getFormFields();

  entities$ = signal<AppGroup[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities$ = signal<AppGroup[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities$ = signal<AppGroup[]>([]);

  page$: WritableSignal<PageEvent>;
  sort$: WritableSignal<RbSort>;
  filter$: WritableSignal<FilterEvent>;

  loading$ = signal(true);
  extensionClass$ = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page$ = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? this.DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort$ = signal({sortField: sortField ?? 'id', sortOrder: sortOrder ?? 'desc'});
    this.filter$ = signal<FilterEvent>(
      this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.initializeDialogEffect();

    this.extensionClass$.set(this.getHighestPriorityClass(this.tableFields));
  }

  ngOnInit() {
    this.dialogService.dialogUpdateEvent$.set(undefined);
    this.applyFilter();
    this.handleDialogUrlFragment();
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


  private initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppGroup }) {
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

  private addEntityToView(entity?: AppGroup) {
    if (entity) {
      const entities = untracked(this.entities$);
      this.entities$.set([entity, ...entities]);
      this.applyFilter();
    }
  }

  private updateEntityInView(entity?: AppGroup) {
    if (entity) {
      const updatedEntities = untracked(this.entities$).map(e => e.id === entity.id ? entity : e);
      this.entities$.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll(this.project.projectName).subscribe({
      next: (entities) => {
        this.entities$.set(entities);
        this.applyFilter();
      }
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
    if (entityType === 'group') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities$(), this.project.projectName);
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities$(), this.project.projectName);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities$(), this.project.projectName);
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

  private applySorting(): AppGroup[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppGroup[]): AppGroup[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppGroup[] {
    let filteredEntities = [...this.entities$()];

    Object.entries(this.filter$()).forEach(([key, value]) => {
      if (!value) return;

      filteredEntities = filteredEntities.filter((entity) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
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
