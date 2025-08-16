import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, map, skip, switchMap, takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {TABLE_ANIMATION} from "../../../animation";
import {EntitiesPageHeaderComponent} from "../entities-page-header/entities-page-header.component";
import {DataTableFilterComponent, FilterEvent} from "../data-table-filter/data-table-filter.component";
import {RbSort, TableQueryReflectorDirective} from "../../../directives/table-query-reflector.directive";
import {BaseEntitiesPage} from "../base-entities-page";
import {TableType} from "../../../enums/table";
import {FormFieldType} from "../../../models/dialog.model";
import {FilterItem, TableElement} from "../../../models/table.model";
import {Store} from "@ngrx/store";
import {AdminActions} from "../../../store/action.types";
import {DialogMode} from "../../../enums/dialog";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {IBaseEntityService} from "../../../services/base-entity.service.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {AppOrganization} from "../../../entities/organization/models/organization";
import {AppProject} from "../../../entities/project/models/project";
import {AppUser} from "../../../entities/user/models/user";
import {ENTITIES} from "../../../consts/entities";
import {DetailType} from "../../../enums/detail-type";
import {ROLES} from "../../../enums/entities";
// import {
//   OrganizationCardComponent
// } from "../../../entities/organization/components/organization-card/organization-card.component";
import {OrganizationService} from "../../../entities/organization/services/organization.service";
import {
  ProjectTableRowComponent
} from "../../../entities/project/components/project-table-row/project-table-row.component";
// import {ProjectCardComponent} from "../../../entities/project/components/project-card/project-card.component";
import {UserTableRowComponent} from "../../../entities/user/components/user-table-row/user-table-row.component";
import {
  SourceDataTableRowComponent
} from "../../../entities/source-data/components/source-data-table-row/source-data-table-row.component";
import {
  SourceTypeTableRowComponent
} from "../../../entities/source-type/components/source-type-table-row/source-type-table-row.component";
import {GroupTableRowComponent} from "../../../entities/group/components/group-table-row/group-table-row.component";
import {
  SubjectTableRowComponent
} from "../../../entities/subject/components/subject-table-row/subject-table-row.component";
import {SourceTableRowComponent} from "../../../entities/source/components/source-table-row/source-table-row.component";
import {AuditTableRowComponent} from "../../../entities/audit/components/audit-table-row/audit-table-row.component";
import {LogTableRowComponent} from "../../../entities/log/components/log-table-row/log-table-row.component";
import {ClientTableRowComponent} from "../../../entities/client/components/client-table-row/client-table-row.component";
import {
  OrganizationDialogComponent
} from "../../../entities/organization/containers/organization-dialog/organization-dialog.component";
import {ProjectDialogComponent} from "../../../entities/project/containers/project-dialog/project-dialog.component";
import {UserDialogComponent} from "../../../entities/user/containers/user-dialog/user-dialog.component";
import {
  SourceDataDialogComponent
} from "../../../entities/source-data/containers/source-data-dialog/source-data-dialog.component";
import {
  SourceTypeDialogComponent
} from "../../../entities/source-type/containers/source-type-dialog/source-type-dialog.component";
import {GroupDialogComponent} from "../../../entities/group/containers/group-dialog/group-dialog.component";
import {SubjectDialogComponent} from "../../../entities/subject/containers/subject-dialog/subject-dialog.component";
import {SourceDialogComponent} from "../../../entities/source/containers/source-dialog/source-dialog.component";
import {ClientDialogComponent} from "../../../entities/client/containers/client-dialog/client-dialog.component";
import {BaseDialogComponent} from "../../base-dialog/base-dialog.component";
import {ProjectService} from "../../../entities/project/services/project.service";
import {UserService} from "../../../entities/user/services/user.service";
import {SourceDataService} from "../../../entities/source-data/services/source-data.service";
import {SourceTypeService} from "../../../entities/source-type/services/sourceType.service";
import {GroupService} from "../../../entities/group/services/group.service";
import {SubjectService} from "../../../entities/subject/services/subject.service";
import {SourceService} from "../../../entities/source/services/source.service";
import {ClientService} from "../../../entities/client/services/client.service";
import {AuditService} from "../../../entities/audit/services/audit.service";
import {LogService} from "../../../entities/log/services/log.service";
import {AsyncPipe, JsonPipe, KeyValuePipe} from "@angular/common";
import {instanceConfig} from "../../../../core/config/store/config.selectors";
import {MatCheckbox} from "@angular/material/checkbox";
import {
  RevisionTableRowComponent
} from "../../../entities/revision/components/revision-table-row/revision-table-row.component";
import {
  OrganizationTableRowComponent
} from "../../../entities/organization/components/organization-table-row/organization-table-row.component";
import {
  QuestionnaireTableRowComponent
} from "../../../entities/questionnaire/components/questionnaire-table-row/questionnaire-table-row.component";
import {
  QuestionnaireDialogComponent
} from "../../../entities/questionnaire/containers/questionnaire-dialog/questionnaire-dialog.component";
import {QuestionnaireService} from "../../../entities/questionnaire/services/questionnaire.service";
import {ProtocolService} from "../../../entities/protocol/services/protocol.service";
import {ProtocolDialogComponent} from "../../../entities/protocol/containers/protocol-dialog/protocol-dialog.component";
import {
  ProtocolTableRowComponent
} from "../../../entities/protocol/components/protocol-table-row/protocol-table-row.component";
import {LoaderComponent} from '../../../../shared/components/loader/loader.component';

// Define a mapping type
type EntityMap = {
  project: AppProject;
  organization: AppOrganization;
};

// Define a key that narrows the type
type EntityName = keyof EntityMap; // "project" | "organization"


class EntityManager<K extends EntityName> {
  entities: EntityMap[K][] = [];

  constructor(public entityName: K) {}

  add(entity: EntityMap[K]) {
    this.entities.push(entity);
  }

  getAll(): EntityMap[K][] {
    return this.entities;
  }
}

// export type EntityType = AppProject | AppOrganization | AppUser;


@Component({
  selector: 'rb-entities-page',
  // templateUrl: '../../../../components/entities-page/entities-page.component.html',
  templateUrl: './impl-entities-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    OrganizationTableRowComponent,
    // OrganizationCardComponent,
    ProjectTableRowComponent,
    // ProjectCardComponent,
    UserTableRowComponent,
    SourceDataTableRowComponent,
    SourceTypeTableRowComponent,
    GroupTableRowComponent,
    SubjectTableRowComponent,
    SourceTableRowComponent,
    AuditTableRowComponent,
    LogTableRowComponent,
    ClientTableRowComponent,
    KeyValuePipe,
    AsyncPipe,
    JsonPipe,
    MatCheckbox,
    RevisionTableRowComponent,
    QuestionnaireTableRowComponent,
    ProtocolTableRowComponent,
    // QuestionnaireTableRowComponent,
  ]
})
export class ImplEntitiesPageComponent
  // extends BaseEntitiesPage<AppOrganization, OrganizationDialogComponent>
  implements OnInit, OnDestroy {
  protected readonly ENTITIES = ENTITIES;
  // DialogComponent?: U
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  data;

  name;

  // tableProperties: Record<string, TableElement> = this.activatedRoute.snapshot.data['config']['tableFields'] || {};
  tableProperties: TableElement[];
  filters: FilterItem[];

  // type: TableType = TableType.GET_ALL_FROM_STORE;
  type: TableType;

  loading = true;

  entities: any[];
  filteredAndSortedEntities: any[]; // = this.entities;
  entitiesToShow: any[] = []; //T[] = [];



  total = 0;
  defaultPageSize = 20;

  page$: BehaviorSubject<PageEvent> = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: this.defaultPageSize,
    length: 0,
  });

  sort$: BehaviorSubject<RbSort> = new BehaviorSubject<RbSort>({
    sortField: 'id',
    sortOrder: 'desc',
  });

  filter$: BehaviorSubject<FilterEvent>;

  updateTrigger$ = new BehaviorSubject<string>('init');

  _destroy$: Subject<void> = new Subject<void>();

  isFilterOpened = true;

  expandedElement?: any | null; //T | null;

  selection = new SelectionModel<any>(true, []);

  pageSizeOptions = [5, 10, 20, 50, 100];

  updated?: number | string;

  filterEnabled = false;

  filterEvent: FilterEvent = {};
  sort: RbSort = {sortField: "id", sortOrder: "desc"};
  page: PageEvent = {
    pageIndex: 0,
    pageSize: this.defaultPageSize,
    length: this.entitiesToShow.length
  };

  MIN_ENTITIES_FOR_FILTERS = 0
  MIN_ENTITIES_FOR_PAGINATION = 0

  gridViewEnabled: boolean;
  gridView; // = this.gridViewEnabled; // && this.activatedRoute.snapshot.data['gridView'] ?? false;

  protected readonly ROLES = ROLES;

  entityService!: IBaseEntityService<any>

  config$;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store,
    // public entityService: IBaseEntityService<EntityType>
  ) {
    const SERVICES: Record<string, any> = {
      organization: OrganizationService,
      project: ProjectService,
      user: UserService,
      sourceData: SourceDataService,
      sourceType: SourceTypeService,
      group: GroupService,
      subject: SubjectService,
      source: SourceService,
      client: ClientService,
      audit: AuditService,
      log: LogService,
      questionnaire: QuestionnaireService,
      protocol: ProtocolService,
    }
    this.entityService = inject(SERVICES[this.name] || OrganizationService);
    this.data = this.activatedRoute.snapshot.data;

    this.name = this.activatedRoute.snapshot.data['entityName'] || 'entity';

    // tableProperties: Record<string, TableElement> = this.activatedRoute.snapshot.data['config']['tableFields'] || {};
    this.tableProperties = this.activatedRoute.snapshot.data['tableProperties'] || [];
    this.filters = this.activatedRoute.snapshot.data['filters'] || [];

    // type: TableType = TableType.GET_ALL_FROM_STORE;
    this.type = this.activatedRoute.snapshot.data['type'] || TableType.GET_ALL;//.GET_ALL_FROM_STORE;
    this.entities = this.activatedRoute.snapshot.data['entities']; //.filter((i: any) => !i['name'].startsWith("@DEL_") );
    this.filteredAndSortedEntities = this.entities;
    this.filter$ = new BehaviorSubject<FilterEvent>(
      this.filters.reduce((map: { [key: string]: string | undefined }, obj) => {
        map[obj.name] = undefined;
        return map;
      }, {})
    );
    this.gridViewEnabled = this.activatedRoute.snapshot.data['gridViewEnabled'] ?? false;
    this.gridView = this.gridViewEnabled; // && this.activatedRoute.snapshot.data['gridView'] ?? false;
    this.config$ = this.store.select(instanceConfig)

  }

  init(): void {
    if (this.type === TableType.GET_ALL_FROM_STORE) {
      this.subscribeToStoreEntities();
    }
    if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL ) {
      //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
      this.filteredAndSortedEntities = this.entities;
      this.entitiesToShow = this.filteredAndSortedEntities;
      this.total = this.getTotal();
      // console.log('Class: BaseEntitiesTwoPage, Function: init, Line 100 ' , );
      this.loading = false;
      this.subscribeToEntities();
    } else {
      //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
      //! apply filter, sort, page
      this.filteredAndSortedEntities = this.entities;
      this.applyFilter();
      this.applySort();
      this.applyPage();
      // this.entitiesToShow = this.filteredAndSortedEntities.slice(this.page.pageIndex*this.page.pageSize, (this.page.pageIndex+1)*this.page.pageSize)
      this.loading = false;
    }
  }

  ngOnInit() {
    this.init()
  }

  ngOnDestroy() {
    this.destroy()
  }

  destroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this.updateTrigger$.complete();
  }

  private subscribeToEntities(): void {
    const pageInput$ = this.page$.pipe(
      distinctUntilChanged(
        (p1, p2) => p1.pageIndex === p2.pageIndex && p1.pageSize === p2.pageSize
      )
    );
    const sortInput$ = this.sort$.pipe(
      // skip(1),
      distinctUntilChanged(
        (s1, s2) => s1.sortField === s2.sortField && s1.sortOrder === s2.sortOrder
      )
    );
    //todo OK
    const filterInput$ = this.filter$.pipe();

    combineLatest([pageInput$, sortInput$, filterInput$, this.updateTrigger$])
      .pipe(
        debounceTime(0),
        skip(1),
        switchMap((value) => {
          console.log('Class: ImplEntitiesPageComponent, Function: , Line 306 value' , value);
          console.log(value);
          return this.loadEntities(value[0], value[1], value[2]);
        })
      )
      .subscribe({
        // todo should unsubscribe?
        next: (value) => {
          console.log('Class: BaseEntitiesTwoPage, Function: next, Line 147 ' , );
          this.selection.clear();
          this.loading = false;
          this.entities = value;
          this.entitiesToShow = value;
          // this.dataSource.data = this.entities;
          this.total = this.getTotal();
        },
      });
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
    return this.getWithQuery(params);
  }

  // onAction(mode: DialogMode, entity?: T, entityName?: string, e?: Event, extra?: any): void {
  onAction(mode: DialogMode, entity?: any, entityName?: string, e?: Event, extra?: any): void {
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 373 entity' , entity);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 374 entityName' , entityName);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 375 mode' , mode);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 373 extra' , extra);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 377 e' , e);
    e?.stopPropagation();

    if (entity) {
      return this.openDialog(mode, entity, extra);
    }

    if (entityName) {
      const _entity = this.entities?.find(
        (e) => this.getEntityName(e) === entityName
      );
      if (_entity) {
        return this.openDialog(mode, _entity, extra);
      }
    }

    if (entityName) {
      this.getByKey(entityName).subscribe({
        next: (_entity) => this.openDialog(mode, _entity),
        error: (err) => console.log(err),
      });
    } else {
      this.openDialog(mode);
    }
  }

  openDialog(mode: DialogMode, entity?: any, extra?: any) {
    const dialogRef = this.getDialogRef(mode, entity, extra);
    this.applyStateChangesToUrlQueryParams({
      [mode]: entity ? this.getEntityName(entity) : 'new',
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: any }) => {
          if (value.action === DialogMode.EDIT) {
            // this.updated = entity?.['id'];
            this.update(value.entity).subscribe({
              next: () => this.onSuccess(mode, dialogRef, value.entity),
              error: (err) => this.onError(err, dialogRef),
            });
          } else if (value.action === DialogMode.ADD) {
            this.add(value.entity)
              .pipe()
              .subscribe({
                next: (res) => this.onSuccess(mode, dialogRef, res),
                error: (err) => this.onError(err, dialogRef),
              });
          } else if (value.action === DialogMode.DELETE) {
            console.log('Class: BaseEntitiesPage, Function: next, Line 253 delete' , value);
            this.delete(value.entity).subscribe({
              next: () => this.onSuccess(mode, dialogRef, value.entity),
              error: (err) => this.onError(err, dialogRef),
            });
          } else if (value.action === 'close') {
            this.applyStateChangesToUrlQueryParams({ [mode]: null });
          }
        },
      });
    dialogRef.afterClosed().subscribe(() => {
      dialogActionSubscription.unsubscribe();
    });
  }

  onSuccess(mode: string, dialogRef: MatDialogRef<any>, entity: any): void {
    if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
      console.log('Class: ImplEntitiesPageComponent, Function: onSuccess, Line 416 ' , );
      this.updateTrigger$.next(entity['id']?.toString() || '0');
    }
    this.applyStateChangesToUrlQueryParams({ [mode]: null });
    dialogRef.close();
    console.log('Class: BaseEntitiesPage, Function: onSuccess, Line 253 ' , );
    this.updated = entity['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
    dialogRef.componentInstance.errorHappened(error);
  }

  applyStateChangesToUrlQueryParams(queryParams: Params): void {
    this.router
      .navigate([], {
        replaceUrl: true,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      })
      .then();
  }

  trackId(index: number, item: any): string {
    return `${item['id']}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    const numRows = this.entities.length; //this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // this.selection.select(...this.dataSource.data);
    this.selection.select(...this.entities); //this.dataSource.data);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row['position'] + 1
    }`;
  }

  subscribeToStoreEntities(): void {
    this.entityService.entities$?.pipe(
      takeUntil(this._destroy$),
      skip(1)
    ).subscribe({
      next: (value) => {
        this.entities = value;
        this.filteredAndSortedEntities = this.entities;
        //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
        this.applyFilter();
        this.applySort();
        this.applyPage();
        console.log('Class: BaseEntitiesTwoPage, Function: next, Line 312 ' , );
        this.loading = false;
      },
    });
  }

  applyFilter(){
    console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 335 this.filterEvent' , this.filterEvent, Object.entries(this.filterEvent));
    // this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
    for (const [key, value] of Object.entries(this.filterEvent)) {
      console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 447 key, value' , key, value);
      if(value) {
        if (key.startsWith('search')) {
          console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 340 ',);
          const filters = key
            .replace(/search\s*:\s*/i, "") // remove "search:" with optional spaces
            .split(",")                    // split by comma
            .map(s => s.trim())            // trim each value
            .filter(Boolean);
          console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 346 filters', filters);
          this.filteredAndSortedEntities = this.filteredAndSortedEntities.filter(entity => {
            for (const filter of filters) {
              if (entity[filter]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1) {
                console.log('Class: BaseEntitiesPage, Function: , Line 350 ',);
                return true;
              }
            }
            console.log('Class: BaseEntitiesPage, Function: , Line 354 ',);
            return false

            // return entity[key]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1;
          })
        }
      }

      if(value) {
        this.filteredAndSortedEntities = this.filteredAndSortedEntities.filter(entity => {
          return entity[key]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1;
        })
      }
    }
    // const filterName = Object.keys(filter)[0];
    // console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 445 name', filterName);
    // const filterValue = filter[filterName];
    // if(filterValue) {
    //   console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 446 this.entities', this.entities);
    //   this.entitiesToShow = this.entities.filter(entity => {
    //     return entity[filterName].toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
    //   })
    //
    //
    //   console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 448 this.entitiesToShow', this.entitiesToShow);
    //   return;
    //   // this.dataSource.filter = JSON.stringify(e);
    // }
    // this.entitiesToShow = this.entities
  }

  applySort(){
    const {sortField, sortOrder} = this.sort;
    const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
    this.filteredAndSortedEntities = this.filteredAndSortedEntities.sort((a, b) => {
      const sorted = collator.compare(a[sortField], b[sortField]);
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  applyPage() {
    const { pageIndex, pageSize } = this.page;
    const startIndex = +pageSize * +pageIndex;
    const endIndex = +pageSize * (+pageIndex + 1);
    this.entitiesToShow = this.filteredAndSortedEntities.slice(startIndex, endIndex)
  }

  handleFilterChange(event: FilterEvent){
    console.log('Class: BaseEntitiesPage, Function: handleFilterChange, Line 378 ' , );

    this.filterEvent = event;
    if (this.type === TableType.GET_WITH_QUERY) {
      console.log('Class: ImplEntitiesPageComponent, Function: handleFilterChange, Line 561 event' , event);
      this.filter$.next(event);
    } else {
      this.loading = true;
      this.filteredAndSortedEntities = this.entities;
      this.applyFilter();
      this.applySort();
      this.applyPage();
      this.loading = false;
    }
  }

  // handlePageChange(){
  //   const { pageIndex, pageSize } = this.page;
  //   const startIndex = +pageSize * +pageIndex;
  //   const endIndex = +pageSize * (+pageIndex + 1);
  //   if (this.type === TableType.GET_WITH_QUERY) {
  //     this.page$.next(this.page);
  //   } else {
  //     this.entitiesToShow = this.filteredAndSortedEntities.slice(startIndex, endIndex)
  //   }
  // }

  switchPage(page: PageEvent) {
    console.log('Class: BaseEntitiesTwoPage, Function: switchPage, Line 388 ' , );

    // const {pageIndex, pageSize} = page
    this.page = page; //{pageIndex, pageSize} //: page., sortOrderpage as RbPage;
    if (this.type === TableType.GET_WITH_QUERY) {
      this.page$.next(this.page);
    } else {
      this.loading = true;
      this.applyPage();
      this.loading = false;
    }
  }

  switchSort(event: TableElement) {
    console.log('Class: BaseEntitiesTwoPage, Function: switchSort, Line 401 ' , );
    if(!event.sortable) {
      return;
    }
    if (event.name === this.sort?.sortField) {
      this.sort = {sortField: event.name, sortOrder: this.sort?.sortOrder === 'asc' ? 'desc' : 'asc'};
    } else {
      this.sort = {sortField: event.name, sortOrder: 'asc'};
    }
    console.log('!Class: BaseEntitiesTwoPage, Function: switchSort, Line 414 ' , this.sort);
    if (this.type === TableType.GET_WITH_QUERY) {
      this.sort$.next(this.sort);
    } else {
      this.loading = true;
      this.applySort();
      this.applyPage();
      this.loading = false;
    }
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort = event.sort;
    this.page = event.page;
    if (this.type === TableType.GET_WITH_QUERY) {
      this.sort$.next(this.sort);
      this.page$.next(this.page);
    } else {
      this.loading = true;
      this.applySort();
      this.applyPage();
      this.loading = false;
    }

    // if (this.type === TableType.GET_WITH_QUERY) {
    //   this.page$.next(this.page);
    // } else {
    //   this.loading = true;
    //   this.applyPage();
    //   this.loading = false;
    // }
  }

  handleSortChange(sort: RbSort){
    console.log('!Class: BaseEntitiesTwoPage, Function: handleSortChange, Line 418 ' , sort);

    this.sort = sort;
    if (this.type === TableType.GET_WITH_QUERY) {
      this.sort$.next(this.sort);
    } else {
      this.loading = true;
      this.applySort();
      this.applyPage();
      this.loading = false;
    }
  }

  onFilterEnabledChanged($event: boolean) {
    console.log('Class: BaseEntitiesPage, Function: onFilterEnabledChanged, Line 476 ' , );
    this.filterEnabled = $event;
  }

  getTotal(): number {
    return this.entityService.getTotal() || 0;
    // throw new Error('BaseListPageComponent "getTotal" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDialogRef(mode: DialogMode, entity?: any, extra?: any): MatDialogRef<any> {
    // throw new Error(
    //   'BaseListPageComponent "getDialogRef" method not implemented'
    // );

    const DIALOG_COMPONENTS: Record<string, any> = {
      organization: OrganizationDialogComponent,
      project: ProjectDialogComponent,
      user: UserDialogComponent,
      sourceData: SourceDataDialogComponent,
      sourceType: SourceTypeDialogComponent,
      group: GroupDialogComponent,
      subject: SubjectDialogComponent,
      source: SourceDialogComponent,
      client: ClientDialogComponent,
      questionnaire: QuestionnaireDialogComponent,
      protocol: ProtocolDialogComponent,
    }
    return this.dialog.open(DIALOG_COMPONENTS[this.name], {
      data: { mode, entity, ...this.data, extra}, //entities: this.entities },
      panelClass: 'tailwind-slide-panel',
      width: '50%',
      height: '100vh',
      position: { right: '0' },
      hasBackdrop: true,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false
    });
  }

  getWithQuery(params: Params): Observable<any[]> {
    // throw new Error(
    //   'BaseListPageComponent "getWithQuery" method not implemented'
    // );
    return this.entityService.getWithQuery(params);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByKey(entityName: string): Observable<any> {
    return this.entityService.getByKey(entityName);
    // throw new Error('BaseListPageComponent "getByKey" method not implemented');
    // return this.entityService.getByKey(entityName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: any): Observable<any> {
    return this.entityService.update(entity);
    // throw new Error('BaseListPageComponent "update" method not implemented');
    // return this.entityService.update(entity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(entity: any): Observable<any> {
    console.log(555);
    return this.entityService.add(entity);
    // throw new Error('BaseListPageComponent "add" method not implemented');
    // return this.entityService.add(entity)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(entity: any): Observable<string | number> {
    if (this.type === TableType.GET_ALL_FROM_STORE) {
      return this.entityService.delete(`${entity['name']},${entity['id']}`);
    }
    return this.entityService.delete(entity['name']);
    // throw new Error('BaseListPageComponent "delete" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getEntityName(entity: any): string {
    return entity['name'];
    // throw new Error(
    //   'BaseListPageComponent "getEntityName" method not implemented'
    // );
  }

  isOrganization(entity: any): entity is AppOrganization {
    return entity.type === 'organization'; // or some other discriminator
  }

  isProject(entity: any): entity is AppProject {
    return entity.type === 'project';
  }

  isUser(entity: any): entity is AppUser {
    return entity.type === 'user';
  }

  // protected readonly name = ENTITY_NAME.organization
  // protected readonly PROPERTIES = PROPERTIES;
  // // protected readonly ROLES = ROLES;
  //
  // // override type = TableType.GET_ALL_FROM_STORE;
  // override type = TableType.GET_ALL;
  //
  // override filters: FilterItem[] = [
  //   { name: 'search: name, location, description', label: 'Search ...', type: FormFieldType.INPUT },
  //   // { name: 'name', label: 'Name', type: FormFieldType.INPUT },
  //   // {
  //   //   name: 'location',
  //   //   label: 'Location',
  //   //   type: FormFieldType.INPUT,
  //   // },
  // ];
  //
  // override gridView = true;
  //
  // constructor(
  //   router: Router,
  //   activatedRoute: ActivatedRoute,
  //   dialog: MatDialog,
  //   // entityService: OrganizationEntityService,
  //   entityService: OrganizationService,
  //   private store: Store
  // ) {
  //   super(router, activatedRoute, dialog, entityService);
  // }
  //
  // ngOnInit(): void {
  //   this.store.dispatch(
  //     AdminActions.projectSelected({ selectedProject: null })
  //   );
  //   this.init();
  // }
  //
  // ngOnDestroy() {
  //   this.destroy();
  // }
  //
  // override getDialogRef(mode: DialogMode, entity?: AppOrganization) {
  //   return this.dialog.open(OrganizationDialogComponent, {
  //     data: { mode, entity, entities: this.entities },
  //     panelClass: 'tailwind-slide-panel',
  //     width: '50%',
  //     height: '100vh',
  //     position: { right: '0' },
  //     hasBackdrop: true,
  //     disableClose: true,
  //     autoFocus: false,
  //     restoreFocus: false
  //   });
  // }
  //
  // override delete(entity: AppOrganization): Observable<string | number> {
  //   return this.entityService.update({...entity, name: `@DEL_${entity.name}`}).pipe(
  //     map(o => o.name)
  //   );
  //   // if (this.type === TableType.GET_ALL_FROM_STORE) {
  //   //   return this.entityService.delete(`${entity['name']},${entity['id']}`);
  //   // }
  //   // return this.entityService.delete(entity['name']);
  //   // // throw new Error('BaseListPageComponent "delete" method not implemented');
  // }
  compareOriginalOrder = () => 0;
}
