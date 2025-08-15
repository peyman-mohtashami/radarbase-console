import {inject, Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { AuthState } from '../store/reducers';
import { AuthActions } from '../store/action.types';
// import {MessageActions} from "../../rb-message/store/action.types";
// import {NotificationActions} from "../../rb-notification/store/action.types";
import {LogService} from "../../log/services/log.service";
import {ErrorService} from "../../error/services/error.service";
// import {NotificationService} from "../../rb-notification/services/notification.service";

@Injectable({ providedIn: 'root' })
export class ServerErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private dialogRef: MatDialog,
    private injector: Injector,
  ) {
    // inject(NotificationService);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          const errorService = this.injector.get(ErrorService);
          const logger = this.injector.get(LogService);
          const message = errorService.getServerMessage(error);
          switch (error.status) {
            case 0:
            case 503:
            case 504:
            case 404:
              logger.logError(error);
              // this.store.dispatch(NotificationActions.setError({error: message}))
              break;
            case 403:
              logger.logError(error);
              // this.store.dispatch(NotificationActions.setError({error: message}))
              // this.store.dispatch(MessageActions.setError({error: message}))
              break;
            case 500:
              logger.logError(error);
              // this.store.dispatch(MessageActions.setError({error: message}))
              break;
            case 401: {
              this.dialogRef.closeAll();
              this.store.dispatch(AuthActions.logoutOnUnauthorized()); // TODO
              if (request.url !== 'api/account') {
                // this.store.dispatch(MessageActions.setError({error: ['You are not logged in or your session expired.']}))
                const navigationExtras: NavigationExtras = {
                  state: {
                    error: 'sessionExpired',
                  },
                };
                this.router.navigate(['/login'], navigationExtras).then();
              }
              break;
            }
            default: {
              // this.store.dispatch(MessageActions.setError({error: message}))
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
