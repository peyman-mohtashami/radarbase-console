import {computed, inject, Injectable, signal} from '@angular/core';
import {finalize, Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from "rxjs/operators";

import {AppAuthCredential, TokenDataDto} from '../models/auth.model';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {StorageService} from "../../storage/services/storage.service";
import {Router} from "@angular/router";
import {environment} from '../../../../environments/environment';
import {UserDto} from '../../../admin/entities/user/models/user';

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _user = signal<UserDto | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  init() {
    return this.getUser().pipe(
      tap((user) => this._user.set(user)),
      catchError(() => {
        this._user.set(null);
        return of(null);
      }),
    );
  }

  getUser(): Observable<UserDto | null> {
    return this.http.get<UserDto>(`${environment.apiUrl}api/account`);
  }

  setUser (user: UserDto | null): void {
    this._user.set(user);
  }

  authenticateWithCredential(credentials: AppAuthCredential): Observable<UserDto> {
    return this.fetchAccessToken(credentials).pipe(
      switchMap((tokenData) => this.loginWithToken(tokenData)),
    );
  }

  logout(): void {
    const url = `${environment.apiUrl}api/logout`;

    this.http.post<void>(url, null).pipe(
      catchError(() => of(null)),
      finalize(() => this.clearSession()),
    ).subscribe();
  }

  isAuthorized(allowedRoles: string[]): boolean {
    const roles = this._user()?.roles ?? [];
    const allowedSet = new Set(allowedRoles);
    return roles.some(r => r.authorityName && allowedSet.has(r.authorityName));
  }

  private fetchAccessToken(credentials: AppAuthCredential): Observable<TokenDataDto> {
    const url = `${environment.apiUrl}oauth/token`;
    const payload = AuthService.getTokenRequestParams(credentials.username, credentials.password);
    const headers = AuthService.getTokenRequestHeaders();

    return this.http.post<TokenDataDto>(url, payload, {headers}).pipe(
      tap((token) => StorageService.setAuthTokenData(token)),
    );
  }

  private loginWithToken(tokenData: TokenDataDto): Observable<UserDto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenData.access_token}`);

    return this.http.post<UserDto>(`${environment.apiUrl}api/login`, null, {
      headers,
      withCredentials: true,
    }).pipe(
      tap((user) => this._user.set(user)),
    );
  }

  private clearSession(): void {
    this._user.set(null);
    StorageService.clearAuthTokenData();
    void this.router.navigate(['/auth/login']);
  }

  private static getTokenRequestParams(username: string, password: string): HttpParams {
    return new HttpParams()
      .set('client_id', 'ManagementPortalapp')
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
  }

  private static getTokenRequestHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');
  }
}
