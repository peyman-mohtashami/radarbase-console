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
import {OrganizationService} from '../../services/organization.service';
import {OrganizationConfigService} from '../../services/organization-config.service';
import {OrganizationDialogService} from '../../services/organization-dialog.service';
import {AppOrganization} from '../../models/organization';
import {OrganizationTableRowComponent} from '../../components/organization-table-row/organization-table-row.component';
import {EntitiesPageHeaderComponent} from '../../../../components/entities-page-header/entities-page-header.component';
import {
  DataTableFilterComponent,
  FilterEvent
} from '../../../../components/data-table-filter/data-table-filter.component';

@Component({
  selector: 'rb-organizations-page',
  templateUrl: './organizations-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    OrganizationTableRowComponent,
  ]
})
export class OrganizationsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;
  protected readonly GRID_VIEW_ENABLED = true;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(OrganizationService);
  private configService = inject(OrganizationConfigService);
  public dialogService = inject(OrganizationDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities$ = signal<AppOrganization[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities$ = signal<AppOrganization[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities$ = signal<AppOrganization[]>([]);
  sourceTypes: AppOrganization[] = this.activatedRoute.snapshot.data['sourceTypes'];

  page$: WritableSignal<PageEvent>;
  sort$: WritableSignal<RbSort>;
  filter$: WritableSignal<FilterEvent>;

  loading$ = signal(true);
  extensionClass$ = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  gridView = true;

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

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppOrganization }) {
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

  private addEntityToView(entity?: AppOrganization) {
    if (entity) {
      const entities = untracked(this.entities$);
      this.entities$.set([entity, ...entities]);
      this.applyFilter();
    }
  }

  private updateEntityInView(entity?: AppOrganization) {
    if (entity) {
      const updatedEntities = untracked(this.entities$).map(e => e.id === entity.id ? entity : e);
      this.entities$.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll().subscribe({
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
    if (entityType === 'organization') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities$());
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities$());
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities$());
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

  private applySorting(): AppOrganization[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppOrganization[]): AppOrganization[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppOrganization[] {
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
