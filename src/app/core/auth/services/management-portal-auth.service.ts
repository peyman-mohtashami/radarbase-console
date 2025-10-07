import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { AuthActions } from '../store/action.types';
import { AuthState } from '../store/reducers';
import {AuthService } from './auth.service';
import { user } from '../store/auth.selectors';
import { StorageService } from '../../storage/services/storage.service';
import { environment } from '../../../../environments/environment';
import {CredentialAuthRequest, ManagementPortalUser, TokenData} from '../../../shared/models/auth.model';

@Injectable({providedIn: 'root'})
export class ManagementPortalAuthService extends AuthService {

  constructor(
    private http: HttpClient,
    store: Store<AuthState>,
  ) {
    super(store);
  }

  override init() {
    return this.getUser().pipe(
      tap((user) => {
        if (user) {
          this.store.dispatch(AuthActions.loginOnStartUp({ user }));
        }
      }),
      catchError((error) => {
        return of(null);
      }),
    );
  }

  override getUser(): Observable<ManagementPortalUser | null> {
    if (environment.cookies) {
      return this.http.get<ManagementPortalUser>('api/account').pipe(
        catchError((err) => {
          return throwError(() => err);
        })
      );
    } else {
      return StorageService.getUser();
    }
  }

  override getUserFromStore(): Observable<ManagementPortalUser | undefined> {
    return this.store.pipe(select(user));
  }

  override authenticateWithCredential(
    credentials: CredentialAuthRequest
  ): Observable<ManagementPortalUser> {
    const url = 'oauth/token';
    const payload = this.getTokenRequestParamsPasswordFlow(
      credentials.username,
      credentials.password
    );
    const options = { headers: this.getTokenRequestHeadersPasswordFlow() };

    return this.http.post<TokenData>(url, payload, options).pipe(
      tap((token) => {
        if (!environment.cookies) {
          StorageService.setAuthTokenData(token);
        }
      }),
      shareReplay(),
      switchMap((tokenData: TokenData) => {
        const authHeaders = new HttpHeaders().append(
          'Authorization',
          'Bearer ' + tokenData.access_token
        );
        return this.http
          .post<ManagementPortalUser>('api/login', null, {
            headers: authHeaders,
            observe: 'body',
            withCredentials: true,
          })
          .pipe(
            tap((user) => {
              this.store.dispatch(AuthActions.login({ user }));
              if (!environment.cookies) {
                StorageService.setUser(user);
              }
            })
          );
      })
    );
  }

  override logoutAuthCodeGrant(): void {
    StorageService.clearAuth();
  }

  protected getTokenRequestParamsPasswordFlow(
    username: string,
    password: string
  ): HttpParams {
    return new HttpParams()
      .set('client_id', 'ManagementPortalapp')
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
  }

  protected getTokenRequestHeadersPasswordFlow(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Accept', 'application/json');
  }
}
