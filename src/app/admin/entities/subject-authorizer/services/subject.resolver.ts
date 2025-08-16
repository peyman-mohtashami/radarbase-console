// import { Injectable } from '@angular/core';
// import {
//   Resolve,
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
//
// import { RadarSubjectDef } from '@rb/models';
// import { SubjectService } from './subject.service';
//
// @Injectable()
// export class SubjectResolver implements Resolve<RadarSubjectDef> {
//   constructor(private entityService: SubjectService) {}
//
//   resolve(
//     route: ActivatedRouteSnapshot,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     state: RouterStateSnapshot
//   ): Observable<RadarSubjectDef> | Promise<RadarSubjectDef> | RadarSubjectDef {
//     return this.entityService.getByKey(route.params['id']);
//   }
// }
