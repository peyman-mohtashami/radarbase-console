import {Component, OnDestroy, OnInit, signal, WritableSignal, effect, computed, untracked} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {AsyncPipe} from "@angular/common";
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
import { SourceDataTableRowComponent } from '../../components/source-data-table-row/source-data-table-row.component';
import {TableElement} from '../../../../models/table.model';
import {SourceDataService} from '../../services/source-data.service';
import {instanceConfig} from '../../../../../core/config/store/config.selectors';
import {DialogMode} from '../../../../enums/dialog';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceData} from '../../models/source-data';
import {filters, TableElements} from '../../config';
import {AppSourceType} from '../../../source-type/models/source-type';

@Component({
  selector: 'rb-entities-page',
  templateUrl: './source-datas-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    SourceDataTableRowComponent,
    AsyncPipe,
    MatCheckbox,
  ]
})
export class SourceDatasPageComponent implements OnInit, OnDestroy {
  protected readonly DEFAULT_PAGE_SIZE = 20;
  protected readonly PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];
  protected readonly MIN_ENTITIES_FOR_FILTERS = 0;
  protected readonly MIN_ENTITIES_FOR_PAGINATION = 0;
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly ROLES = ROLES;
  // protected readonly GRID_VIEW_ENABLED = false;
  protected readonly TABLE_FILTERS = filters;
  protected readonly TABLE_ELEMENTS = TableElements;

  entitiesToShow$: WritableSignal<AppSourceData[]> = signal<AppSourceData[]>([]);
  sourceTypes: AppSourceType[];

  page$ = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.DEFAULT_PAGE_SIZE,
    length: 0,
  })

  sort$ = signal<RbSort>({
    sortField: 'id',
    sortOrder: 'desc',
  })

  filter$ = signal<FilterEvent>(
    this.TABLE_FILTERS.reduce((map: { [key: string]: string | undefined }, obj) => {
      map[obj.name] = undefined;
      return map;
    }, {})
  );

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
  filterEnabled = false;
  isFilterOpened = true;
  selection = new SelectionModel<any>(true, []);
  // gridView;

  config$;

  _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public entityService: SourceDataService,
    private dialogService: SourceDataDialogService,
    private store: Store,
  ) {
    this.entitiesToShow$.set(this.activatedRoute.snapshot.data['entities']);
    this.sourceTypes = this.activatedRoute.snapshot.data['sourceTypes'];

    // this.gridView = this.GRID_VIEW_ENABLED;

    this.config$ = this.store.select(instanceConfig)

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
            this.entitiesToShow$.set(value);
          }
        })
      }
    });

    effect(() => {
      const updated = this.dialogService.updateTrigger$();
      if (updated) {
        switch (updated.mode) {
          case DialogMode.ADD:
            this.selection.clear();
            this.loading$.set(false);
            if (updated?.entity) {
              const entitiesToShow = untracked(this.entitiesToShow$)
              this.entitiesToShow$.set([updated.entity, ...entitiesToShow ]);
            }
            break;
          case DialogMode.EDIT:
            this.selection.clear();
            this.loading$.set(false);
            if (updated?.entity) {
              const entitiesToShow = untracked(this.entitiesToShow$);
              const updatedEntitiesToShow = entitiesToShow.map(e => {
                if (e.id === updated.entity.id) {
                  return updated.entity;
                }
                return e;
              })
              this.entitiesToShow$.set(updatedEntitiesToShow);
            }
            break;
          case DialogMode.DELETE:
            this.loadEntities(this.page$(), this.sort$(), this.filter$()).subscribe({
              next: value => {
                this.selection.clear();
                this.loading$.set(false);
                this.entitiesToShow$.set(value);
              }
            })
            break;
        }
        this.removeFragmentUrl()
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

  handleDialogUrlFragment() {
    this.activatedRoute.fragment
      .pipe(takeUntil(this._destroy$))
      .subscribe(fragment => {
        if (!fragment) return;

        const fragmentItems = fragment.split('/');

        const actionType = fragmentItems[1];
        const actionEntity = fragmentItems[2];
        const actionId = fragmentItems[3];

        if (actionEntity === 'sourceData') {
          if (actionType === 'add') {
            this.dialogService.openDialog(DialogMode.ADD, undefined, {sourceTypes: this.sourceTypes});
          } else if (actionType === 'edit') {
            const entity = this.entitiesToShow$().find(e => e.id == actionId);
            this.dialogService.openDialog(DialogMode.EDIT, entity, {sourceTypes: this.sourceTypes});
          } else if (actionType === 'delete') {
            const entity = this.entitiesToShow$().find(e => e.id == actionId);
            this.dialogService.openDialog(DialogMode.DELETE, entity, {sourceTypes: this.sourceTypes});
          }
        }
      });
  }

  ngOnInit() {
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
    return this.entityService.getWithQuery(params);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.entitiesToShow$().length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.entitiesToShow$());
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row['position'] + 1
    }`;
  }

  handleFilterChange(event: FilterEvent){
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

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort$.set(event.sort);
    this.page$.set(event.page);
  }

  onFilterEnabledChanged($event: boolean) {
    this.filterEnabled = $event;
  }
}
