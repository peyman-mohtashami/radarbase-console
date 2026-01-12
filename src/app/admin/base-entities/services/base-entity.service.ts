import {inject, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {RbSort} from '../models/table.model';
import {BaseConfigService} from './base-config.service';

export class BaseEntityService<T extends {_name: string}, U> {
  protected http = inject(HttpClient);
  protected configService!: BaseConfigService;

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
      pageSize = this.configService.getStoredPageSize(),
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

  protected getFilteredEntities(entities: T[], filter: Record<string, string>): T[] {
    let filteredEntities = [...entities];

    Object.entries(filter).forEach(([key, value]) => {
      if (!value) return;

      filteredEntities = filteredEntities.filter(entity =>
        (entity as Record<string, string>)[key]?.toString()?.toLowerCase()?.includes(value.toLowerCase())
      );
    });

    return filteredEntities;
  }

  protected applySorting(entities: T[], sort: RbSort): T[] {
    const {sortField, sortOrder} = sort;
    const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'})
    return entities.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      const sorted = collator.compare(a[sortField]?.toString() ?? '', b[sortField]?.toString() ?? '');
      return sortOrder === 'asc' ? sorted : -1 * sorted;
    })
  }

  protected applyPagination(entities: T[], page: { pageSize: number; pageIndex: number }): T[] {
    const {pageSize, pageIndex} = page;
    const startIndex = pageSize * pageIndex;
    return entities.slice(startIndex, (+startIndex) + (+pageSize));
  }

  getEntity(key: number | string): T {
    const entity = this.cache.find(item => item._name === key);
    if (!entity) throw new Error(`Entity with id ${key} not found`);
    return entity;
  }

  getByKey(key: number | string): Observable<T> {
    const entity = this.cache.find(item => `${item._name}` === key);
    if (entity) return of(entity);
    return this.http.get<U>(`${this.getResourceUrl()}/${encodeURIComponent(key)}`)
      .pipe(
        map((entity) => this.toAppModel(entity)),
        tap((entity) => {
          this.cache = [entity];
        })
      );
  }

  add(entity: T): Observable<T> {
    return this.http.post<U>(this.getResourceUrl(), this.toRadarModel(entity))
      .pipe(
        map((entity) => this.toAppModel(entity)),
        tap(() => {
          this.cacheLoaded = false;
        })
      );
  }

  update(update: T): Observable<T> {
    return this.http.put<U>(this.getResourceUrl(), this.toRadarModel(update))
      .pipe(
        map((entity) => this.toAppModel(entity)),
        // tap(() => {
        //   this.cacheLoaded = false;
        // })
        tap((updated) => {
          this.upsertInCache(updated);
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

  clearCache() {
    this.cacheLoaded = false;
    this.cache = [];
  }

  protected convertParamsToHttpParams(params: Params): {
    params: HttpParams;
    parentEntityName: string;
  } {
    let httpParams = new HttpParams();
    httpParams = httpParams.append(
      'size',
      params?.['pageSize'] || this.configService.getStoredPageSize()
    );
    httpParams = httpParams.append('page', params?.['pageIndex'] || '0');
    if (
      params?.['sortField'] &&
      params['sortField'] !== '' &&
      params?.['sortOrder'] &&
      params['sortOrder'] !== ''
    ) {
      httpParams = httpParams.append(
        'sort',
        params['sortField'] + ',' + params['sortOrder']
      );
    } else {
      httpParams = httpParams.append('sort', 'id' + ',' + 'desc');
    }
    httpParams = this.convertFilterParamsToHttpParams(httpParams, params);
    return { params: httpParams, parentEntityName: params?.['parentEntityName'] };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  convertFilterParamsToHttpParams(httpParams: HttpParams, _params?: Params): HttpParams {
    return httpParams;
  }

  private upsertInCache(entity: T): void {
    const idx = this.cache.findIndex(e => `${e._name}` === `${entity._name}`);
    if (idx >= 0) {
      this.cache = [
        ...this.cache.slice(0, idx),
        entity,
        ...this.cache.slice(idx + 1),
      ];
    } else {
      this.cache = [...this.cache, entity];
    }

    this.cacheLoaded = true;
    this.total.set(this.cache.length);
  }

  // private removeFromCache(key: string | number): void {
  //   if (!this.CACHE_ENABLED) return;
  //
  //   const before = this.cache.length;
  //   this.cache = this.cache.filter(e => `${e._name}` !== `${key}`);
  //
  //   if (this.cacheLoaded && this.cache.length !== before) {
  //     this.total.set(this.cache.length);
  //   }
  // }
}
