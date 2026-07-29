import {inject, Injectable} from '@angular/core';

import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppRevision, RevisionDto} from '../models/revision';
import {BaseEntityService} from '../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../environments/environment';
import {RevisionConfigService} from './revision-config.service';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../../user/models/user';

@Injectable({ providedIn: 'root' })
export class RevisionService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}api/revisions`;

  getWithQuery(queryParams: Params) {
    // const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RevisionDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  // override toAppModel(entity: RevisionDto): AppRevision {
  //   return { ...entity, _name: entity.entity as string, _search: `${entity.author} ${entity.changes} ${entity.revisionType}` };
  // }
  //
  // override getWithQuery(queryParams: Params): Observable<AppRevision[]> {
  //   const { params } = this.convertParamsToHttpParams(queryParams as Params);
  //   return this.http.get<RevisionDto[]>(this.getResourceUrl(), {
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
}
