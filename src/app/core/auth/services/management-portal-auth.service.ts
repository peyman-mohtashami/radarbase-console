// /**
//  * Summary. (use period)
//  *
//  * Description. (use period)
//  *
//  * @link   URL
//  * @file   This files defines the MyClass class.
//  * @author AuthorName.
//  * @since  x.x.x
//  */
//
// /**
//  * Summary. (use period)
//  *
//  * Description. (use period)
//  *
//  * @since      x.x.x
//  * @deprecated x.x.x Use new_function_name() instead.
//  * @access     private
//  *
//  * @class
//  * @augments parent
//  * @mixes    mixin
//  *
//  * @alias    realName
//  * @memberof namespace
//  *
//  * @see  Function/class relied on
//  * @link URL
//  * @global
//  *
//  * @fires   eventName
//  * @fires   className#eventName
//  * @listens event:eventName
//  * @listens className~event:eventName
//  *
//  * @param {type}   var           Description.
//  * @param {type}   [var]         Description of optional variable.
//  * @param {type}   [var=default] Description of optional variable with default variable.
//  * @param {Object} objectVar     Description.
//  * @param {type}   objectVar.key Description of a key in the objectVar parameter.
//  *
//  * @yield {type} Yielded value description.
//  *
//  * @return {type} Return value description.
//  */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthActions } from '../store/action.types';
import { AuthState } from '../store/reducers';
import {AuthService } from './auth.service';
import { user } from '../store/auth.selectors';
import { StorageService } from '../../storage/services/storage.service';
import { environment } from '../../../../environments/environment';
import {AuthResponse, CredentialAuthRequest, ManagementPortalUser, TokenData} from '../../../shared/models/auth.model';

// import {AuthResponse, CredentialAuthRequest, ManagementPortalUser, TokenData} from '@rb/models';

@Injectable({providedIn: 'root'})
export class ManagementPortalAuthService extends AuthService {
  DefaultRequestContentType = 'application/x-www-form-urlencoded';
  TOKEN_URI = `${environment.authBaseUrl}/token`;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router,
    store: Store<AuthState>,
    // private storageService: StorageService // @Inject(AuthOptions) private authOptions: AuthOptionsModel
  ) {
    super(store);
    // console.log('ManagementPortalAuthService - constructor')
    // this.checkLoggedInOnInit();
    // this.getUser().subscribe({
    //   next: (user) => {
    //     if (user) {
    //       // this.store.dispatch(AuthActions.loginOnInit({ user }));
    //       this.store.dispatch(AuthActions.login({ user }));
    //       this.store.dispatch(AuthActions.loaded({ loaded: true }));
    //     }
    //   },
    //   error: (error) => {
    //     this.store.dispatch(AuthActions.loaded({ loaded: true }));
    //     throw new HttpErrorResponse(error);
    //   },
    // });
  }

  override init() { //:  Observable<ManagementPortalUser> {
    return this.getUser().pipe(
      tap((user) => {
        if (user) {
          this.store.dispatch(AuthActions.loginOnStartUp({ user }));
        }
      }),
      catchError((error) => {
        return of(null);
        // throw new HttpErrorResponse(error);
      }),
    );
  }

  // override getAuthOptions(): AuthOptionsModel {
  //   return this.authOptions;
  // }

  // private checkLoggedInOnInit(): void {
  //   this.getUser().subscribe({
  //     next: (user) => {
  //       if (user) {
  //         // console.log(user)
  //         this.store.dispatch(AuthActions.loginOnInit({ user }));
  //       }
  //     },
  //     error: (err) => console.log(err.status, err.statusText)
  //   });
  //   // if (this.authOptions.authorizationGrantType === 'password') {
  //   //   this.getManagementPortalUser().subscribe({
  //   //     next: (user) => this.store.dispatch(AuthActions.loginOnInit({user})),
  //   //     error: (err) => console.log(err)
  //   //   });
  //   // } else if (this.authOptions.authorizationGrantType === 'code') {
  //   //   this.storageService.getUser().subscribe({
  //   //     next: (user) => this.store.dispatch(AuthActions.loginOnInit({ user })),
  //   //     error: (err) => console.log(err)
  //   //   });
  //   // }
  // }

  override getUser(): Observable<ManagementPortalUser | null> {
    // if (this.authOptions.cookies) {
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



  override authenticateWithAuthCode(
    authCode: string
  ): Observable<ManagementPortalUser> {
    const url = this.TOKEN_URI;
    const payload = this.getTokenRequestParamsCodeFlow(authCode);
    const options = { headers: this.getTokenRequestHeadersCodeFlow() };
    return this.http.post<AuthResponse>(url, payload, options).pipe(
      // tap((authResponse) => {
      //   // console.log(authResponse);
      //   // if (!this.authOptions.cookies) {
      //   //   this.storageService.setAuth(authResponse);
      //   // }
      //   //this.store.dispatch(AuthActions.login({user: this.parseUser(authResponse.sub, authResponse.roles)}));
      //   //this.subject.next(this.parseUser(authResponse.sub, authResponse.roles));
      //   // this.setAuth(authResponse);
      // }),
      map((authResponse) => {
        const user = { login: authResponse.sub, roles: authResponse.roles };
        // if (!this.authOptions.cookies) {
        //   this.storageService.setAuth(authResponse);
        // }
        this.store.dispatch(AuthActions.login({ user }));
        // if (!this.authOptions.cookies) {
        if (!environment.cookies) {
          StorageService.setAuthResponse(authResponse);
          StorageService.setUser(user);
        }
        return user;
      }),
      shareReplay()
      // switchMap((authResponse: AuthResponse) => {
      //   return this.http.get<ManagementPortalUser>('https://radar-k3s-test.thehyve.net/managementportal/api/account').pipe(
      //     tap((user) => {
      //       this.store.dispatch(AuthActions.login({user}));
      //       if (!this.authOptions.cookies) {
      //         this.storageService.setUser(user);
      //       }
      //     })
      //   );
      //   // const authHeaders = new HttpHeaders()
      //   //   .append('Authorization', 'Bearer ' + authResponse.access_token);
      //   // return this.http.post<ManagementPortalUser>('api/login', null, {
      //   //   headers: authHeaders, observe: 'body', withCredentials: true
      //   // }).pipe(
      //   //   tap((user) => {
      //   //     this.store.dispatch(AuthActions.login({user}));
      //   //     if (!this.authOptions.cookies) {
      //   //       this.storageService.setUser(user);
      //   //     }
      //   //   })
      //   // )
      // }),
    );
    // return this.requestAccessToken(authCode);
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

  // requestAccessToken(authCode: string): Observable<AuthResponse> {
  //   const url = this.TOKEN_URI;
  //   const payload = this.getAccessTokenRequestParams(authCode);
  //   const options = { headers: this.getTokenRequestHeaders() };
  //   return this.http.post<AuthResponse>(url, payload, options).pipe(
  //     tap((authResponse) => {
  //       console.log(authResponse);
  //       if (!this.authOptions.cookies) {
  //         this.storageService.setAuth(authResponse);
  //       }
  //       //this.store.dispatch(AuthActions.login({user: this.parseUser(authResponse.sub, authResponse.roles)}));
  //       // this.subject.next(this.parseUser(authResponse.sub, authResponse.roles));
  //       // this.setAuth(authResponse);
  //     }),
  //     shareReplay()
  //   );
  // }

  override logoutAuthCodeGrant(): void {
    StorageService.clearAuth();
  }

  override logoutAuthCodeGrantAndNavigate(): void {
    console.log('Class: ManagementPortalAuthService, Function: logoutAuthCodeGrantAndNavigate, Line 321 ' , );
    this.logoutAuthCodeGrant();
    this.router.navigate(['/login']).then();
  }

  override logoutPasswordGrant(): Observable<void> {
    const url = 'api/logout';
    return this.http.post<void>(url, { observe: 'body' }).pipe(
      tap(() => {
        if (!environment.cookies) {
          StorageService.clearAuth();
        }
        this.store.dispatch(AuthActions.logoutSuccessPasswordGrant())
        // this.router.navigate(['/login']).then();
      })
    );
  }

  protected getTokenRequestParamsCodeFlow(authCode: string): HttpParams {
    return (
      new HttpParams()
        // .set('grant_type', this.authOptions.authorizationGrantType)
        .set('grant_type', environment.authorizationGrantType)
        .set('redirect_uri', window.location.href.split('?')[0])
        .set('code', authCode)
    );
  }

  private getTokenRequestHeadersCodeFlow(): HttpHeaders {
    const basicCredentials = this.getBasicCredentials(
      // this.authOptions.appClientId,
      environment.appClientId,
      // this.authOptions.appClientSecret
      environment.appClientSecret
    );
    return new HttpHeaders()
      .set('Authorization', basicCredentials)
      .set('Content-Type', this.DefaultRequestContentType);
  }

  protected getBasicCredentials(user: string, password: string): string {
    return 'Basic ' + btoa(`${user}:${password}`);
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
