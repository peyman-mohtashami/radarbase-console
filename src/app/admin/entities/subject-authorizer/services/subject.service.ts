// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Params } from '@angular/router';
// import { Moment } from 'moment';
// import * as moment from 'moment/moment';
//
// import { RadarSubjectDef, RadarSubjectDTO } from '@rb/models';
// import { BaseEntityService } from '../../../services/base.entity.service';
// import { map } from 'rxjs/operators';
//
// @Injectable()
// export class SubjectService extends BaseEntityService<
//   RadarSubjectDTO,
//   RadarSubjectDef
// > {
//   public override resourceUrl = 'api/subjects';
//   private projectResourceUrl = 'api/projects';
//
//   constructor(http: HttpClient) {
//     super(http);
//   }
//
//   findForRevision(
//     login: string,
//     revisionNb: number
//   ): Observable<RadarSubjectDef> {
//     return this.http
//       .get<RadarSubjectDTO>(
//         `${this.resourceUrl}/${encodeURIComponent(
//           login
//         )}/revisions/${revisionNb}`
//       )
//       .pipe(map((entity) => this.transformFromApi(entity)));
//   }
//
//   discontinue(subject: RadarSubjectDef): Observable<RadarSubjectDef> {
//     return this.http
//       .put<RadarSubjectDTO>(`${this.resourceUrl}/discontinue`, subject)
//       .pipe(map((entity) => this.transformFromApi(entity)));
//   }
//
//   // queryAllByProject(projectName: string): Observable<RadarSubjectDef[]> {
//   //   const url = `${this.projectResourceUrl}/${projectName}/subjects`;
//   //   return this.http.get<RadarSubjectDTO[]>(url, {
//   //     // params: createRequestOption({ ...paginationParams, ...filterParams }),
//   //     // observe: 'response',
//   //   });
//   // }
//
//   addSubjectsToGroup(
//     projectName: string,
//     groupName: string,
//     subjects: { login?: string; id?: number }[]
//   ) {
//     const url =
//       'api/projects/' +
//       encodeURIComponent(projectName) +
//       '/groups/' +
//       encodeURIComponent(groupName) +
//       '/subjects';
//     // this.resourceUrl(projectName, groupName);
//     const body = [{ op: 'add', value: subjects }];
//     return this.http.patch(url, body);
//   }
//
//   override getResourceUrl(projectName?: string): string {
//     // console.log('getResourceUrl', projectName);
//     if (projectName) {
//       return `api/projects/${projectName}/subjects`;
//     } else {
//       return `api/subjects`;
//     }
//   }
//
//   override convertFilterParamsToHttpParams(
//     params: HttpParams,
//     queryParams?: Params
//   ) {
//     // console.log(queryParams)
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
//       const newDate: Moment = moment(queryParams['dateOfBirth.is']);
//       // console.log(newDate.isValid())
//       if (moment(queryParams['dateOfBirth.is']).isValid()) {
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
//
//   override transformFromApi(entity: RadarSubjectDTO): RadarSubjectDef {
//     return { ...entity } as unknown as RadarSubjectDef;
//   }
//
//   override transformToApi(entity: RadarSubjectDef): RadarSubjectDTO {
//     return { ...entity } as unknown as RadarSubjectDTO;
//   }
// }
