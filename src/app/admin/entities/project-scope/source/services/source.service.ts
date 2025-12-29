import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';

import {map, tap} from 'rxjs/operators';
import {AppSource, RadarSource} from "../models/source";
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {SourceConfigService} from './source-config.service';

@Injectable({ providedIn: 'root' })
export class SourceService extends BaseEntityService<AppSource, RadarSource> {
  override configService = inject(SourceConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/sources`;
  }

  override toAppModel(entity: RadarSource): AppSource {
    return { ...entity, _name: entity.sourceName, _search: `${entity.sourceName} ${entity.sourceId} ${entity.expectedSourceName}` };
  }

  override toRadarModel(entity: AppSource): RadarSource {
    return { ...entity, assigned: !!entity.assigned, };
  }

  override getWithQuery(queryParams: Params | undefined, projectName?: string): Observable<AppSource[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSource[]>(`${environment.apiUrl}api/projects/${projectName}/sources`, {
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
        const entities = (res.body || []).map((entity) => this.toAppModel(entity));
        this.cache = entities;
        return entities;
      })
    );
  }
}
