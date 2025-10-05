import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppRevision, RadarRevision} from '../models/revision';
import {DEFAULT_PAGE_SIZE} from '../../../consts/entities';

@Injectable({ providedIn: 'root' })
export class RevisionService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/revisions';

  total = 0;

  private toAppModel(entity: RadarRevision): AppRevision {
    return { ...entity, _name: entity.entity, _search: `${entity.author} ${entity.changes} ${entity.revisionType}` };
  }

  getWithQuery(queryParams?: Params | string): Observable<AppRevision[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarRevision[]>(this.resourceUrl, {
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

  // convertFilterParamsToHttpParams(
  //   params: HttpParams,
  //   queryParams?: Params
  // ) {
  //   if (queryParams?.['toDate'] && queryParams['toDate'] !== '') {
  //     params = params.append('toDate', queryParams['toDate']);
  //   }
  //   if (queryParams?.['fromDate'] && queryParams['fromDate'] !== '') {
  //     params = params.append('fromDate', queryParams['fromDate']);
  //   }
  //   return params;
  // }
}
