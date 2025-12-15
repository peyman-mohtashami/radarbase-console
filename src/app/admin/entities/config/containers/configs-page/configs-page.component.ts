import {Component, effect, inject, OnDestroy, OnInit, signal, untracked, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';


import { DialogMode } from '../../../../enums/dialog';
import {
  RbSort,
  TableElement,
} from '../../../../models/table.model';
import { ConfigService } from '../../services/config.service';
import {Subject} from 'rxjs';
import {AppConfig} from "../../models/config";
import {ReactiveFormsModule} from "@angular/forms";
import {LoaderComponent} from "../../../../../shared/components/loader/loader.component";
import {TableQueryReflectorDirective} from "../../../../directives/table-query-reflector.directive";
import {TranslatePipe} from "@ngx-translate/core";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {ConfigTableRowComponent} from "../../components/config-table-row/config-table-row.component";
import {
  DataTableFilterComponent,
  FilterEvent
} from "../../../../components/data-table-filter/data-table-filter.component";
import {SelectionModel} from "@angular/cdk/collections";
import {takeUntil} from "rxjs/operators";
import {EntitiesPageHeaderComponent} from "../../../../components/entities-page-header/entities-page-header.component";
import {MatCheckbox} from "@angular/material/checkbox";
import {ConfigConfigService} from "../../services/config-config.service";
import {ConfigDialogService} from "../../services/config-dialog.service";
import {AppClient} from "../../../client/models/client";
import {AppProject} from '../../../project/models/project';
import {AppSubject} from "../../../subject/models/subject";
import {ROLES} from "../../../../../shared/enums/roles";
import {
  DEFAULT_PAGE_SIZE,
  MIN_ENTITIES_FOR_FILTERS,
  MIN_ENTITIES_FOR_PAGINATION,
  PAGE_SIZE_OPTIONS
} from "../../../../consts/default-table-values";

@Component({
  selector: 'app-configs-page',
  templateUrl: './configs-page.component.html',
  imports: [
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    ReactiveFormsModule,
    MatAnchor,
    ConfigTableRowComponent,
    EntitiesPageHeaderComponent,
    MatCheckbox,
    DataTableFilterComponent,
    MatButton,
  ]
})
export class ConfigsPageComponent implements OnInit, OnDestroy {
  protected readonly ROLES = ROLES;
  protected readonly MIN_ENTITIES_FOR_FILTERS = MIN_ENTITIES_FOR_FILTERS;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = MIN_ENTITIES_FOR_PAGINATION;
  protected readonly PAGE_SIZE_OPTIONS = PAGE_SIZE_OPTIONS;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private entityService = inject(ConfigService);
  protected configService = inject(ConfigConfigService);
  public dialogService = inject(ConfigDialogService);

  entityMetadata = this.configService.getEntityMetadata();
  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  configFields = this.configService.getFormFields();

  entities = signal<AppConfig[]>(this.activatedRoute.snapshot.data['entities']);
  processedEntities = signal<AppConfig[]>(this.activatedRoute.snapshot.data['entities']);
  visibleEntities = signal<AppConfig[]>([]);

  currentClient: AppClient = this.activatedRoute.parent?.parent?.snapshot?.data['entity'];
  currentProject: AppProject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];
  currentSubject: AppSubject | undefined = undefined; //this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot?.data['entity'];

  page: WritableSignal<PageEvent>;
  sort: WritableSignal<RbSort>;
  filter: WritableSignal<FilterEvent>;

  loading = signal(true);
  extensionClass = signal('hidden');
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() {
    const { pageSize, pageIndex, sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    this.page = signal({
      pageIndex: pageIndex ?? 0,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
      length: 0,
    });
    this.sort = signal({sortField: sortField ?? 'name', sortOrder: sortOrder ?? 'asc'});
    this.filter = signal<FilterEvent>(
      this.tableFilters.reduce((map: { [key: string]: string | undefined }, filterItem) => {
        map[filterItem.name] = this.activatedRoute.snapshot.queryParams[filterItem.name];
        return map;
      }, {})
    );

    this.initializeDialogEffect();

    this.extensionClass.set(this.getHighestPriorityClass(this.tableFields));
  }

  ngOnInit() {
    this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    if (this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.routeConfig?.path === 'subjects') {
      this.currentSubject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
      this.currentProject = this.activatedRoute.parent?.parent?.parent?.parent?.parent?.parent?.parent?.snapshot.data['entity'];
    }

    this.activatedRoute.data.subscribe(data => {
      this.entities.set(data['entities']);
      this.processedEntities.set(data['entities']);
      this.dialogService.dialogUpdateEvent$.set(undefined);
      this.applyFilter();
    })
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

  private handleDialogUpdate(updated: { mode: DialogMode | string, entity?: AppConfig }) {
    const {mode, entity} = updated;
    if (entity) {
      switch (mode) {
        case DialogMode.ADD:
          this.isChanged = true;
          this.addEntityToView(entity);
          break;
        case DialogMode.EDIT:
          this.isChanged = true;
          this.updateEntityInView(entity);
          break;
        case DialogMode.DELETE:
          this.isChanged = true;
          this.removeEntityFromView(entity);
          break;
      }
    } else {
      switch(mode) {
        case "discarded":
          this.isChanged = false;
          this.refreshEntities();
          break;
        case "published":
          this.isChanged = false;
          this.refreshEntities();
          break;
      }
    }
    this.removeFragmentUrl();
    this.loading.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity: AppConfig) {
      const entities = untracked(this.entities);
      this.entities.set([entity, ...entities]);
      this.applyFilter();
  }

  private updateEntityInView(entity: AppConfig) {
      const updatedEntities = untracked(this.entities).map(e => e.id === entity.id ? entity : e);
      this.entities.set(updatedEntities);
      this.applyFilter();
  }

  private removeEntityFromView(entity?: AppConfig) {
    if (entity) {
      const entities = untracked(this.entities);
      const updatedEntities = entities.filter(e => e.id !== entity.id);
      this.entities.set(updatedEntities);
      this.applyFilter();
    }
  }

  private refreshEntities() {
    this.entityService.getAll(this.currentClient.clientId, this.currentProject?.projectName).subscribe({
      next: (entities) => {
        this.entities.set(entities);
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
    if (entityType === this.entityMetadata.name) {
      const entity = this.visibleEntities().find(e => e.id == entityId);
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

  onPublishDialogAction(mode: "discard" | "publish") {
    return this.dialogService.openPublishDialog(mode, this.entities(), this.currentClient?.clientId, this.currentProject?.projectName, this.currentSubject?.login);
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

  private applySorting(): AppConfig[] {
    const {sortField, sortOrder} = this.sort();
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    return this.processedEntities().sort((a, b) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  private applyPagination(entities: AppConfig[]): AppConfig[] {
    const { pageSize, pageIndex } = this.page();
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  applyFilter() {
    const filteredEntities = this.getFilteredEntities();
    this.processedEntities.set(filteredEntities);
    this.applySortAndPagination();
  }

  private getFilteredEntities(): AppConfig[] {
    let filteredEntities = [...this.entities()];

    Object.entries(this.filter()).forEach(([key, value]) => {
      if (!value) return;

      filteredEntities = filteredEntities.filter((entity) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
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

  isChanged = false;


  triggerUpdate($event: string) {
    console.log('Class: ConfigsPageComponent, Function: triggerUpdate, Line 534 $event' , $event);
    if ($event === 'discard') {
      this.dialogService.dialogUpdateEvent$.set({mode: 'discard', entity: undefined})
    }

  }

  protected showHistory() {

  }
}
