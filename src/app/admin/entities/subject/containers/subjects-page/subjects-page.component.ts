import {Component, computed, effect, inject, OnDestroy, OnInit, signal, untracked} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
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
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {MatCheckbox} from '@angular/material/checkbox';
import {TranslatePipe} from '@ngx-translate/core';
import {AppSourceType} from '../../../source-type/models/source-type';
import {AppProject} from '../../../project/models/project';
import {SubjectService} from '../../services/subject.service';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectDialogService} from '../../services/subject-dialog.service';
import {AppSubject} from '../../models/subject';
import {SubjectTableRowComponent} from '../../components/subject-table-row/subject-table-row.component';
import {SubjectDialogMode} from '../../enums/dialog';
import {AssignGroupComponent} from '../../components/assign-group/assign-group.component';
import {AppGroup} from '../../../group/models/group';

@Component({
  selector: 'rb-subjects-page',
  templateUrl: './subjects-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    DataTableFilterComponent,
    EntitiesPageHeaderComponent,
    LoaderComponent,
    MatCheckbox,
    MatPaginator,
    TableQueryReflectorDirective,
    TranslatePipe,
    SubjectTableRowComponent,
    AssignGroupComponent,
  ]
})
export class SubjectsPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public entityService = inject(SubjectService);
  private configService = inject(SubjectConfigService);
  public dialogService = inject(SubjectDialogService);

  tableFields = this.configService.getTableFields();
  tableFilters = this.configService.getTableFilters();
  fields = this.configService.getFormFields();

  visibleEntities$ = signal<AppSubject[]>(this.activatedRoute.snapshot.data['entities']);

  sourceTypes: AppSourceType[] = [];

  project: AppProject = this.activatedRoute.parent?.parent?.snapshot.data['entity'];
  groups: AppGroup[] = this.activatedRoute.snapshot.data['groups'];

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

  actionMapper: Record<string, SubjectDialogMode> = {
    'add': SubjectDialogMode.ADD,
    'edit': SubjectDialogMode.EDIT,
    'delete': SubjectDialogMode.DELETE,
    'discontinue': SubjectDialogMode.DISCONTINUE,
    'pair_app': SubjectDialogMode.PAIR_APP,
    'pair_source': SubjectDialogMode.PAIR_SOURCE,
  }

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
    this.initializeDialogEffect();

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


  initializeDialogEffect() {
    effect(() => {
      const updated = this.dialogService.dialogUpdateEvent$();
      if (updated) untracked(() => this.handleDialogUpdate(updated));
    });
  }

  private handleDialogUpdate(updated: { mode: SubjectDialogMode, entity?: AppSubject }) {
    switch (updated.mode) {
      case SubjectDialogMode.ADD:
        this.addEntityToView(updated.entity);
        break;
      case SubjectDialogMode.EDIT:
        this.updateEntityInView(updated.entity);
        break;
      case SubjectDialogMode.DISCONTINUE:
        this.updateEntityInView(updated.entity);
        break;
      case SubjectDialogMode.PAIR_APP:
        this.updateEntityInView(updated.entity);
        break;
      case SubjectDialogMode.PAIR_SOURCE:
        this.updateEntityInView(updated.entity);
        break;
      case SubjectDialogMode.DELETE:
        this.refreshEntities();
        break;
      case SubjectDialogMode.ASSIGN_GROUP:
        this.refreshEntities();
        break;
    }
    this.removeFragmentUrl();
    this.loading$.set(false);
    this.selection.clear();
  }

  private addEntityToView(entity?: AppSubject) {
    if (entity) {
      const visibleEntities = untracked(this.visibleEntities$);
      this.visibleEntities$.set([entity, ...visibleEntities]);
    }
  }

  private updateEntityInView(entity?: AppSubject) {
    if (entity) {
      const updatedEntities = untracked(this.visibleEntities$).map(e => e.id === entity.id ? entity : e);
      this.visibleEntities$.set(updatedEntities);
    }
  }

  private refreshEntities() {
    this.loadEntities(this.page$(), this.sort$(), this.filter$()).subscribe({
      next: value => {
        this.selection.clear();
        this.loading$.set(false);
        this.visibleEntities$.set(value);
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
    if (entityType === 'subject') {
      const entity = this.visibleEntities$().find(e => e.id == entityId);
      const mode = this.actionMapper[action];
      this.dialogService.openDialog(mode, entity, this.project);
    }
  }

  ngOnInit() {
    this.dialogService.dialogUpdateEvent$.set(undefined);
    if (!this.project) throw new Error('Project not found');
    this.sourceTypes = this.project.sourceTypes?.map(s => ({
      ...s,
      _name: `${s.producer}/${s.model}/${s.catalogVersion}`
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


  handleFilterChange(event: FilterEvent) {
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

  handleActiveQueryChange(event: { page: PageEvent, sort: RbSort }) {
    this.sort$.set(event.sort);
    this.page$.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
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


