import {Injectable, signal} from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
// import { QueryParams } from '@ngrx/data';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
// import { Store } from '@ngrx/store';
import { IBaseEntityService } from './base-entity.service.interface';
import {AppBaseModel} from '../../shared/models/base.model';
import {QueryParams} from '@ngrx/data';
// import { EntityActionOptions } from "@ngrx/data/src/actions/entity-action";

export const DEFAULT_PAGE_SIZE = 50;

@Injectable()
export abstract class EntityService<RadarModel, AppModel extends AppBaseModel>
  implements IBaseEntityService<AppModel>
{
  protected readonly _entities = signal<AppModel[]>([]);
  // protected readonly _loading = signal(false);
  // protected readonly _error = signal<string | null>(null);

  readonly entities = this._entities.asReadonly();
  // readonly loading = this._loading.asReadonly();
  // readonly error = this._error.asReadonly();

  protected constructor(protected http: HttpClient, private endpoint: string) {}

  /** Fetch all entities once (cached) */
  getAll(force = false): Observable<AppModel[]> {
    if (!force && this._entities().length > 0) {
      return of(this._entities());
    }

    // this._loading.set(true);
    // this._error.set(null);

    return this.http.get<RadarModel[]>(this.endpoint).pipe(
      tap(items => {
        this._entities.set(items.map(i => this.toAppModel(i) as AppModel));
        // this._loading.set(false);
      }),
      map(items => items.map(i => this.toAppModel(i) as AppModel)),
      // catchError(err => {
      //   this._loading.set(false);
      //   this._error.set(`Failed to load from ${this.endpoint}`);
      //   return of([] as AppModel[]);
      // })
    )
      // .subscribe();
  }

  // getAll(): Observable<AppModel[]> {
  //   return this.http
  //     .get<RadarModel[]>(this.resourceUrl)
  //     .pipe(
  //       map((entities) =>
  //         entities.map((entity) => this.toAppModel(entity))
  //       )
  //     );
  // }


  /** Add entity */
  add(entity: AppModel): Observable<AppModel> {
    return this.http.post<RadarModel>(this.endpoint, this.toRadarModel(entity)).pipe(
      tap(() => {
        this._entities.update(list => [...list, entity]);
      }),
      map(entity => this.toAppModel(entity))
      // catchError(err => {
      //   this._error.set(`Failed to add to ${this.endpoint}`);
      //   return of(null);
      // })
    )
      //.subscribe();
  }

  // add(entity: AppModel): Observable<AppModel> {
  //   return this.http
  //     .post<RadarModel>(this.resourceUrl, this.toRadarModel(entity))
  //     .pipe(map((entity) => this.toAppModel(entity)));
  // }

  /** Update entity */
  update(entity: AppModel) {
    // const prev = this._entities();
    // this._entities.update(list =>
    //   list.map(item => item.id === entity.id ? entity : item)
    // );

    return this.http.put<RadarModel>(this.endpoint, this.toRadarModel(entity)).pipe(
      tap(() => {
        this._entities.update(list =>
          list.map(item => item.id === entity.id ? entity : item)
        )
      }),
      map((entity) => this.toAppModel(entity)),
      // catchError(err => {
      //   this._error.set(`Failed to update ${this.endpoint}`);
      //   this._entities.set(prev); // rollback
      //   return of(null);
      // })
    )
      // .subscribe();
  }

  // update(update: AppModel): Observable<AppModel> {
  //   return this.http
  //     .put<RadarModel>(this.resourceUrl, this.toRadarModel(update))
  //     .pipe(map((entity) => this.toAppModel(entity)));
  // }

  /** Delete entity */
  delete(key: number | string): Observable<number | string> {
    // const prev = this._entities();
    // this._entities.update(list => list.filter(item => item.id !== key));

    return this.http.delete<number | string>(`${this.resourceUrl}/${encodeURIComponent(key)}`).pipe(
      tap(() => {
        this._entities.update(list => list.filter(item => item.id !== key));
      }),
      // catchError(err => {
      //   this._error.set(`Failed to delete from ${this.endpoint}`);
      //   this._entities.set(prev); // rollback
      //   return of(null);
      // })
    )
      // .subscribe();
  }

  // delete(key: number | string): Observable<number | string> {
  //   console.log('Class: BaseEntityService, Function: delete, Line 87 key' , key);
  //   console.log('Class: BaseEntityService, Function: delete, Line 88 `${this.resourceUrl}/${encodeURIComponent(key)}`' , `${this.resourceUrl}/${encodeURIComponent(key)}`);
  //   return this.http.delete<number | string>(
  //     `${this.resourceUrl}/${encodeURIComponent(key)}`
  //   );
  // }


  public resourceUrl = '';
  // public entities = computed(() => this._entities());
  //
  // private _entities = signal<AppModel[] | undefined>(undefined);
  protected total = 0;
  //
  // protected constructor(public http: HttpClient) {}
  //
  // // entities$?: Observable<AppModel[]> | Store<AppModel[]>;
  //
  // loadAll() {
  //   if (this._entities()) return; // already cached
  //   this.http.get<RadarModel[]>(this.resourceUrl)
  //     .subscribe(entities => this._entities.set(entities.map(e => this.toAppModel(e)))); // this._entities.set(orgs));
  // }
  //
  // add(org: Organization) {
  //   return this.http
  //     .post<RadarModel>(this.resourceUrl, this.toRadarModel(entity))
  //     .pipe(map((entity) => this.toAppModel(entity)));
  //   this._organizations.update(list => [...list, org]);
  // }
  //
  // update(org: Organization) {
  //   this._organizations.update(list =>
  //     list.map(o => o.id === org.id ? org : o)
  //   );
  // }
  //
  // delete(id: string) {
  //   this._organizations.update(list =>
  //     list.filter(o => o.id !== id)
  //   );
  // }

  getTotal(): number {
    return this.total;
  }


  getWithQuery(queryParams?: QueryParams | string): Observable<AppModel[]> {
    console.log("BaseEntityService getWithQuery")
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return (
      this.http
        // .get<DTO[]>(this.getResourceUrl(parentEntityName), {
        .get<RadarModel[]>(this.resourceUrl, {
          params,
          observe: 'response',
        })
        .pipe(
          tap(
            (res) =>
              (this.total = +(
                res.headers.get('x-total-count') ||
                res.body?.length.toString() ||
                '0'
              ))
          ),
          map((res) => {
            console.log("BaseEntityService getWithQuery", res.body)
            return (res.body || []).map((entity) =>
              this.toAppModel(entity)
            );
          })
        )
    );
  }
  //
  //
  //
  getByKey(key: number | string): Observable<AppModel> {
    console.log(this.resourceUrl);
    return this.http
      .get<RadarModel>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }
  //
  //
  //
  //
  //
  convertParamsToHttpParams(queryParams: Params): {
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

  convertFilterParamsToHttpParams(params: HttpParams, queryParams?: Params) {
    return params;
  }
  //
  // //TODO should remove
  // // getResourceUrl(parentEntityName?: string | string[]): string {
  // //   return this.resourceUrl;
  // // }

  toAppModel(entity: RadarModel): AppModel {
    return { ...entity } as unknown as AppModel;
  }
  toRadarModel(entity: AppModel): RadarModel {
    return { ...entity } as unknown as RadarModel;
  }
}
