// import {ActivatedRouteSnapshot} from '@angular/router';
// import {AppProject} from '../entities/project/models/project';
// import {AppSubject} from '../entities/subject/models/subject';
// import {AppClient} from '../entities/client/models/client';
// import {AppOrganization} from '../entities/organization/models/organization';
//
//
// function getDataFromActiveRoute(route: ActivatedRouteSnapshot, key: string) {
//   if (route.data && route.data[key]) {
//     return route.data[key];
//   }
//   if (route.firstChild) {
//     return getDataFromActiveRoute(route.firstChild, key);
//   }
//   return undefined;
// }
//
// export function hasChildEntity(route: ActivatedRouteSnapshot, key: string) {
//   return !!getDataFromActiveRoute(route, key);
//
// }
//
// export function getSelectedOrganization(route: ActivatedRouteSnapshot): AppOrganization | undefined {
//   const organization = route.pathFromRoot.find(route => route.data['organization']);
//   return organization?.data['organization'];
// }
//
// export function getSelectedProject(route: ActivatedRouteSnapshot): AppProject | undefined {
//   const project = route.pathFromRoot.find(route => route.data['project']);
//   return project?.data['project'];
// }
//
// export function getSelectedSubject(route: ActivatedRouteSnapshot): AppSubject | undefined {
//   const subject = route.pathFromRoot.find(route => route.data['subject']);
//   return subject?.data['subject'];
// }
//
// export function getSelectedClient(route: ActivatedRouteSnapshot): AppClient {
//   const client = route.pathFromRoot.find(route => route.data['client']);
//   return client?.data['client'];
// }
