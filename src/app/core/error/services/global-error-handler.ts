import {ErrorHandler, inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
  snackBar = inject(MatSnackBar);

  handleError(error: Error | HttpErrorResponse): void {
    console.error(error);
    if (error instanceof HttpErrorResponse) {
      // server error
      if ([500, 503, 504].includes((error as HttpErrorResponse).status)) {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: this.extractServerErrorMessage(error),
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['rb-error-snackbar'],
        });
      }
    } else {
      // client error
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: [this.extractClientErrorMessage(error)],
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['rb-error-snackbar'],
      });
    }
  }

  private extractClientErrorMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'ERROR.noInternet';
    }
    if (error.message) {
      return error.message.slice(0, 150) + ' ...';
    } else {
      return error.toString().slice(0, 150) + ' ...';
    }
  }

  private extractServerErrorMessage(error: HttpErrorResponse): string[] {
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
      // case 400:
      // case 409:
      // case 500:
      //   return this.generateCustomErrorMessage(error);
      case 403:
        return [error.error.message, error.error.description, '403'];
      case 401:
        return this.generateCustomErrorMessage(error);
      case 440:
        return ['ERROR.sessionExpired'];
      default:
        return this.generateCustomErrorMessage(error);
    }
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
      return ['ERROR.' + (error.error.error || error.error.message || error.error.error_description || error.error.statusText || error.message || (error as unknown as { error_description?: string }).error_description || error.error)];
    }
  }
}
