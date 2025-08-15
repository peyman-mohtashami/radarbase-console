// import {
//   Injectable,
// } from '@angular/core';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
//
// import { AuthState } from '../store/reducers';
// import { environment } from '../../../../environments/environment';
// // import { NotificationService } from '../../rb-notification/services/notification.service';
// import {StorageService} from "../../storage/services/storage.service";
// import {AuthResponse} from '../../../shared/models/auth.model';
//
// // import {AuthResponse} from "@rb/models";
//
// @Injectable({providedIn: 'root'})
// export class RefreshTokenService {
//   // TOKEN_URI = `${this.authOptions.authBaseUrl}/token`;
//   TOKEN_URI = `${environment.authBaseUrl}/token`;
//   DefaultRequestContentType = 'application/x-www-form-urlencoded';
//
//   constructor(
//     private router: Router,
//     private notification: NotificationService,
//     // private messageService: MessageService,
//     private http: HttpClient,
//     // private storageService: StorageService,
//     // private authService: AuthService,
//     private store: Store<AuthState> // @Inject(AuthOptions) private authOptions: AuthOptionsModel
//   ) {}
//
//   refreshToken(): Observable<AuthResponse> {
//     // console.log(50000)
//     const url = this.TOKEN_URI;
//     const payload = this.getRefreshTokenRequestParams();
//     const options = { headers: this.getTokenRequestHeadersCodeFlow() };
//     return this.http.post<AuthResponse>(url, payload, options).pipe(
//       tap((authResponse: AuthResponse) => {
//         console.log(50001, authResponse);
//         if (!environment.cookies) {
//           // if (!this.authOptions.cookies) {
//           console.log(50002);
//           StorageService.setAuthResponse(authResponse);
//         }
//       }),
//       catchError((err) => {
//         return throwError(() => err);
//       })
//     );
//   }
//
//   private getTokenRequestHeadersCodeFlow(): HttpHeaders {
//     const basicCredentials = this.getBasicCredentials(
//       environment.appClientId,
//       // this.authOptions.appClientId,
//       // this.authOptions.appClientSecret
//       environment.appClientSecret
//     );
//     return new HttpHeaders()
//       .set('Authorization', basicCredentials)
//       .set('Content-Type', this.DefaultRequestContentType);
//   }
//
//   private getRefreshTokenRequestParams(): HttpParams {
//     return (
//       new HttpParams()
//         .set('grant_type', 'refresh_token')
//         .set('refresh_token', StorageService.getRefreshToken() || '')
//         // .set('client_id', this.authOptions.appClientId)
//         .set('client_id', environment.appClientId)
//         // .set('client_secret', this.authOptions.appClientSecret)
//         .set('client_secret', environment.appClientSecret)
//     );
//   }
//
//   protected getBasicCredentials(user: string, password: string): string {
//     return 'Basic ' + btoa(`${user}:${password}`);
//   }
// }
