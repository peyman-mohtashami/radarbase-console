import {computed, inject, Injectable, signal} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {catchError, shareReplay, switchMap, tap} from "rxjs/operators";

import {
  CredentialAuthRequest,
  ManagementPortalUser, TokenData
} from '../models/auth.model';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {StorageService} from "../../storage/services/storage.service";
import {Router} from "@angular/router";
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly _user = signal<ManagementPortalUser | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  init() {
    return this.getUser().pipe(
      tap((user) => {
        if (user) {
          this._user.set(user);
        }
      }),
      catchError(() => {
        this._user.set(null);
        return of(null);
      }),
    );
  }

  getUser(): Observable<ManagementPortalUser | null> {
    return this.http.get<ManagementPortalUser>(`${environment.apiUrl}api/account`).pipe(
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  setUser (user: ManagementPortalUser | null): void {
    this._user.set(user);
  }

  authenticateWithCredential(
    credentials: CredentialAuthRequest
  ): Observable<ManagementPortalUser> {
    const url = `${environment.apiUrl}oauth/token`;
    const payload = this.getTokenRequestParams(
      credentials.username,
      credentials.password
    );
    const options = { headers: this.getTokenRequestHeaders() };

    return this.http.post<TokenData>(url, payload, options).pipe(
      tap((token) => {
        StorageService.setAuthTokenData(token);
      }),
      shareReplay(),
      switchMap((tokenData: TokenData) => {
        const authHeaders = new HttpHeaders().append(
          'Authorization',
          'Bearer ' + tokenData.access_token
        );
        return this.http
          .post<ManagementPortalUser>(`${environment.apiUrl}api/login`, null, {
            headers: authHeaders,
            observe: 'body',
            withCredentials: true,
          })
          .pipe(
            tap((user) => {
              this._user.set(user);
            })
          );
      })
    );
  }

  logout(): void {
    const url = `${environment.apiUrl}api/logout`;
    this.http.post<void>(url, { observe: 'body' }).pipe(
      tap(() => {
        this._user.set(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/auth/login']).then();
      })
    ).subscribe();
  }

  isAuthorized(allowedRoles: string[]): boolean {
    const roles = this._user()?.roles ?? [];
    const allowedSet = new Set(allowedRoles);
    return roles.some(r => r.authorityName && allowedSet.has(r.authorityName));
  }

  private getTokenRequestParams(
    username: string,
    password: string
  ): HttpParams {
    return new HttpParams()
      .set('client_id', 'ManagementPortalapp')
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
  }

  private getTokenRequestHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');
  }
}
