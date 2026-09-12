import { Injectable } from '@angular/core';
import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { StorageService } from '../../storage/services/storage.service';

export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {

  private static addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown>{
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (request.context.get(SKIP_AUTH)) {
      return next.handle(request);
    }

    const token = StorageService.getAccessToken();
    const authorizedRequest = token ? AuthInterceptor.addToken(request, token) : request;

    return next.handle(authorizedRequest);
  }
}
