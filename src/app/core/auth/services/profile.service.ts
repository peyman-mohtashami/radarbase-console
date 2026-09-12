import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {AuthService} from "./auth.service";
import {environment} from '../../../../environments/environment';
import {UserDto} from '../../../admin/entities/user/models/user';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly authService = inject(AuthService);

  requestResetPassword(email: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}api/account/reset_password/init`, email);
  }

  update(user: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(`${environment.apiUrl}api/account`, user).pipe(
      tap(() => this.authService.setUser(user))
    );
  }

  updatePassword(password: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}api/account/change_password`, password);
  }

  sendActivation(key: string): Observable<void> {
    const params = {'key': key};
    return this.http.get<void>(`${environment.apiUrl}api/activate`, {params});
  }

  updatePasswordFinish(keyAndPassword: { key: string; newPassword: string; }): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}api/account/reset_password/finish`, keyAndPassword);
  }
}
