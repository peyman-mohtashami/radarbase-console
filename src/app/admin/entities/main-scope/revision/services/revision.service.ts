import {inject, Injectable} from '@angular/core';

import {Params} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppRevision, RadarRevision} from '../models/revision';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {RevisionConfigService} from './revision-config.service';

@Injectable({ providedIn: 'root' })
export class RevisionService extends BaseEntityService<AppRevision, RadarRevision> {
  override configService = inject(RevisionConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/revisions`;
  }

  override toAppModel(entity: RadarRevision): AppRevision {
    return { ...entity, _name: entity.entity, _search: `${entity.author} ${entity.changes} ${entity.revisionType}` };
  }

  override getWithQuery(queryParams: Params): Observable<AppRevision[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarRevision[]>(this.getResourceUrl(), {
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
}
