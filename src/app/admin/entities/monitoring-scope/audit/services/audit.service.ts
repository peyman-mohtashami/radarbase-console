import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Params} from '@angular/router';

import {AppAudit, AuditDto} from "../models/audit";
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {AuditConfigService} from './audit-config.service';
import {RevisionDto} from '../../../revision/models/revision';

@Injectable({providedIn: 'root'})
export class AuditService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}api/audits`;

  getWithQuery(queryParams: Params) {
    // const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<AuditDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  // override toAppModel(entity: AuditDto): AppAudit {
  //   return {
  //     ...entity,
  //     _name: entity.timestamp,
  //     _search: `${entity.timestamp} ${entity.principal} ${entity.type}`
  //   };
  // }
  //
  // override getWithQuery(queryParams: Params): Observable<AppAudit[]> {
  //   const {params} = this.convertParamsToHttpParams(queryParams as Params);
  //   return this.http.get<AuditDto[]>(this.getResourceUrl(), {
  //     params,
  //     observe: 'response',
  //   }).pipe(
  //     tap(
  //       (res) => {
  //         this.total.set(+(
  //           res.headers.get('x-total-count') ||
  //           res.body?.length.toString() ||
  //           '0'
  //         ))
  //       }
  //     ),
  //     map((res) => {
  //       return (res.body || []).map((entity) => this.toAppModel(entity));
  //     })
  //   );
  // }
  //
  // override convertFilterParamsToHttpParams(
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
