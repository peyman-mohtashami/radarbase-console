import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import {AppSubject, RadarSubject} from "../models/subject";
import {isValid, parse} from 'date-fns';
import {DEFAULT_PAGE_SIZE} from "../../../consts/default-table-values";

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/subjects';
  total = 0;

  private toAppModel(entity: RadarSubject): AppSubject {
    return { ...entity, _name: entity.login };
  }

  private toRadarModel(entity: AppSubject): RadarSubject {
    return { ...entity, group: entity.group || undefined, };
  }

  getWithQuery(projectName: string, queryParams?: Params | string): Observable<AppSubject[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSubject[]>(`api/projects/${projectName}/subjects`, {
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

  getByKey(key: number | string): Observable<AppSubject> {
    return this.http.get<RadarSubject>(`api/subjects/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(entity: AppSubject): Observable<AppSubject> {
    return this.http.post<RadarSubject>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppSubject): Observable<AppSubject> {
    return this.http.put<RadarSubject>(`api/subjects/`, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppSubject): Observable<void> {
    return this.http.delete<void>(
      `api/subjects/${entity.login}`
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
    if (queryParams?.['login'] && queryParams['login'] !== '') {
      params = params.append('login', queryParams['login']);
    }
    if (queryParams?.['externalId'] && queryParams['externalId'] !== '') {
      params = params.append('externalId', queryParams['externalId']);
    }
    if (queryParams?.['personName'] && queryParams['personName'] !== '') {
      params = params.append('personName', queryParams['personName']);
    }
    if (
      queryParams &&
      queryParams['dateOfBirth.is'] &&
      queryParams['dateOfBirth.is'] !== ''
    ) {
      if (isValid(parse(queryParams['dateOfBirth.is'], 'yyyy-MM-dd', new Date()))) {
        params = params.append('dateOfBirth.is', queryParams['dateOfBirth.is']);
      }
    }
    if (
      queryParams &&
      queryParams['enrollmentDate.from'] &&
      queryParams['enrollmentDate.from'] !== ''
    ) {
      params = params.append(
        'enrollmentDate.from',
        queryParams['enrollmentDate.from']
      );
    }
    if (
      queryParams &&
      queryParams['enrollmentDate.to'] &&
      queryParams['enrollmentDate.to'] !== ''
    ) {
      params = params.append(
        'enrollmentDate.to',
        queryParams['enrollmentDate.to']
      );
    }
    if (queryParams?.['groupId'] && queryParams['groupId'] !== '') {
      params = params.append('groupId', queryParams['groupId']);
    }
    return params;
  }

  discontinue(entity: AppSubject): Observable<AppSubject> {
    return this.http.put<AppSubject>(
      `${this.resourceUrl}/discontinue`,
      this.toRadarModel(entity)
    );
  }

  addSubjectsToGroup(
    projectName: string,
    groupName: string,
    subjects: { login?: string; id?: number }[]
  ) {
    const url =
      `api/projects/${projectName}/groups/${encodeURIComponent(groupName)}/subjects`;
    const body = [{ op: 'add', value: subjects }];
    return this.http.patch<void>(url, body);
  }
}
