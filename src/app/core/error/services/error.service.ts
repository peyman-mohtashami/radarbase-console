import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
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
    const managementPortalError = error.headers.get(
      'x-managementportalapp-error'
    );
    const managementPortalParams = error.headers.get(
      'x-managementportalapp-params'
    );
    if (managementPortalError && managementPortalParams) {
      return [`ERROR.${managementPortalParams}.${managementPortalError}`];
    } else {
      // console.log(error.error?.error);
      if (error.error?.error) {
        return ['ERROR.' + error.error?.error];
      } else {
        if (error.error) {
          return [
            'ERROR.' +
              (error.error?.message ||
                error.error?.error_description ||
                error.error?.statusText ||
                error.message),
          ];
        } else {
          return ['ERROR.' + error.status];
        }
      }
    }
  }
}
