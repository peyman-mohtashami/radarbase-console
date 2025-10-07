import {Directive, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DialogMode} from "../enums/dialog";
import {PageEvent} from "@angular/material/paginator";

export type RbSortOrder = 'asc' | 'desc' | '';

export interface RbSort {
  sortField: string;
  sortOrder: RbSortOrder;
}

export interface RbPageSortEvent {
  page: PageEvent;
  sort: RbSort;
}

export interface DialogQuery {
  mode: DialogMode;
  id?: string;
}

@Directive({
  selector: '[rbTableQueryReflector]',
})
export class TableQueryReflectorDirective implements OnInit {
  _page?: PageEvent;
  @Input() set page(value: PageEvent) {
    this._page = value;
    this.applyStateChangesToUrlQueryParams({
      pageIndex: value.pageIndex,
      pageSize: value.pageSize,
      sortField: this._sort?.sortField,
      sortOrder: this._sort?.sortOrder
    });
  }

  _sort?: RbSort;
  @Input() set sort(value: RbSort) {
    this._sort = value;
    this.applyStateChangesToUrlQueryParams({
      ...value,
      pageIndex: this._page?.pageIndex,
      pageSize: this._page?.pageSize
    })
  }

  @Input() defaultPageSize = 20;
  @Input() defaultSort = {sortField: 'id', sortOrder: 'desc'};

  // @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>(); //!
  // @Output() sortChanged: EventEmitter<RbSort> = new EventEmitter<RbSort>(); //!

  @Output() activeQueryParams: EventEmitter<RbPageSortEvent> = new EventEmitter<RbPageSortEvent>();

  @Output() dialogQueryParams: EventEmitter<DialogQuery> = new EventEmitter<DialogQuery>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.listenToStateChangeEvents();
    this.checkActiveQuery();
  }

  private checkActiveQuery(): void {
    this.checkActiveSortQuery();
    this.checkActivePageQuery();
    if (this._page && this._sort) {
      this.activeQueryParams.emit({page: this._page, sort: this._sort});
    }
    // this.checkActiveDialogQuery();
  }

  // private checkActiveDialogQuery(): void {
  //   console.log('Class: TableQueryReflectorDirective, Function: checkActiveDialogQuery, Line 81 ' , );
  //   const queryParams = this.activatedRoute.snapshot.queryParams;
  //   if (queryParams[DialogMode.ADD] === 'new') {
  //     return this.dialogQueryParams.emit({ mode: DialogMode.ADD });
  //   }
  //   if (queryParams[DialogMode.EDIT]) {
  //     return this.dialogQueryParams.emit({
  //       mode: DialogMode.EDIT,
  //       id: queryParams[DialogMode.EDIT],
  //     });
  //   }
  //   if (queryParams[DialogMode.DELETE]) {
  //     return this.dialogQueryParams.emit({
  //       mode: DialogMode.DELETE,
  //       id: queryParams[DialogMode.DELETE],
  //     });
  //   }
  //   if (queryParams[DialogMode.VIEW]) {
  //     return this.dialogQueryParams.emit({
  //       mode: DialogMode.VIEW,
  //       id: queryParams[DialogMode.VIEW],
  //     });
  //   }
  // }

  private checkActivePageQuery(): void {
    const {pageSize, pageIndex} = this.activatedRoute.snapshot.queryParams;
    this._page = {pageIndex: +(pageIndex ?? 0), pageSize: +(pageSize ?? this.defaultPageSize), length: 0};
  }

  private checkActiveSortQuery(): void {
    const {sortField, sortOrder} = this.activatedRoute.snapshot.queryParams;
    this._sort = {
      sortField: sortField ?? this.defaultSort.sortField,
      sortOrder: sortOrder ?? this.defaultSort.sortOrder
    };
  }

  // private listenToStateChangeEvents(): void {
  //   this.sort?.sortChange.subscribe((sort: RbSort) => {
  //     if (this.paginator) {
  //       this.paginator.pageIndex = 0;
  //       this.paginator.page.next({
  //         pageIndex: 0,
  //         pageSize: this.paginator.pageSize || this.defaultPageSize,
  //         length: this.paginator.length,
  //       });
  //     }
  //     this.changed.emit({ sort });
  //     if (sort.active && sort.direction) {
  //       this.applyStateChangesToUrlQueryParams({
  //         sortField: sort.active,
  //         sortOrder: sort.direction,
  //         //pageIndex: 0,
  //       });
  //     } else {
  //       const sortable: MatSortable = {
  //         id: this.defaultSort.sortField,
  //         start: this.defaultSort.sortOrder === 'desc' ? 'desc' : 'asc',
  //         disableClear: true,
  //       };
  //       this.sort?.sort(sortable);
  //       this.applyStateChangesToUrlQueryParams({
  //         sortField: this.defaultSort.sortField,
  //         sortOrder: this.defaultSort.sortOrder,
  //         pageIndex: 0,
  //       });
  //     }
  //   });
  //
  //   this.paginator?.page.subscribe((pageEvent: RbPageEvent) => {
  //     this.changed.emit({ pageEvent });
  //     this.applyStateChangesToUrlQueryParams({
  //       pageIndex: pageEvent.pageIndex,
  //       pageSize: pageEvent.pageSize,
  //     });
  //   });
  // }

  private applyStateChangesToUrlQueryParams(queryParams: Params): void {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      fragment: this.activatedRoute.snapshot.fragment ?? undefined,
    }).then();
  }
}
