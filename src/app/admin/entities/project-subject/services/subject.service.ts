import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params } from '@angular/router';
import {AppSubject, CreateSubjectDto, SubjectDto, UpdateSubjectDto} from "../models/subject";
import {environment} from '../../../../../environments/environment';
import {ProjectStore} from '../../project/services/project.store';

@Injectable({ providedIn: 'root' })
export class SubjectService {
  private http = inject(HttpClient);
  private projectStore = inject(ProjectStore);

  private apiUrl = computed(() => {
    const project = this.projectStore.selected()!;
    return `${environment.apiUrl}api/projects/${project.projectName}/subjects`;
  });

  getWithQuery(queryParams: Params) {
    // const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<SubjectDto[]>(this.apiUrl(), {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<SubjectDto>(`${this.apiUrl()}/${key}`);
  }

  add(entity: CreateSubjectDto) {
    return this.http.post<SubjectDto>(this.apiUrl(), entity);
  }

  update(entity: UpdateSubjectDto) {
    return this.http.put<SubjectDto>(this.apiUrl(), entity);
  }

  delete(entity: AppSubject) {
    return this.http.delete<SubjectDto>(`${this.apiUrl()}/${entity.login}`);
  }

  discontinue(entity: UpdateSubjectDto): Observable<AppSubject> {
    return this.http.put<AppSubject>(`${environment.apiUrl}api/subjects/discontinue`, entity);
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

  // protected convertParamsToHttpParams(params: Params): {
  //   params: HttpParams;
  //   parentEntityName: string;
  // } {
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams.append(
  //     'size',
  //     params?.['pageSize'] || this.configService.getStoredPageSize()
  //   );
  //   httpParams = httpParams.append('page', params?.['pageIndex'] || '0');
  //   if (
  //     params?.['sortField'] &&
  //     params['sortField'] !== '' &&
  //     params?.['sortOrder'] &&
  //     params['sortOrder'] !== ''
  //   ) {
  //     httpParams = httpParams.append(
  //       'sort',
  //       params['sortField'] + ',' + params['sortOrder']
  //     );
  //   } else {
  //     httpParams = httpParams.append('sort', 'id' + ',' + 'desc');
  //   }
  //   httpParams = this.convertFilterParamsToHttpParams(httpParams, params);
  //   return { params: httpParams, parentEntityName: params?.['parentEntityName'] };
  // }
}
// extends BaseEntityService<AppSubject, SubjectDto> {
//   override configService = inject(SubjectConfigService);
//
//   projectName?: string;
//
//   override getResourceUrl(): string {
//     return `${environment.apiUrl}api/subjects`;
//   }
//
//   override toAppModel(entity: SubjectDto): AppSubject {
//     return { ...entity, _name: entity.login };
//   }
//
//   override toRadarModel(entity: AppSubject): SubjectDto {
//     return { ...entity, group: entity.group || undefined, };
//   }
//
//   override getWithQuery(queryParams: Params, projectName?: string): Observable<AppSubject[]> {
//     this.projectName = projectName;
//
//     const { params } = this.convertParamsToHttpParams(queryParams as Params);
//     return this.http.get<SubjectDto[]>(`${environment.apiUrl}api/projects/${this.projectName}/subjects`, {
//       params,
//       observe: 'response',
//     }).pipe(
//       tap(
//         (res) => {
//           this.total.set(+(
//             res.headers.get('x-total-count') ||
//             res.body?.length.toString() ||
//             '0'
//           ))
//         }
//       ),
//       map((res) => {
//         const entities = (res.body || []).map((entity) => this.toAppModel(entity));
//         this.cache = [...entities];
//         return entities;
//       })
//     );
//   }
//
//   override convertFilterParamsToHttpParams(
//     params: HttpParams,
//     queryParams?: Params
//   ) {
//     if (queryParams?.['login'] && queryParams['login'] !== '') {
//       params = params.append('login', queryParams['login']);
//     }
//     if (queryParams?.['externalId'] && queryParams['externalId'] !== '') {
//       params = params.append('externalId', queryParams['externalId']);
//     }
//     if (queryParams?.['personName'] && queryParams['personName'] !== '') {
//       params = params.append('personName', queryParams['personName']);
//     }
//     if (
//       queryParams &&
//       queryParams['dateOfBirth.is'] &&
//       queryParams['dateOfBirth.is'] !== ''
//     ) {
//       if (isValid(parse(queryParams['dateOfBirth.is'], 'yyyy-MM-dd', new Date()))) {
//         params = params.append('dateOfBirth.is', queryParams['dateOfBirth.is']);
//       }
//     }
//     if (
//       queryParams &&
//       queryParams['enrollmentDate.from'] &&
//       queryParams['enrollmentDate.from'] !== ''
//     ) {
//       params = params.append(
//         'enrollmentDate.from',
//         queryParams['enrollmentDate.from']
//       );
//     }
//     if (
//       queryParams &&
//       queryParams['enrollmentDate.to'] &&
//       queryParams['enrollmentDate.to'] !== ''
//     ) {
//       params = params.append(
//         'enrollmentDate.to',
//         queryParams['enrollmentDate.to']
//       );
//     }
//     if (queryParams?.['groupId'] && queryParams['groupId'] !== '') {
//       params = params.append('groupId', queryParams['groupId']);
//     }
//     return params;
//   }


// }
