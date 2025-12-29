import {inject, Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';

import {AppAudit, RadarAudit} from "../models/audit";
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {AuditConfigService} from './audit-config.service';

@Injectable({providedIn: 'root'})
export class AuditService extends BaseEntityService<AppAudit, RadarAudit> {
  override configService = inject(AuditConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}management/audits`;
  }

  override toAppModel(entity: RadarAudit): AppAudit {
    return {
      ...entity,
      _name: entity.timestamp,
      _search: `${entity.timestamp} ${entity.principal} ${entity.type}`
    };
  }

  override getWithQuery(queryParams: Params): Observable<AppAudit[]> {
    const {params} = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarAudit[]>(this.getResourceUrl(), {
      params,
      observe: 'response',
    }).pipe(
      tap(
        (res) => {
          this.total.set(+(
            res.headers.get('x-total-count') ||
            res.body?.length.toString() ||
            '0'
          ))
        }
      ),
      map((res) => {
        return (res.body || []).map((entity) => this.toAppModel(entity));
      })
    );
  }

  override convertFilterParamsToHttpParams(
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
