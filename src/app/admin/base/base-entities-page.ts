import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, combineLatest, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, skip, switchMap, takeUntil,} from 'rxjs/operators';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SelectionModel} from '@angular/cdk/collections';

import {DialogMode} from '../enums/dialog';
import {BaseDialogComponent} from './base-dialog.component';
import {FilterItem, TableElement,
  // TableType
} from "../models/table.model";
import {IBaseEntityService} from '../services/base-entity.service.interface';
import {DetailType} from '../enums/detail-type';
import {ENTITIES} from '../consts/entities';
import {RbSort} from "../directives/table-query-reflector.directive";
import {PageEvent} from "@angular/material/paginator";
import {FilterEvent} from "../components/common-entities-page/data-table-filter/data-table-filter.component";
import {ROLES} from "../enums/entities";
import {AppOrganization} from "../entities/organization/models/organization";
import {AppProject} from "../entities/project/models/project";
import {AppUser} from "../entities/user/models/user";

export abstract class BaseEntitiesPage<
  T extends { [key: string]: any },
  U extends BaseDialogComponent<T, U>
> {
  protected readonly ENTITIES = ENTITIES;
  // DialogComponent?: U

  // type: TableType = TableType.GET_ALL_FROM_STORE;

  DialogMode = DialogMode;

  DetailType = DetailType;

  loading = true;

  entities: T[]; // = this.activatedRoute.snapshot.data['entities']; //.filter((i: any) => !i['name'].startsWith("@DEL_") );
  filteredAndSortedEntities: T[];// = this.entities;
  entitiesToShow: any[] = []; //T[] = [];

  filters: FilterItem[] = [];

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

  filter$: BehaviorSubject<FilterEvent> = new BehaviorSubject<FilterEvent>(
    this.filters.reduce((map: { [key: string]: string | undefined }, obj) => {
      map[obj.name] = undefined;
      return map;
    }, {})
  );

  updateTrigger$ = new BehaviorSubject<string>('init');

  _destroy$: Subject<void> = new Subject<void>();

  isFilterOpened = true;

  expandedElement?: any | null; //T | null;

  selection = new SelectionModel<T>(true, []);

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

  gridView = false;

  protected readonly ROLES = ROLES;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    public entityService: IBaseEntityService<T>
  ) {
    this.entities = this.activatedRoute.snapshot.data['entities']; //.filter((i: any) => !i['name'].startsWith("@DEL_") );
    // entities: T[] = this.activatedRoute.snapshot.data['entities']; //.filter((i: any) => !i['name'].startsWith("@DEL_") );
    this.filteredAndSortedEntities = this.entities;
  }

  init(): void {
    // if (this.type === TableType.GET_ALL_FROM_STORE) {
    //   this.subscribeToStoreEntities();
    // }
    // if (this.type === TableType.GET_WITH_QUERY) {
      //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
      this.filteredAndSortedEntities = this.entities;
      this.entitiesToShow = this.filteredAndSortedEntities;
      this.total = this.getTotal();
      // console.log('Class: BaseEntitiesTwoPage, Function: init, Line 100 ' , );
      this.loading = false;
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
  ): Observable<T[]> {
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
    console.log('Class: BaseEntitiesPage, Function: onAction, Line 195 ' , );
    console.log(entity);
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

  openDialog(mode: DialogMode, entity?: T, extra?: any) {
    const dialogRef = this.getDialogRef(mode, entity, extra);
    this.applyStateChangesToUrlQueryParams({
      [mode]: entity ? this.getEntityName(entity) : 'new',
    });

    const dialogActionSubscription =
      dialogRef.componentInstance.actionTriggered.subscribe({
        next: (value: { action: DialogMode | string; entity: T }) => {
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

  onSuccess(mode: string, dialogRef: MatDialogRef<U>, entity: T): void {
    // if (this.type === TableType.GET_WITH_QUERY || this.type === TableType.GET_ALL) {
      this.updateTrigger$.next(entity['id']?.toString() || '0');
    // }
    this.applyStateChangesToUrlQueryParams({ [mode]: null });
    dialogRef.close();
    console.log('Class: BaseEntitiesPage, Function: onSuccess, Line 253 ' , );
    this.updated = entity['id'];
    setTimeout(() => {
      this.updated = undefined;
    }, 1000);
  }

  onError(error: HttpErrorResponse, dialogRef: MatDialogRef<U>) {
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

  // trackId(index: number, item: T): string {
  //   return `${item['id']}`;
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    // const numRows = this.dataSource.data.length;
    const numRows = this.entities.length; //this.dataSource.data.length;
    return numSelected === numRows;
  }

  // masterToggle() {
  //   if (this.isAllSelected()) {
  //     this.selection.clear();
  //     return;
  //   }
  //   // this.selection.select(...this.dataSource.data);
  //   this.selection.select(...this.entities); //this.dataSource.data);
  // }

  // checkboxLabel(row?: T): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row['position'] + 1
  //   }`;
  // }
  //
  // subscribeToStoreEntities(): void {
  //   this.entityService.entities$?.pipe(
  //     takeUntil(this._destroy$),
  //     skip(1)
  //   ).subscribe({
  //       next: (value) => {
  //         this.entities = value;
  //         this.filteredAndSortedEntities = this.entities;
  //         //! this.filteredAndSortedEntities = this.entities.filter((i: any) => !i['name'].startsWith("@DEL_") );
  //         this.applyFilter();
  //         this.applySort();
  //         this.applyPage();
  //         console.log('Class: BaseEntitiesTwoPage, Function: next, Line 312 ' , );
  //         this.loading = false;
  //       },
  //     });
  // }

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
    // if (this.type === TableType.GET_WITH_QUERY) {
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

  getTotal(): number {
    return this.entityService.getTotal() || 0;
    // throw new Error('BaseListPageComponent "getTotal" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDialogRef(mode: DialogMode, entity?: T, extra?: any): MatDialogRef<U> {
    throw new Error(
      'BaseListPageComponent "getDialogRef" method not implemented'
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getWithQuery(params: Params): Observable<T[]> {
    // throw new Error(
    //   'BaseListPageComponent "getWithQuery" method not implemented'
    // );
    return this.entityService.getWithQuery(params);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getByKey(entityName: string): Observable<T> {
    return this.entityService.getByKey(entityName);
    // throw new Error('BaseListPageComponent "getByKey" method not implemented');
    // return this.entityService.getByKey(entityName);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(entity: T): Observable<T> {
    return this.entityService.update(entity);
    // throw new Error('BaseListPageComponent "update" method not implemented');
    // return this.entityService.update(entity);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  add(entity: T): Observable<T> {
    console.log(555);
    return this.entityService.add(entity);
    // throw new Error('BaseListPageComponent "add" method not implemented');
    // return this.entityService.add(entity)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete(entity: T): Observable<string | number> {
    // if (this.type === TableType.GET_ALL_FROM_STORE) {
    //   return this.entityService.delete(`${entity['name']},${entity['id']}`);
    // }
    return this.entityService.delete(entity['name']);
    // throw new Error('BaseListPageComponent "delete" method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getEntityName(entity: T): string {
    return entity['name'];
    // throw new Error(
    //   'BaseListPageComponent "getEntityName" method not implemented'
    // );
  }

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
}
