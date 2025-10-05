import {inject, Injectable} from '@angular/core';
import {AppSourceData, RadarSourceData} from "../models/source-data";
import {Params} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DEFAULT_PAGE_SIZE} from '../../../consts/entities';

@Injectable({providedIn: 'root'})
export class SourceDataService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/source-data';
  total = 0;

  private toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      _name: entity.sourceDataName
    };
  }

  private toRadarModel(entity: AppSourceData): RadarSourceData {
    return { ...entity };
  }

  getWithQuery(queryParams?: Params | string): Observable<AppSourceData[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSourceData[]>(this.resourceUrl, {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          this.total = +(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          )
        }
      ),
      map((res) => {
        return (res.body || []).map((entity) => this.toAppModel(entity));
      })
    );
  }

  add(entity: AppSourceData): Observable<AppSourceData> {
    return this.http.post<RadarSourceData>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppSourceData> {
    return this.http.get<RadarSourceData>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSourceData): Observable<AppSourceData> {
    return this.http.put<RadarSourceData>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppSourceData): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${encodeURIComponent(entity._name)}`
    );
  }

  private convertParamsToHttpParams(queryParams: Params): {
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
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }
}
