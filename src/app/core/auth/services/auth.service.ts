import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {select, Store} from "@ngrx/store";
import {map} from "rxjs/operators";

import {isLoggedIn, isLoggedOut, user} from "../store/auth.selectors";
import {AuthState} from "../store/reducers";
import {
  AuthOptionsModel,
  AuthResponse,
  CredentialAuthRequest,
  ManagementPortalUser
} from '../../../shared/models/auth.model';

// import {AuthOptionsModel, AuthResponse, CredentialAuthRequest, ManagementPortalUser} from '@rb/models';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(public store: Store<AuthState>) {}

  init(): Observable<ManagementPortalUser | null> {//:  Observable<ManagementPortalUser> {
    throw new Error('AuthService method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticateWithAuthCode(authCode: string): Observable<ManagementPortalUser> {
    throw new Error('AuthService method not implemented');
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(isLoggedIn)
  }

  isUnauthenticated(): Observable<boolean> {
    return this.store.select(isLoggedOut);
  }

  isAuthorized(allowedRoles: string[]): Observable<boolean> {
    return this.store.pipe(
      select(user),
      map((user) => {
        // console.log('Class: AuthService, Function: , Line 46 user' , user);
        let allow = false;
        for (const allowedRole of allowedRoles) {
          if (
            user?.roles.filter((r) => r.authorityName === allowedRole).length
          ) {
            allow = true;
            break;
          }
        }
        // console.log('Class: AuthService, Function: , Line 56 allow' , allow);
        return allow;
      }),
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  authenticateWithCredential(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    credentials: CredentialAuthRequest
  ): Observable<ManagementPortalUser> {
    throw new Error('AuthService method not implemented');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  requestAccessToken(authCode: string): Observable<AuthResponse> {
    throw new Error('AuthService method not implemented');
  }

  logoutAuthCodeGrant(): void {
    throw new Error('AuthService method not implemented');
  }

  logoutAuthCodeGrantAndNavigate(): void {
    throw new Error('AuthService method not implemented');
  }

  logoutPasswordGrant(): Observable<void> {
    throw new Error('AuthService method not implemented');
  }

  refreshToken(): Observable<AuthResponse> {
    throw new Error('AuthService method not implemented');
  }

  getAuthOptions(): AuthOptionsModel {
    throw new Error('AuthService method not implemented');
  }

  getUser(): Observable<ManagementPortalUser | null> {
    throw new Error('AuthService method not implemented');
  }

  getUserFromStore(): Observable<ManagementPortalUser | undefined> {
    throw new Error('AuthService method not implemented');
  }
}
