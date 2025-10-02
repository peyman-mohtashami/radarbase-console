import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

import {map, tap} from 'rxjs/operators';
import {AppSource, RadarSource} from "../models/source";
import {Params} from '@angular/router';
import {DEFAULT_PAGE_SIZE} from '../../../services/base.entity.service';
import {AppProject} from '../../project/models/project';

@Injectable({ providedIn: 'root' })
export class SourceService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/sources';

  total = 0;

  private toAppModel(entity: RadarSource): AppSource {
    return { ...entity, _name: entity.sourceId, _search: `${entity.sourceName} ${entity.sourceId} ${entity.expectedSourceName}` };
  }

  private toRadarModel(entity: AppSource, project: AppProject): RadarSource {
    return { ...entity, project, assigned: !!entity.assigned, };
  }

  getWithQuery(projectName: string, queryParams?: Params | string): Observable<AppSource[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSource[]>(`api/projects/${projectName}/sources`, {
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

  getByKey(key: number | string): Observable<AppSource> {
    return this.http.get<RadarSource>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(entity: AppSource, project: AppProject): Observable<AppSource> {
    return this.http.post<RadarSource>(this.resourceUrl, this.toRadarModel(entity, project))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSource, project: AppProject): Observable<AppSource> {
    return this.http.put<RadarSource>(this.resourceUrl, this.toRadarModel(update, project))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppSource): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${entity.sourceName}`
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

  // setProject(projectName: string) {
  //   this.projectName$.set(projectName);
  // }
}
