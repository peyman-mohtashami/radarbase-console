// import { Injectable } from '@angular/core';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { QueryParams } from '@ngrx/data';
//
// import { RadarSubjectDef } from '@rb/models';
// import { SubjectService } from './subject.service';
//
// @Injectable()
// export class SubjectsResolver implements Resolve<RadarSubjectDef[]> {
//   constructor(private entityService: SubjectService) {}
//
//   resolve(
//     route: ActivatedRouteSnapshot,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     state: RouterStateSnapshot
//   ):
//     | Observable<RadarSubjectDef[]>
//     | Promise<RadarSubjectDef[]>
//     | RadarSubjectDef[] {
//     const params: QueryParams = { ...route.queryParams };
//     const parentEntityName: string = route.parent?.parent?.params['id'];
//     if (parentEntityName) {
//       params['parentEntityName'] = parentEntityName;
//     }
//     return this.entityService.getWithQuery(params);
//   }
// }
