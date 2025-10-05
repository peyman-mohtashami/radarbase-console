import {Component, OnDestroy, OnInit, signal, effect, untracked, inject, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {MatCheckbox} from "@angular/material/checkbox";
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
import {DialogMode} from '../../../../enums/dialog';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {PermissionConfigService} from '../../services/permission-config.service';
import {PermissionDialogService} from '../../services/permission-dialog.service';
import {AppUser} from '../../models/user';
import {AppProject} from '../../../project/models/project';
import {AppOrganization} from '../../../organization/models/organization';
import {PermissionTableRowComponent} from '../../components/permission-table-row/permission-table-row.component';

@Component({
  selector: 'rb-permissions-page',
  templateUrl: './permissions-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    MatCheckbox,
    PermissionTableRowComponent,
  ]
})
export class PermissionsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  public router = inject(Router);
  public activatedRoute = inject(ActivatedRoute);
  private configService = inject(PermissionConfigService);
  public dialogService = inject(PermissionDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities$ = signal<AppUser[]>(this.activatedRoute.snapshot.data['entities']);
  usersWithPermission$ = signal<AppUser[]>([]);
  processedEntities$ = signal<AppUser[]>([]);
  visibleEntities$ = signal<AppUser[]>([]);

  currentOrganization?: AppOrganization = this.activatedRoute.snapshot.parent?.parent?.data['organization'] ?? this.activatedRoute.snapshot.parent?.parent?.parent?.parent?.data['organization'];
  currentProject?: AppProject = this.activatedRoute.snapshot.parent?.parent?.data['entity']

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

    const usersWithPermission = this.getUsersWithPermission(this.entities$());
    this.usersWithPermission$.set(usersWithPermission);
    this.processedEntities$.set(usersWithPermission);

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

  private getUsersWithPermission(entities: AppUser[]): AppUser[] {
    return entities.filter(e => {
      if (e._roles?._sysAdmin) {
        return true;
      }
      if (this.currentOrganization) {
        if (e._roles?._organizationAdmin) {
          const organization = e._roles._organizations?.find(o => o.name === this.currentOrganization?.name)
          if (organization) {
            return true;
          }
        }
      }
      if (this.currentProject) {
        if (e._roles?._projectAdmin) {
          const project = e._roles._projects?.find(p => p.name === this.currentProject?.projectName)
          if (project) {
            return true;
          }
        }
      }
      return false;
    });
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


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: DialogMode, entity?: AppUser }) {
    switch (updated.mode) {
      case DialogMode.ADD:
      case DialogMode.DELETE:
        this.updateEntityInView(updated.entity);
        break;
    }
    this.removeFragmentUrl();
    this.loading$.set(false);
    this.selection.clear();
  }

  private updateEntityInView(entity?: AppUser) {
    if (entity) {
      const updatedEntities = untracked(this.entities$).map(e => e.id === entity.id ? entity : e);
      this.entities$.set(updatedEntities);
      const usersWithPermission = this.getUsersWithPermission(updatedEntities);
      this.usersWithPermission$.set(usersWithPermission);
      this.applyFilter();
    }
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
    if (entityType === 'permission') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      switch (action) {
        case 'add':
          this.dialogService.openDialog(DialogMode.ADD, undefined, this.entities$(), this.currentProject, this.currentOrganization);
          break;
        case 'edit':
          if (entity) this.dialogService.openDialog(DialogMode.EDIT, entity, this.entities$(), this.currentProject, this.currentOrganization);
          break;
        case 'delete':
          if (entity) this.dialogService.openDialog(DialogMode.DELETE, entity, this.entities$(), this.currentProject, this.currentOrganization);
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

  private applySorting(): AppUser[] {
    const {sortField, sortOrder} = this.sort$();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities$().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppUser[]): AppUser[] {
    const { pageSize, pageIndex } = this.page$();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities$.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppUser[] {
    let filteredEntities = [...this.usersWithPermission$()];

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
