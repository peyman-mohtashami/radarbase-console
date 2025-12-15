import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {ManagementPortalUser} from '../../../shared/models/auth.model';
import {AuthService} from "./auth.service";

@Injectable({providedIn: 'root'})
export class ProfileService {
  http = inject(HttpClient);
  authService = inject(AuthService);

  requestResetPassword(email: string): Observable<void> {
    return this.http.post<void>('api/account/reset_password/init', email);
  }

  update(user: ManagementPortalUser): Observable<ManagementPortalUser> {
    return this.http.post<ManagementPortalUser>('api/account', user).pipe(
      tap(() => {
        console.log(user);
        this.authService.setUser(user);
      })
    );
  }

  updatePassword(password: string): Observable<void> {
    return this.http.post<void>('api/account/change_password', password);
  }

  //TODO not used?
  sendActivation(key: string): Observable<void> {
    const params = {'key': key};
    return this.http.get<void>('api/activate', {params});
  }

  updatePasswordFinish(keyAndPassword: { key: string; newPassword: string; }): Observable<void> {
    return this.http.post<void>('api/account/reset_password/finish', keyAndPassword);
  }
}
