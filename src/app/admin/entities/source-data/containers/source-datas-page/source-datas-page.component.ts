import {Component, inject, OnDestroy, OnInit, signal, computed, WritableSignal} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map, skip, switchMap, takeUntil} from "rxjs/operators";
import {TranslatePipe} from "@ngx-translate/core";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Store} from "@ngrx/store";
import {BehaviorSubject, combineLatest, Observable, Subject} from "rxjs";
import {SelectionModel} from "@angular/cdk/collections";
import {AsyncPipe, JsonPipe, KeyValuePipe} from "@angular/common";
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
import {FilterItem, TableElement} from '../../../../models/table.model';
import { TableType } from '../../../../enums/table';
import {IBaseEntityService} from '../../../../services/base-entity.service.interface';
import {SourceDataService} from '../../services/source-data.service';
import {instanceConfig} from '../../../../../core/config/store/config.selectors';
import {ENTITIES} from '../../../../consts/entities';
import {DialogMode} from '../../../../enums/dialog';
import {DetailType} from '../../../../enums/detail-type';
import {ENTITY_NAME, ROLES} from '../../../../enums/entities';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {HttpErrorResponse} from '@angular/common/http';
import {SourceDataDialogComponent} from '../source-data-dialog/source-data-dialog.component';
import {SourceDataDialogService} from '../../services/source-data-dialog.service';
import {AppSourceData} from '../../models/source-data';

@Component({
  selector: 'rb-entities-page',
  // templateUrl: '../../../../components/entities-page/entities-page.component.html',
  templateUrl: './source-datas-page.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    EntitiesPageHeaderComponent,
    DataTableFilterComponent,
    LoaderComponent,
    TableQueryReflectorDirective,
    TranslatePipe,
    MatPaginator,
    // OrganizationTableRowComponent,
    // OrganizationCardComponent,
    // ProjectTableRowComponent,
    // ProjectCardComponent,
    // UserTableRowComponent,
    SourceDataTableRowComponent,
    // SourceTypeTableRowComponent,
    // GroupTableRowComponent,
    // SubjectTableRowComponent,
    // SourceTableRowComponent,
    // AuditTableRowComponent,
    // LogTableRowComponent,
    // ClientTableRowComponent,
    // KeyValuePipe,
    AsyncPipe,
    // JsonPipe,
    MatCheckbox,
    // RevisionTableRowComponent,
    // QuestionnaireTableRowComponent,
    // ProtocolTableRowComponent,
    // QuestionnaireTableRowComponent,
  ]
})
export class SourceDatasPageComponent implements OnInit, OnDestroy {
  protected readonly ENTITIES = ENTITIES;
  protected readonly DialogMode = DialogMode;
  // protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;


  data;

  tableProperties: TableElement[];
  filters: FilterItem[];

  // type: TableType;

  // loading = true;
  loading = signal(true);

  entities: AppSourceData[];
  filteredAndSortedEntities: any[]; // = this.entities;
  entitiesToShow: WritableSignal<any[]> = signal<any[]>([]); //T[] = [];



  // total = 0;
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

  // updateTrigger$ = new BehaviorSubject<string>('init');

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
    length: 0
  };

  MIN_ENTITIES_FOR_FILTERS = 0
  MIN_ENTITIES_FOR_PAGINATION = 0

  gridViewEnabled: boolean;
  gridView; // = this.gridViewEnabled; // && this.activatedRoute.snapshot.data['gridView'] ?? false;

  protected readonly ROLES = ROLES;

  // entityService!: IBaseEntityService<any>

  config$;

  constructor(
    // private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    // private dialog: MatDialog,
    private entityService: SourceDataService,
    private dialogService: SourceDataDialogService
  ) {
    // const SERVICES: Record<string, any> = {
      // organization: OrganizationService,
      // project: ProjectService,
      // user: UserService,
      // sourceData: SourceDataService,
      // sourceType: SourceTypeService,
      // group: GroupService,
      // subject: SubjectService,
      // source: SourceService,
      // client: ClientService,
      // audit: AuditService,
      // log: LogService,
      // questionnaire: QuestionnaireService,
      // protocol: ProtocolService,
    // }
    // this.name = this.activatedRoute.snapshot.data['entityName'] || 'entity';
    // this.entityService = inject(SERVICES[this.name]); //inject(SERVICES[this.name] || OrganizationService);
    this.data = this.activatedRoute.snapshot.data;


    this.tableProperties = this.activatedRoute.snapshot.data['tableProperties'] || [];
    this.filters = this.activatedRoute.snapshot.data['filters'] || [];
    // this.type = this.activatedRoute.snapshot.data['type'] || TableType.GET_ALL;//.GET_ALL_FROM_STORE;
    this.entities = this.activatedRoute.snapshot.data['entities']; //.filter((i: any) => !i['name'].startsWith("@DEL_") );
    this.gridViewEnabled = this.activatedRoute.snapshot.data['gridViewEnabled'] ?? false;
    this.gridView = this.gridViewEnabled; // && this.activatedRoute.snapshot.data['gridView'] ?? false;

    this.filteredAndSortedEntities = this.entities;
    this.filter$ = new BehaviorSubject<FilterEvent>(
      this.filters.reduce((map: { [key: string]: string | undefined }, obj) => {
        map[obj.name] = undefined;
        return map;
      }, {})
    );
    this.config$ = this.store.select(instanceConfig)
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
            this.dialogService.openDialog(DialogMode.ADD, undefined, this.data);
          } else if (actionType === 'edit') {
            const entity = this.entities.find(e => e.id == actionId);
            this.dialogService.openDialog(DialogMode.EDIT, entity, this.data);
          } else if (actionType === 'delete') {
            const entity = this.entities.find(e => e.id == actionId);
            this.dialogService.openDialog(DialogMode.DELETE, entity, this.data);
          }
        }
      });
  }

  fetchEntities() {
    // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL ) {
      //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
      this.filteredAndSortedEntities = this.entities;
      console.log('this.entitiesToShow Class: CommonEntitiesPageComponent, Function: init, Line 339 this.entitiesToShow' , this.entitiesToShow);
      this.entitiesToShow.set(this.filteredAndSortedEntities);
      // this.total = this.getTotal();
      // console.log('Class: BaseEntitiesTwoPage, Function: init, Line 100 ' , );
      // this.loading = false;
      this.loading.set(false);
      this.subscribeToEntities();
    // } else {
    //   //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
    //   //! apply filter, sort, page
    //   this.filteredAndSortedEntities = this.entities;
    //   this.applyFilter();
    //   this.applySort();
    //   this.applyPage();
    //   // this.entitiesToShow = this.filteredAndSortedEntities.slice(this.page.pageIndex*this.page.pageSize, (this.page.pageIndex+1)*this.page.pageSize)
    //   this.loading = false;
    // }
  }

  // init(): void {
  //   if (this.type === TableType.GET_ALL_FROM_STORE) {
  //     this.subscribeToStoreEntities();
  //   }
  //   if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL ) {
  //     //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
  //     this.filteredAndSortedEntities = this.entities;
  //     this.entitiesToShow = this.filteredAndSortedEntities;
  //     this.total = this.getTotal();
  //     // console.log('Class: BaseEntitiesTwoPage, Function: init, Line 100 ' , );
  //     this.loading = false;
  //     this.subscribeToEntities();
  //   } else {
  //     //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
  //     //! apply filter, sort, page
  //     this.filteredAndSortedEntities = this.entities;
  //     this.applyFilter();
  //     this.applySort();
  //     this.applyPage();
  //     // this.entitiesToShow = this.filteredAndSortedEntities.slice(this.page.pageIndex*this.page.pageSize, (this.page.pageIndex+1)*this.page.pageSize)
  //     this.loading = false;
  //   }
  // }

  ngOnInit() {
    this.handleDialogUrlFragment();

    // this.activatedRoute.firstChild?.params.subscribe(params => {
    //   if (this.activatedRoute.firstChild?.routeConfig?.path === 'add') {
    //     this.openDialog(DialogMode.ADD);
    //   } else if (this.activatedRoute.firstChild?.routeConfig?.path === 'edit/:id') {
    //     // this.openDialog(params['id']);
    //   }
    // });



    // if (this.type === TableType.GET_ALL_FROM_STORE) {
    //   this.subscribeToStoreEntities();
    // }

    this.fetchEntities();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    this.entityService.updateTrigger$.complete();
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

    combineLatest([pageInput$, sortInput$, filterInput$, this.entityService.updateTrigger$])
      .pipe(
        debounceTime(0),
        skip(1),
        switchMap((value) => {
          console.log('Class: ImplEntitiesPageComponent, Function: , Line 306 value' , value);
          console.log(value);
          // this.updated = value[3];
          return this.loadEntities(value[0], value[1], value[2]);
        })
      )
      .subscribe({
        // todo should unsubscribe?
        next: (value) => {
          console.log('Class: BaseEntitiesTwoPage, Function: next, Line 147 ' , );
          this.selection.clear();
          // setTimeout(() => {
          this.loading.set(false);
            // this.loading = false;
            // this.entities = value;
            console.log('this.entitiesToShow Class: CommonEntitiesPageComponent, Function: next, Line 427 ' , this.entitiesToShow );
            this.entitiesToShow.set(value);
            console.log('this.entitiesToShow Class: CommonEntitiesPageComponent, Function: next, Line 430 ' , this.entitiesToShow );
            // this.dataSource.data = this.entities;
            // this.total = this.getTotal();
          // }, 1000)

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

  // // onAction(mode: DialogMode, entity?: T, entityName?: string, e?: Event, extra?: any): void {
  onAction(mode: DialogMode, entity?: any, entityName?: string, e?: Event, extra?: any): void {
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 373 entity' , entity);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 374 entityName' , entityName);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 375 mode' , mode);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 373 extra' , extra);
    console.log('Class: ImplEntitiesPageComponent, Function: onAction, Line 377 e' , e);
    e?.stopPropagation();

    if (entity) {
      return this.dialogService.openDialog(mode, entity, extra);
    }

    if (entityName) {
      const _entity = this.entities?.find(
        (e) => this.getEntityName(e) === entityName
      );
      if (_entity) {
        return this.dialogService.openDialog(mode, _entity, extra);
      }
    }

    if (entityName) {
      this.getByKey(entityName).subscribe({
        next: (_entity) => this.dialogService.openDialog(mode, _entity),
        error: (err) => console.log(err),
      });
    } else {
      this.dialogService.openDialog(mode);
    }
  }

  // openDialog(mode: DialogMode, entity?: any, extra?: any) {
  //   const dialogRef = this.getDialogRef(mode, entity, extra);
  //   // this.applyStateChangesToUrlQueryParams({
  //   //   [mode]: entity ? this.getEntityName(entity) : 'new',
  //   // });
  //
  //   const dialogActionSubscription =
  //     dialogRef.componentInstance.actionTriggered.subscribe({
  //       next: (value: { action: DialogMode | string; entity: any }) => {
  //         if (value.action === DialogMode.EDIT) {
  //           // this.updated = entity?.['id'];
  //           this.update(value.entity).subscribe({
  //             next: () => this.onSuccess(mode, dialogRef, value.entity),
  //             error: (err) => this.onError(err, dialogRef),
  //           });
  //         } else if (value.action === DialogMode.ADD) {
  //           this.add(value.entity)
  //             .pipe()
  //             .subscribe({
  //               next: (res) => this.onSuccess(mode, dialogRef, res),
  //               error: (err) => this.onError(err, dialogRef),
  //             });
  //         } else if (value.action === DialogMode.DELETE) {
  //           console.log('Class: BaseEntitiesPage, Function: next, Line 253 delete' , value);
  //           this.delete(value.entity).subscribe({
  //             next: () => this.onSuccess(mode, dialogRef, value.entity),
  //             error: (err) => this.onError(err, dialogRef),
  //           });
  //         } else if (value.action === 'close') {
  //           // this.applyStateChangesToUrlQueryParams({ [mode]: null });
  //           this.router.navigate([], {
  //             relativeTo: this.activatedRoute,
  //             queryParamsHandling: 'preserve'
  //           });
  //         }
  //       },
  //     });
  //   dialogRef.afterClosed().subscribe(() => {
  //     dialogActionSubscription.unsubscribe();
  //   });
  // }

  // onSuccess(mode: string, dialogRef: MatDialogRef<any>, entity: any): void {
  //   if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
  //     console.log('Class: ImplEntitiesPageComponent, Function: onSuccess, Line 416 ' , );
  //     this.updateTrigger$.next(entity['id']?.toString() || '0');
  //   }
  //   this.applyStateChangesToUrlQueryParams({ [mode]: null });
  //   dialogRef.close();
  //   console.log('Class: BaseEntitiesPage, Function: onSuccess, Line 253 ' , );
  //   this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  // }
  //
  // onError(error: HttpErrorResponse, dialogRef: MatDialogRef<any>) {
  //   dialogRef.componentInstance.errorHappened(error);
  // }

  // applyStateChangesToUrlQueryParams(queryParams: Params): void {
  //   this.router
  //     .navigate([], {
  //       replaceUrl: true,
  //       queryParams: queryParams,
  //       queryParamsHandling: 'merge',
  //       fragment: this.activatedRoute.snapshot.fragment ?? undefined,
  //     })
  //     .then();
  // }

  // trackId(index: number, item: any): string {
  //   return `${item['id']}`;
  // }

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

  // subscribeToStoreEntities(): void {
  //   this.entityService.entities$?.pipe(
  //     takeUntil(this._destroy$),
  //     skip(1)
  //   ).subscribe({
  //     next: (value) => {
  //       this.entities = value;
  //       this.filteredAndSortedEntities = this.entities;
  //       //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
  //       this.applyFilter();
  //       this.applySort();
  //       this.applyPage();
  //       console.log('Class: BaseEntitiesTwoPage, Function: next, Line 312 ' , );
  //       this.loading = false;
  //     },
  //   });
  // }

  // applyFilter(){
  //   console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 335 this.filterEvent' , this.filterEvent, Object.entries(this.filterEvent));
  //   // this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
  //   for (const [key, value] of Object.entries(this.filterEvent)) {
  //     console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 447 key, value' , key, value);
  //     if(value) {
  //       if (key.startsWith('search')) {
  //         console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 340 ',);
  //         const filters = key
  //           .replace(/search\s*:\s*/i, "") // remove "search:" with optional spaces
  //           .split(",")                    // split by comma
  //           .map(s => s.trim())            // trim each value
  //           .filter(Boolean);
  //         console.log('Class: BaseEntitiesPage, Function: applyFilter, Line 346 filters', filters);
  //         this.filteredAndSortedEntities = this.filteredAndSortedEntities.filter(entity => {
  //           for (const filter of filters) {
  //             if (entity[filter]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1) {
  //               console.log('Class: BaseEntitiesPage, Function: , Line 350 ',);
  //               return true;
  //             }
  //           }
  //           console.log('Class: BaseEntitiesPage, Function: , Line 354 ',);
  //           return false
  //
  //           // return entity[key]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1;
  //         })
  //       }
  //     }
  //
  //     if(value) {
  //       this.filteredAndSortedEntities = this.filteredAndSortedEntities.filter(entity => {
  //         return entity[key]?.toString()?.toLowerCase()?.indexOf(value?.toLowerCase()) !== -1;
  //       })
  //     }
  //   }
  //   // const filterName = Object.keys(filter)[0];
  //   // console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 445 name', filterName);
  //   // const filterValue = filter[filterName];
  //   // if(filterValue) {
  //   //   console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 446 this.entities', this.entities);
  //   //   this.entitiesToShow = this.entities.filter(entity => {
  //   //     return entity[filterName].toString().toLowerCase().indexOf(filterValue.toLowerCase()) !== -1;
  //   //   })
  //   //
  //   //
  //   //   console.log('Class: BaseEntitiesTwoPage, Function: applyFilter, Line 448 this.entitiesToShow', this.entitiesToShow);
  //   //   return;
  //   //   // this.dataSource.filter = JSON.stringify(e);
  //   // }
  //   // this.entitiesToShow = this.entities
  // }
  //
  // applySort(){
  //   const {sortField, sortOrder} = this.sort;
  //   const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
  //   this.filteredAndSortedEntities = this.filteredAndSortedEntities.sort((a, b) => {
  //     const sorted = collator.compare(a[sortField], b[sortField]);
  //     return sortOrder === 'asc' ? sorted : -1 * sorted;
  //   })
  // }
  //
  // applyPage() {
  //   const { pageIndex, pageSize } = this.page;
  //   const startIndex = +pageSize * +pageIndex;
  //   const endIndex = +pageSize * (+pageIndex + 1);
  //   console.log('this.entitiesToShow Class: CommonEntitiesPageComponent, Function: applyPage, Line 674 this.entitiesToShow' , this.entitiesToShow);
  //   this.entitiesToShow.set(this.filteredAndSortedEntities.slice(startIndex, endIndex))
  // }

  handleFilterChange(event: FilterEvent){
    console.log('Class: BaseEntitiesPage, Function: handleFilterChange, Line 378 ' , );

    this.filterEvent = event;
    // if (this.type === TableType.GET_WITH_QUERY) {
      console.log('Class: ImplEntitiesPageComponent, Function: handleFilterChange, Line 561 event' , event);
      this.filter$.next(event);
    // } else {
    //   this.loading = true;
    //   this.filteredAndSortedEntities = this.entities;
    //   this.applyFilter();
    //   this.applySort();
    //   this.applyPage();
    //   this.loading = false;
    // }
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
    // if (this.type === TableType.GET_WITH_QUERY) {
      this.page$.next(this.page);
    // } else {
    //   this.loading = true;
    //   this.applyPage();
    //   this.loading = false;
    // }
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
    // if (this.type === TableType.GET_WITH_QUERY) {
      this.sort$.next(this.sort);
    // } else {
    //   this.loading = true;
    //   this.applySort();
    //   this.applyPage();
    //   this.loading = false;
    // }
  }

  handleActiveQueryChange(event: {page: PageEvent, sort: RbSort}){
    this.sort = event.sort;
    this.page = event.page;
    // if (this.type === TableType.GET_WITH_QUERY) {
      this.sort$.next(this.sort);
      this.page$.next(this.page);
    // } else {
    //   this.loading = true;
    //   this.applySort();
    //   this.applyPage();
    //   this.loading = false;
    // }

    // if (this.type === TableType.GET_WITH_QUERY) {
    //   this.page$.next(this.page);
    // } else {
    //   this.loading = true;
    //   this.applyPage();
    //   this.loading = false;
    // }
  }

  // handleSortChange(sort: RbSort){
  //   console.log('!Class: BaseEntitiesTwoPage, Function: handleSortChange, Line 418 ' , sort);
  //
  //   this.sort = sort;
  //   // if (this.type === TableType.GET_WITH_QUERY) {
  //     this.sort$.next(this.sort);
  //   // } else {
  //   //   this.loading = true;
  //   //   this.applySort();
  //   //   this.applyPage();
  //   //   this.loading = false;
  //   // }
  // }

  onFilterEnabledChanged($event: boolean) {
    console.log('Class: BaseEntitiesPage, Function: onFilterEnabledChanged, Line 476 ' , );
    this.filterEnabled = $event;
  }

  // getTotal(): number {
  //   return this.entityService.getTotal() || 0;
  //   // throw new Error('BaseListPageComponent "getTotal" method not implemented');
  // }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // getDialogRef(mode: DialogMode, entity?: any, extra?: any): MatDialogRef<any> {
  //   // throw new Error(
  //   //   'BaseListPageComponent "getDialogRef" method not implemented'
  //   // );
  //
  //   // const DIALOG_COMPONENTS: Record<string, any> = {
  //   //   organization: OrganizationDialogComponent,
  //   //   project: ProjectDialogComponent,
  //   //   user: UserDialogComponent,
  //   //   sourceData: SourceDataDialogComponent,
  //   //   sourceType: SourceTypeDialogComponent,
  //   //   group: GroupDialogComponent,
  //   //   subject: SubjectDialogComponent,
  //   //   source: SourceDialogComponent,
  //   //   client: ClientDialogComponent,
  //   //   questionnaire: QuestionnaireDialogComponent,
  //   //   protocol: ProtocolDialogComponent,
  //   // }
  //   return this.dialog.open(SourceDataDialogComponent, {
  //     data: { mode, entity, ...this.data, extra}, //entities: this.entities },
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

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // update(entity: any): Observable<any> {
  //   return this.entityService.update(entity);
  //   // throw new Error('BaseListPageComponent "update" method not implemented');
  //   // return this.entityService.update(entity);
  // }
  //
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // add(entity: any): Observable<any> {
  //   console.log(555);
  //   return this.entityService.add(entity);
  //   // throw new Error('BaseListPageComponent "add" method not implemented');
  //   // return this.entityService.add(entity)
  // }
  //
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // delete(entity: any): Observable<string | number> {
  //   if (this.type === TableType.GET_ALL_FROM_STORE) {
  //     return this.entityService.delete(`${entity['name']},${entity['id']}`);
  //   }
  //   return this.entityService.delete(entity['name']);
  //   // throw new Error('BaseListPageComponent "delete" method not implemented');
  // }

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getEntityName(entity: any): string {
    return entity['name'];
    // throw new Error(
    //   'BaseListPageComponent "getEntityName" method not implemented'
    // );
  }
  //
  // isOrganization(entity: any): entity is AppOrganization {
  //   return entity.type === 'organization'; // or some other discriminator
  // }
  //
  // isProject(entity: any): entity is AppProject {
  //   return entity.type === 'project';
  // }
  //
  // isUser(entity: any): entity is AppUser {
  //   return entity.type === 'user';
  // }

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
  // compareOriginalOrder = () => 0;
}
