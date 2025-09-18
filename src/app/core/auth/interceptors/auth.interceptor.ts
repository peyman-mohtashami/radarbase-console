import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { StorageService } from '../../storage/services/storage.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  static addToken(request: HttpRequest<unknown>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = StorageService.getAccessToken();
    if (token) {
      request = AuthInterceptor.addToken(request, token);
    }
    return next.handle(request).pipe(catchError((error) => throwError(() => error)));
  }
}
