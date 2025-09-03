import {Injectable, signal, WritableSignal} from '@angular/core';
import { Params } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { QueryParams } from '@ngrx/data';
import { BehaviorSubject, Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {IBaseEntityService} from './base-entity.service.interface';
import {DialogMode} from '../enums/dialog';
// import { EntityActionOptions } from "@ngrx/data/src/actions/entity-action";

export const DEFAULT_PAGE_SIZE = 50;

@Injectable()
export abstract class BaseEntityService<RadarModel, AppModel>
  implements IBaseEntityService<AppModel> {

  resourceUrl = '';
  protected total = 0;

  updateTrigger$: BehaviorSubject<string> = new BehaviorSubject<string>('init');
  updated: WritableSignal<string | undefined> = signal(undefined);

  protected constructor(public http: HttpClient) {}

  publish?: ((configs: AppModel[]) => Observable<AppModel[]>) | undefined;

  openDialog(data: {mode: DialogMode, entity?: any, data?: any, extra?: any}): void {
      throw new Error('Method not implemented.');
  }

  entities$?: Observable<AppModel[]> | Store<AppModel[]>;

  getTotal(): number {
    return this.total;
  }

  getAll(): Observable<AppModel[]> {
    return this.http
      .get<RadarModel[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
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

  add(entity: AppModel): Observable<AppModel> {
    return this.http
      .post<RadarModel>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppModel> {
    console.log(this.resourceUrl);
    return this.http
      .get<RadarModel>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppModel): Observable<AppModel> {
    return this.http
      .put<RadarModel>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(key: number | string): Observable<number | string> {
    console.log('Class: BaseEntityService, Function: delete, Line 87 key' , key);
    console.log('Class: BaseEntityService, Function: delete, Line 88 `${this.resourceUrl}/${encodeURIComponent(key)}`' , `${this.resourceUrl}/${encodeURIComponent(key)}`);
    // return this.http.delete<number | string>(
    //   `${this.resourceUrl}/${encodeURIComponent(key)}`
    // );
    return this.http.delete<number | string>(
      `${this.resourceUrl}/${key}`
    );
  }

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

  //TODO should remove
  getResourceUrl(parentEntityName?: string | string[]): string {
    return this.resourceUrl;
  }

  toAppModel(entity: RadarModel): AppModel {
    return { ...entity } as unknown as AppModel;
  }
  toRadarModel(entity: AppModel): RadarModel {
    return { ...entity } as unknown as RadarModel;
  }
}
