import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import { Moment } from 'moment';
import moment from 'moment/moment';
import { BaseEntityService } from '../../../services/base.entity.service';
import { Store } from '@ngrx/store';
// import { project } from '../../../store/admin.selectors';
import { map, tap } from 'rxjs/operators';
import { QueryParams } from '@ngrx/data';
import { AppSubject } from "../models/subject";
import {RadarSubject} from '../../../../shared/models/radar-subject.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

@Injectable({ providedIn: 'root' })
export class SubjectService extends BaseEntityService<
  RadarSubject,
  AppSubject
> {
  override resourceUrl = 'api/subjects';
  resourceUrlGetWithQuery = '';

  // project?: RadarProject | null;

  constructor(http: HttpClient, private store: Store) {
    super(http);
    // this.store.select(project).subscribe((project) => {
    //   this.project = project;
    //   if (project) {
    //     this.resourceUrlGetWithQuery = `api/projects/${project.projectName}/subjects`;
    //   }
    // });
  }

  override getWithQuery(
    queryParams?: QueryParams | string
  ): Observable<AppSubject[]> {
    const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http
      .get<RadarSubject[]>(this.resourceUrlGetWithQuery, {
        params,
        observe: 'response',
      })
      .pipe(
        tap(
          (res) =>
            (this.total = +(
              res.headers.get('x-total-count') ||
              res.body?.length.toString() ||
              '0'
            ))
        ),
        map((res) => {
          return (res.body || []).map((entity) =>
            this.toAppModel(entity)
          );
        })
      );
  }

  findForRevision(
    login: string,
    revisionNb: number
  ): Observable<AppSubject> {
    return this.http.get<AppSubject>(
      `${this.resourceUrl}/${encodeURIComponent(login)}/revisions/${revisionNb}`
    );
  }

  discontinue(entity: AppSubject): Observable<AppSubject> {
    return this.http.put<AppSubject>(
      `${this.resourceUrl}/discontinue`,
      this.toRadarModel(entity)
    );
  }

  // queryAllByProject(projectName: string): Observable<RadarSubjectDef[]> {
  //   const url = `${this.projectResourceUrl}/${projectName}/subjects`;
  //   return this.http.get<RadarSubjectDef[]>(url, {
  //     // params: createRequestOption({ ...paginationParams, ...filterParams }),
  //     // observe: 'response',
  //   });
  // }

  addSubjectsToGroup(
    // projectName: string,
    groupName: string,
    subjects: { login?: string; id?: number }[]
  ) {
    const url =
      'api/projects/' +
      // encodeURIComponent(projectName) +
      // this.project?.projectName +
      '/groups/' +
      encodeURIComponent(groupName) +
      '/subjects';
    // this.resourceUrl(projectName, groupName);
    const body = [{ op: 'add', value: subjects }];
    return this.http.patch(url, body);
  }

  // override getResourceUrl(projectName?: string): string {
  //   // console.log('getResourceUrl', projectName);
  //   if (projectName) {
  //     return `api/projects/${projectName}/subjects`;
  //   } else {
  //     return `api/subjects`;
  //   }
  // }

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
      const newDate: Moment = moment(queryParams['dateOfBirth.is']);
      // console.log(newDate.isValid())
      if (moment(queryParams['dateOfBirth.is']).isValid()) {
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

//!
  override toAppModel(entity: RadarSubject): AppSubject {
    return {
      ...entity,
      id: entity.id.toString(),
      name: entity.login,
    };
  }
  //!
  override toRadarModel(entity: AppSubject): RadarSubject {
    console.log('Class: SubjectService, Function: fromDto, Line 171 entity' , entity);
    return {
      ...entity,
      group: entity.group || undefined,
      // project: this.project || undefined,
    };
  }
}
