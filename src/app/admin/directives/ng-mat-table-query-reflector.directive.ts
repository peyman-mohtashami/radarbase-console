import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DialogMode } from '../../admin/enums/dialog';

export interface PageSortEvent {
  pageEvent?: PageEvent;
  sort?: Sort;
}

export interface DialogQuery {
  mode: DialogMode;
  id?: string;
}

@Directive({
    selector: '[rbNgMatTableQueryReflector]',
})
export class NgMatTableQueryReflectorDirective implements OnInit {
  @Input() paginator?: MatPaginator;
  @Input() sort?: MatSort;
  @Input() defaultPageSize = 50;
  @Input() defaultSort = { sortField: 'id', sortOrder: 'desc' };
  @Output() changed: EventEmitter<PageSortEvent> =
    new EventEmitter<PageSortEvent>();
  @Output() dialogQueryParams: EventEmitter<DialogQuery> =
    new EventEmitter<DialogQuery>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.listenToStateChangeEvents();
    this.checkActiveQuery();
  }

  private checkActiveQuery(): void {
    this.checkActiveSortQuery();
    this.checkActivePageQuery();
    this.checkActiveDialogQuery();
  }

  private checkActiveDialogQuery(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    if (queryParams[DialogMode.ADD] === 'new') {
      return this.dialogQueryParams.emit({ mode: DialogMode.ADD });
    }
    if (queryParams[DialogMode.EDIT]) {
      return this.dialogQueryParams.emit({
        mode: DialogMode.EDIT,
        id: queryParams[DialogMode.EDIT],
      });
    }
    if (queryParams[DialogMode.DELETE]) {
      return this.dialogQueryParams.emit({
        mode: DialogMode.DELETE,
        id: queryParams[DialogMode.DELETE],
      });
    }
    if (queryParams[DialogMode.VIEW]) {
      return this.dialogQueryParams.emit({
        mode: DialogMode.VIEW,
        id: queryParams[DialogMode.VIEW],
      });
    }
  }

  private checkActivePageQuery(): void {
    const { pageSize, pageIndex } = this.activatedRoute.snapshot.queryParams;
    if (this.paginator) {
      this.paginator.pageIndex = pageIndex || 0;
      this.paginator.pageSize = pageSize || this.defaultPageSize;
      const pageEvent: PageEvent = {
        pageIndex: pageIndex || 0,
        pageSize: pageSize || this.defaultPageSize,
        previousPageIndex: 0,
        length: 0,
      };
      this.changed.emit({ pageEvent });
    }
  }

  private checkActiveSortQuery(): void {
    const { sortField, sortOrder } = this.activatedRoute.snapshot.queryParams;
    const sortable: MatSortable = {
      id: sortField || this.defaultSort.sortField,
      start: sortOrder || this.defaultSort.sortOrder,
      disableClear: true,
    };
    this.sort?.sort(sortable);
  }

  private listenToStateChangeEvents(): void {
    this.sort?.sortChange.subscribe((sort: Sort) => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
        this.paginator.page.next({
          pageIndex: 0,
          pageSize: this.paginator.pageSize || this.defaultPageSize,
          length: this.paginator.length,
        });
      }
      this.changed.emit({ sort });
      if (sort.active && sort.direction) {
        this.applyStateChangesToUrlQueryParams({
          sortField: sort.active,
          sortOrder: sort.direction,
          //pageIndex: 0,
        });
      } else {
        const sortable: MatSortable = {
          id: this.defaultSort.sortField,
          start: this.defaultSort.sortOrder === 'desc' ? 'desc' : 'asc',
          disableClear: true,
        };
        this.sort?.sort(sortable);
        this.applyStateChangesToUrlQueryParams({
          sortField: this.defaultSort.sortField,
          sortOrder: this.defaultSort.sortOrder,
          pageIndex: 0,
        });
      }
    });

    this.paginator?.page.subscribe((pageEvent: PageEvent) => {
      this.changed.emit({ pageEvent });
      this.applyStateChangesToUrlQueryParams({
        pageIndex: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize,
      });
    });
  }

  private applyStateChangesToUrlQueryParams(queryParams: Params): void {
    this.router
      .navigate([], {
        replaceUrl: true,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      })
      .then();
  }
}
