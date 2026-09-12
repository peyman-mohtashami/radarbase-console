import {inject, Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse, HttpContextToken,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NavigationExtras, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {LogService} from "../../log/services/log.service";
import {AuthService} from "../services/auth.service";

export const SKIP_ERROR = new HttpContextToken<boolean>(() => false);

@Injectable({providedIn: 'root'})
export class ServerErrorInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly logService = inject(LogService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(SKIP_ERROR)) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.handleError(error, request);
        }
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse, request: HttpRequest<unknown>): void {
    switch (error.status) {
      case 0:
      case 403:
      case 404:
      case 500:
      case 503:
      case 504:
        this.logService.logError(error);
        break;
      case 401:
        this.handleUnauthorized(request);
        break;
    }
  }

  private handleUnauthorized(request: HttpRequest<unknown>): void {
    this.dialog.closeAll();
    this.authService.setUser(null);

    if (!request.url.includes('api/account')) {
      const navigationExtras: NavigationExtras = {
        state: {
          error: 'sessionExpired',
          returnUrl: this.router.url,
        },
      };
      void this.router.navigate(['/auth/login'], navigationExtras);
    }
  }
}
