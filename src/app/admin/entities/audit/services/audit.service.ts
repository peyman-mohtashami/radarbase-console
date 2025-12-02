import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

import {AppAudit, RadarAudit} from "../models/audit";
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {DEFAULT_PAGE_SIZE} from "../../../consts/default-table-values";

@Injectable({ providedIn: 'root' })
export class AuditService {
  private http = inject(HttpClient);
  private readonly resourceUrl = 'management/audits';
  total = 0;

  private toAppModel(entity: RadarAudit): AppAudit {
    return {
      ...entity,
      id: entity.timestamp,
      _name: entity.timestamp,
      _search: `${entity.timestamp} ${entity.principal} ${entity.type}`
    };
  }

  // private toRadarModel(entity: AppAudit): RadarAudit {
  //   return { ...entity };
  // }

  getWithQuery(queryParams?: Params | string): Observable<AppAudit[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarAudit[]>(this.resourceUrl, {
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
    params = this.convertFilterParamsToHttpParams(params, queryParams);
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }

  convertFilterParamsToHttpParams(
    params: HttpParams,
    queryParams?: Params
  ) {
    if (queryParams?.['toDate'] && queryParams['toDate'] !== '') {
      params = params.append('toDate', queryParams['toDate']);
    }
    if (queryParams?.['fromDate'] && queryParams['fromDate'] !== '') {
      params = params.append('fromDate', queryParams['fromDate']);
    }
    return params;
  }
}
