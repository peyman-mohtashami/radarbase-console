import {Directive, EventEmitter, inject, input, Input, OnInit, Output} from '@angular/core';
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
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

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

  defaultPageSize = input<number>(20);
  defaultSort= input({sortField: 'id', sortOrder: 'desc'});

  @Output() activeQueryParams: EventEmitter<RbPageSortEvent> = new EventEmitter<RbPageSortEvent>();

  @Output() dialogQueryParams: EventEmitter<DialogQuery> = new EventEmitter<DialogQuery>();

  ngOnInit(): void {
    this.checkActiveQuery();
  }

  private checkActiveQuery(): void {
    this.checkActiveSortQuery();
    this.checkActivePageQuery();
    if (this._page && this._sort) {
      this.activeQueryParams.emit({page: this._page, sort: this._sort});
    }
  }

  private checkActivePageQuery(): void {
    const {pageSize, pageIndex} = this.activatedRoute.snapshot.queryParams;
    this._page = {pageIndex: +(pageIndex ?? 0), pageSize: +(pageSize ?? this.defaultPageSize()), length: 0};
  }

  private checkActiveSortQuery(): void {
    const {sortField, sortOrder} = this.activatedRoute.snapshot.queryParams;
    this._sort = {
      sortField: sortField ?? this.defaultSort().sortField,
      sortOrder: sortOrder ?? this.defaultSort().sortOrder
    };
  }

  private applyStateChangesToUrlQueryParams(queryParams: Params): void {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
      fragment: this.activatedRoute.snapshot.fragment ?? undefined,
    }).then();
  }
}
