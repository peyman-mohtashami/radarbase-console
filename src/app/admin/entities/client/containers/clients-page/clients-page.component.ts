import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
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
import {DialogMode} from '../../../../enums/dialog';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {ClientService} from '../../services/client.service';
import {ClientConfigService} from '../../services/client-config.service';
import {ClientDialogService} from '../../services/client-dialog.service';
import {AppClient} from '../../models/client';
import {ClientTableRowComponent} from '../../components/client-table-row/client-table-row.component';
import {
  OrganizationTableRowComponent
} from '../../../organization/components/organization-table-row/organization-table-row.component';

@Component({
  selector: 'rb-clients-page',
  templateUrl: './clients-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    ClientTableRowComponent,
  ]
})
export class ClientsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(ClientService);
  private configService = inject(ClientConfigService);
  public dialogService = inject(ClientDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities$ = signal<AppClient[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities$ = signal<AppClient[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities$ = signal<AppClient[]>([]);
  sourceTypes: AppClient[] = this.activatedRoute.snapshot.data['sourceTypes'];

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

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppClient }) {
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

  private addEntityToView(entity?: AppClient) {
    if (entity) {
      const entities = untracked(this.entities$);
      this.entities$.set([entity, ...entities]);
      this.applyFilter();
    }
  }

  private updateEntityInView(entity?: AppClient) {
    if (entity) {
      const updatedEntities = untracked(this.entities$).map(e => e.clientId === entity.clientId ? entity : e);
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
    console.log('Class: ClientsPageComponent, Function: handleDialogUrlFragment, Line 208 ' , );
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        console.log('Class: ClientsPageComponent, Function: , Line 212 fragment' , fragment);
        if (fragment) this.processUrlFragment(fragment);
      });
  }

  private processUrlFragment(fragment: string) {
    const [_, action, entityType, entityId] = fragment.split('/');
    if (entityType === 'client') {
      const entity = this.visibleEntities$().find(e => e.clientId == entityId);
      console.log('Class: ClientsPageComponent, Function: processUrlFragment, Line 219 entity' , entity);
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

  private applySorting(): AppClient[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppClient[]): AppClient[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppClient[] {
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
