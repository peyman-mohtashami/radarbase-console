import {Injectable, signal} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {AppError} from "../models/error.model";

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  error = signal<AppError | null>(null);

  getClientMessage(error: Error): string[] {
    console.log(error);
    if (!navigator.onLine) {
      return ['ERROR.noInternet'];
    }
    const errorMessage = ['ERROR.clientError'];
    if (error.message) {
      errorMessage.push(error.message.slice(0, 150) + ' ...');
    } else {
      errorMessage.push(error.toString().slice(0, 150) + ' ...');
    }
    return errorMessage;
  }

  getClientStack(error: Error): string {
    return error.stack || 'Client Stack: null';
  }

  getServerMessage(error: HttpErrorResponse): string[] {
    switch (error.status) {
      case 0:
      case 503:
      case 504:
        return [
          'ERROR.unknownError',
          'ERROR.serverDown',
          'ERROR.contactSupport',
        ];
      case 404:
        return this.generateCustomErrorMessage(error);
      case 400:
      case 409:
      case 500:
        return this.generateCustomErrorMessage(error);
      case 403:
        return [error.error.message, error.error.description, '403'];
      case 401:
        return []; //["ADMIN.error.loginRequired"]; //["You are not logged in or your session expired."];
      case 440:
        return ['ERROR.sessionExpired'];
      default:
        return this.generateCustomErrorMessage(error);
    }
  }

  getServerStack(error: HttpErrorResponse): string {
    return error.status + error.name + ' Server Stack: null';
  }

  protected generateCustomErrorMessage(error: HttpErrorResponse): string[] {
    console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 58 ' , );
    const managementPortalError = error.headers.get(
      'x-managementportalapp-error'
    );
    const managementPortalParams = error.headers.get(
      'x-managementportalapp-params'
    );
    console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 65 ' , );
    if (managementPortalError && managementPortalParams) {
      return [`ERROR.${managementPortalParams}.${managementPortalError}`];
    }
    console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 69 ' , );
    if (error.error?.error) {
      return ['ERROR.' + error.error?.error];
    }
    console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 73 ' , );
    if (error.error) {
      console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 75 ' , [
        'ERROR.' +
        (error.error?.message ||
          error.error?.error_description ||
          error.error?.statusText ||
          error.message),
      ]);
        return [
          'ERROR.' +
            (error.error?.message ||
              error.error?.error_description ||
              error.error?.statusText ||
              error.message),
        ];
    }
    console.log('Class: ErrorService, Function: generateCustomErrorMessage, Line 83 ' , );
    return ['ERROR.' + error.status];
  }
}
