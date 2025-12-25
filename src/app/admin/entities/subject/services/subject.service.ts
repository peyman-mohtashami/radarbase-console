import {Injectable} from '@angular/core';
import {HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import {AppSubject, RadarSubject} from "../models/subject";
import {isValid, parse} from 'date-fns';
import {BaseEntityService} from '../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SubjectService extends BaseEntityService<AppSubject, RadarSubject> {

  projectName?: string;

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/subjects`;
  }

  override toAppModel(entity: RadarSubject): AppSubject {
    return { ...entity, _name: entity.login };
  }

  override toRadarModel(entity: AppSubject): RadarSubject {
    return { ...entity, group: entity.group || undefined, };
  }

  override getWithQuery(queryParams: Params, projectName?: string): Observable<AppSubject[]> {
    this.projectName = projectName;

    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<RadarSubject[]>(`${environment.apiUrl}api/projects/${this.projectName}/subjects`, {
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
        this.cache = [...entities];
        return entities;
      })
    );
  }

  override convertFilterParamsToHttpParams(
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
      `${environment.apiUrl}api/subjects/discontinue`,
      this.toRadarModel(entity)
    );
  }

  addSubjectsToGroup(
    projectName: string,
    groupName: string,
    subjects: { login?: string; id?: number }[]
  ) {
    const url =
      `${environment.apiUrl}api/projects/${projectName}/groups/${encodeURIComponent(groupName)}/subjects`;
    const body = [{ op: 'add', value: subjects }];
    return this.http.patch<void>(url, body);
  }
}
