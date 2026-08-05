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
    return this.http.get<UserDto[]>(this.apiUrl, {params: {includeProvenance: false}});
  }

  getWithQuery(queryParams: Params) {
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

  sendActivationEmail(entity: AppUser): Observable<void> {
    return this.http.post<void>('/managementportal/api/account/reset-activation/init', entity.login);
  }
}
