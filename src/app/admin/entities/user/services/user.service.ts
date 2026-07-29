import {inject, Injectable} from '@angular/core';

import {AppUser, CreateUserDto, UpdateUserDto, UserDto} from "../models/user";
import {Observable} from "rxjs";
import {Params} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}api/users`;

  getAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }

  getWithQuery(queryParams: Params) {
    // const { params } = this.convertParamsToHttpParams(queryParams as Params);
    return this.http.get<UserDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }

  getByKey(key: string) {
    return this.http.get<UserDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateUserDto) {
    return this.http.post<UserDto>(this.apiUrl, entity);
  }

  update(entity: UpdateUserDto) {
    return this.http.put<UserDto>(this.apiUrl, entity);
  }

  delete(entity: AppUser) {
    return this.http.delete<UserDto>(`${this.apiUrl}/${entity.login}`);
  }

  // override convertFilterParamsToHttpParams(
  //   params: HttpParams,
  //   queryParams?: Params
  // ) {
  //   if (queryParams?.['login'] && queryParams['login'] !== '') {
  //     params = params.append('login', queryParams['login']);
  //   }
  //   if (queryParams?.['email'] && queryParams['email'] !== '') {
  //     params = params.append('email', queryParams['email']);
  //   }
  //   if (queryParams?.['authority'] && queryParams['authority'] !== '') {
  //     params = params.append('authority', queryParams['authority']);
  //   }
  //   // if (
  //   //   queryParams &&
  //   //   queryParams['dateOfBirth.is'] &&
  //   //   queryParams['dateOfBirth.is'] !== ''
  //   // ) {
  //   //   if (isValid(parse(queryParams['dateOfBirth.is'], 'yyyy-MM-dd', new Date()))) {
  //   //     params = params.append('dateOfBirth.is', queryParams['dateOfBirth.is']);
  //   //   }
  //   // }
  //   // if (
  //   //   queryParams &&
  //   //   queryParams['enrollmentDate.from'] &&
  //   //   queryParams['enrollmentDate.from'] !== ''
  //   // ) {
  //   //   params = params.append(
  //   //     'enrollmentDate.from',
  //   //     queryParams['enrollmentDate.from']
  //   //   );
  //   // }
  //   // if (
  //   //   queryParams &&
  //   //   queryParams['enrollmentDate.to'] &&
  //   //   queryParams['enrollmentDate.to'] !== ''
  //   // ) {
  //   //   params = params.append(
  //   //     'enrollmentDate.to',
  //   //     queryParams['enrollmentDate.to']
  //   //   );
  //   // }
  //   // if (queryParams?.['groupId'] && queryParams['groupId'] !== '') {
  //   //   params = params.append('groupId', queryParams['groupId']);
  //   // }
  //   return params;
  // }

  sendActivationEmail(entity: AppUser): Observable<void> {
    return this.http.post<void>('/managementportal/api/account/reset-activation/init', entity.login);
  }
}
