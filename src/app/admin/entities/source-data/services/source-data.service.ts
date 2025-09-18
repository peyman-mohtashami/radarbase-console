import {Injectable} from '@angular/core';
import {DEFAULT_PAGE_SIZE} from '../../../services/base.entity.service';
import {AppSourceData, RadarSourceData} from "../models/source-data";
import {Params} from '@angular/router';
// import {DialogMode} from '../../../enums/dialog';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

// export interface DialogData { mode: DialogMode, entity?: AppSourceData, extra?: any }

@Injectable({providedIn: 'root'})
export class SourceDataService {
  resourceUrl = 'api/source-data';
  total = 0;

  constructor(private http: HttpClient) {}

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

  delete(key: number | string): Observable<number | string> {
    return this.http.delete<number | string>(
      `${this.resourceUrl}/${encodeURIComponent(key)}`
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
    params = this.convertFilterParamsToHttpParams(params);
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }

  private convertFilterParamsToHttpParams(params: HttpParams) {
    return params;
  }

  private toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName
    };
  }

  private toRadarModel(entity: AppSourceData): RadarSourceData {
    return { ...entity }; // as unknown as RadarSourceData;
  }
}
