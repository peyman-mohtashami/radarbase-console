// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
//
// import {
//   AuthorizeRequest,
//   RegistrationCreateRequest,
//   RegistrationRequest,
//   RegistrationResponse,
//   RestSourceUserRequest,
//   RestSourceUserResponse,
// } from '../models/rest-source-user.model';
// // import { RadarSubjectDef } from '@rb/models';
// import { StorageItem } from '../../../enums/storage-item';
// import { AppSubject } from "../../subject/models/subject";
//
// @Injectable()
// export class AuthorizationService {
//   constructor(private http: HttpClient) {}
//
//   getUsersOfProject(projectId: string): Observable<any> {
//     const params = new HttpParams().set('project-id', projectId);
//     return this.http.get<any>('authorizer-api/users', { params });
//   }
//
//   createUser(
//     restSourceUserRequest: RestSourceUserRequest
//   ): Observable<RestSourceUserResponse> {
//     return this.http.post<RestSourceUserResponse>(
//       'authorizer-api/users',
//       restSourceUserRequest
//     );
//   }
//
//   registerUser(
//     registrationCreateRequest: RegistrationCreateRequest
//   ): Observable<RegistrationResponse> {
//     return this.http.post<RegistrationResponse>(
//       'authorizer-api/registrations',
//       registrationCreateRequest
//     );
//   }
//
//   authorizeUser(
//     authorizeRequest: AuthorizeRequest,
//     state: string
//   ): Observable<RegistrationResponse> {
//     const url = encodeURI(
//       'authorizer-api/registrations/' + state + '/authorize'
//     );
//     return this.http.post<RegistrationResponse>(url, authorizeRequest);
//   }
//
//   getAuthEndpointUrl(
//     registrationRequest: RegistrationRequest,
//     token: string
//   ): Observable<RegistrationResponse> {
//     const url = encodeURI('authorizer-api/registrations/' + token);
//     return this.http.post<RegistrationResponse>(url, registrationRequest);
//   }
//
//   updateUser(user: AppSubject): Observable<any> {
//     const url = encodeURI('authorizer-api/users/' + user.id);
//     return this.http.post(url, user);
//   }
//
//   deleteUser(userId: number): Observable<any> {
//     const url = encodeURI('authorizer-api/users/' + userId);
//     return this.http.delete(url);
//   }
//
//   storeUserAuthParams(url: string) {
//     const params = this.getJsonFromUrl(url);
//     localStorage.setItem(
//       StorageItem.AUTH_ENDPOINT_PARAMS_STORAGE_KEY,
//       JSON.stringify(params)
//     );
//   }
//
//   clearUserAuthParams() {
//     localStorage.removeItem(StorageItem.AUTH_ENDPOINT_PARAMS_STORAGE_KEY);
//   }
//
//   getUserAuthParams() {
//     const params = localStorage.getItem(
//       StorageItem.AUTH_ENDPOINT_PARAMS_STORAGE_KEY
//     );
//     return params ? JSON.parse(params) : {};
//   }
//
//   getJsonFromUrl(url: string) {
//     const query = url.split('?')[1];
//     const result: any = {};
//     query.split('&').forEach(function (part) {
//       const item = part.split('=');
//       result[item[0]] = decodeURIComponent(item[1]);
//     });
//     return result;
//   }
// }
