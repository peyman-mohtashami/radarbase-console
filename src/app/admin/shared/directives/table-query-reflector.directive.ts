import {Directive, effect, EventEmitter, inject, input, OnInit, Output, signal} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {PageEvent} from "@angular/material/paginator";
import {DialogQuery, RbPageSortEvent, RbSort} from "../models/table.model";
import {DEFAULT_PAGE_SIZE} from '../consts/default-table-values';

@Directive({
  selector: '[appTableQueryReflector]',
})
export class TableQueryReflectorDirective implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  page = input<PageEvent>({pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0, length: 0});
  sort= input<RbSort>({sortField: 'id', sortOrder: 'desc'});

  private _page = signal<PageEvent>({pageSize: DEFAULT_PAGE_SIZE, pageIndex: 0, length: 0});
  private _sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});

  @Output() activeQueryParams = new EventEmitter<RbPageSortEvent>();

  @Output() dialogQueryParams = new EventEmitter<DialogQuery>();

  constructor() {
    effect(() => {
      const sort = this.sort();
      const page = this.page();
      this._sort.set(sort);
      this._page.set(page);
      this.updateUrlQueryParams({
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
        sortField: sort.sortField,
        sortOrder: sort.sortOrder
      });
    });
  }

  ngOnInit(): void {
    this.emitActiveQueryParams();
  }

  private emitActiveQueryParams(): void {
    this.checkActiveSortQuery();
    this.checkActivePageQuery();
    if (this._page() && this._sort()) {
      this.activeQueryParams.emit({page: this._page(), sort: this._sort()});
    }
  }

  private checkActivePageQuery(): void {
    const {pageSize, pageIndex} = this.activatedRoute.snapshot.queryParams;
    this._page.set({pageIndex: +(pageIndex ?? 0), pageSize: +(pageSize ?? this.page().pageSize), length: 0});
  }

  private checkActiveSortQuery(): void {
    const {sortField, sortOrder} = this.activatedRoute.snapshot.queryParams;
    this._sort.set({
      sortField: sortField ?? this.sort().sortField,
      sortOrder: sortOrder ?? this.sort().sortOrder
    });
  }

  private updateUrlQueryParams(queryParams: Params): void {
    this.router.navigate([], {
      replaceUrl: true,
      queryParams,
      queryParamsHandling: 'merge',
      // fragment: this.activatedRoute.snapshot.fragment ?? undefined,
    }).then();
  }
}
