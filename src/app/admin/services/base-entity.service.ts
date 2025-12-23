import {inject, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {RbSort} from '../models/table.model';
import {DEFAULT_PAGE_SIZE} from '../consts/default-table-values';
import {AppOrganization} from '../entities/organization/models/organization';

export class BaseEntityService<T extends {_name: string}, U> {
  protected http = inject(HttpClient);

  total = signal(0);

  CACHE_ENABLED = true;
  cache: T[] = [];
  protected cacheLoaded = false;

  toAppModel(entity: U): T {
    return entity as unknown as T;
  }

  toRadarModel(entity: T): U {
    return entity as unknown as U;
  }

  getWithQuery(queryParams?: Params): Observable<T[]> {
    const {
      pageIndex = 0,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'desc',
      ...filter
    } = queryParams ?? {};

    const process = (entities: T[]) => {
      const filteredEntities = this.getFilteredEntities(entities, filter);
      const sortedEntities = this.applySorting(filteredEntities, {sortField, sortOrder});
      return this.applyPagination(sortedEntities, {pageSize, pageIndex});
    };

    if (this.CACHE_ENABLED && this.cacheLoaded) {
      this.total.set(this.cache.length);
      return of(queryParams ? process(this.cache) : this.cache);
    }

    return this.http.get<U[]>(this.getResourceUrl()).pipe(
      map((entities) => this.customFilter(entities)),
      map((entities) => entities.map((entity) => this.toAppModel(entity))),
      tap((entities) => {
        this.cache = entities;
        this.cacheLoaded = true;
        this.total.set(entities.length);
      }),
      map((entities) => queryParams ? process(entities) : entities)
    );
  }

  customFilter(entities: U[]) {
    return entities;
  }


  getResourceUrl(): string {
    throw new Error('Method not implemented.');
  }

  protected getFilteredEntities(entities: T[], filter: { [p: string]: any }): T[] {
    let filteredEntities = [...entities];

    Object.entries(filter).forEach(([key, value]) => {
      if (!value) return;

      filteredEntities = filteredEntities.filter((entity: any) =>
        entity[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }

  protected applySorting(entities: T[], sort: RbSort): T[] {
    const {sortField, sortOrder} = sort;
    const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})
    return entities.sort((a: any, b: any) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  protected applyPagination(entities: T[], page: { pageSize: number; pageIndex: number }): T[] {
    const {pageSize, pageIndex} = page;
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, startIndex + pageSize);
  }

  getEntity(key: number | string): T {
    const entity = this.cache.find(item => item._name === key);
    if (!entity) throw new Error(`Entity with id ${key} not found`);
    return entity;
  }

  getByKey(key: number | string): Observable<T> {
    return this.http.get<U>(`${this.getResourceUrl()}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(entity: T): Observable<T> {
    return this.http.post<U>(this.getResourceUrl(), this.toRadarModel(entity))
      .pipe(
        map((entity) => this.toAppModel(entity)),
        tap(() => {
          this.total.set(this.total() + 1);
          this.cacheLoaded = false;
        })
      );
  }

  update(update: T): Observable<T> {
    return this.http.put<U>(this.getResourceUrl(), this.toRadarModel(update))
      .pipe(
        map((entity) => this.toAppModel(entity)),
        tap(() => {
          this.cacheLoaded = false;
        })
      );
  }

  delete(entity: T): Observable<void> {
    return this.http.delete<void>(`${this.getResourceUrl()}/${entity._name}`).pipe(
      tap(() => {
        this.cacheLoaded = false;
      })
    );
  }

  protected convertParamsToHttpParams(queryParams: Params): {
    params: HttpParams;
    parentEntityName: string;
  } {
    let params = new HttpParams();
    params = params.append(
      'size',
      queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
    );
    params = params.append('page', queryParams?.['pageIndex'] || '0');
    if (
      queryParams?.['sortField'] &&
      queryParams['sortField'] !== '' &&
      queryParams?.['sortOrder'] &&
      queryParams['sortOrder'] !== ''
    ) {
      params = params.append(
        'sort',
        queryParams['sortField'] + ',' + queryParams['sortOrder']
      );
    } else {
      params = params.append('sort', 'id' + ',' + 'desc');
    }
    params = this.convertFilterParamsToHttpParams(params, queryParams);
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }

  convertFilterParamsToHttpParams(params: HttpParams, queryParams?: Params): HttpParams {
    return params;
  }
}
