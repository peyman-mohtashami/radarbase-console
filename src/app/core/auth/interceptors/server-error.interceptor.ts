import {inject, Injectable} from '@angular/core';
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
import {LogService} from "../../log/services/log.service";
import {AuthService} from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class ServerErrorInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  router = inject(Router);
  dialogRef = inject(MatDialog);
  logService = inject(LogService);


  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 0:
            case 503:
            case 504:
            case 404:
              this.logService.logError(error);
              break;
            case 403:
              this.logService.logError(error);
              break;
            case 500:
              this.logService.logError(error);
              break;
            case 401: {
              this.dialogRef.closeAll();
              this.authService.setUser(null);
              if (request.url !== 'api/account') {
                const navigationExtras: NavigationExtras = {
                  state: {
                    error: 'sessionExpired',
                  },
                };
                this.router.navigate(['/auth/login'], navigationExtras).then();
              }
              break;
            }
            default: {
            }
          }
        }
        return throwError(() => error);
      })
    );
  }
}
