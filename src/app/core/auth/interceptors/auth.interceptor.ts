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
    console.log('Class: AuthInterceptor, Function: constructor, Line 16 ' , );
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
    console.log('Class: AuthInterceptor, Function: intercept, Line 27 ' , );
    const token = StorageService.getAccessToken();
    console.log('Class: AuthInterceptor, Function: intercept, Line 29 token' , token);
    if (token) {
      console.log('Class: AuthInterceptor, Function: intercept, Line 31 ' , );
      request = AuthInterceptor.addToken(request, token);
    }
    console.log('Class: AuthInterceptor, Function: intercept, Line 34 ' , );
    return next.handle(request).pipe(catchError((error) => throwError(() => error)));
  }
}
