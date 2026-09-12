import {ErrorHandler, inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";


const MANAGEMENT_PORTAL_ERROR_HEADER = 'x-managementportalapp-error';
const MANAGEMENT_PORTAL_PARAMS_HEADER = 'x-managementportalapp-params';

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
  private readonly snackBar = inject(MatSnackBar);

  handleError(error: unknown): void {
    console.error(error);

    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) return;
      this.show(this.extractServerErrorMessage(error));
      return;
    }
    this.show([this.extractClientErrorMessage(error)]);
  }

  private show(messages: string[]): void {
    const data = messages.filter(Boolean);
    this.snackBar.openFromComponent(ErrorSnackbarComponent, {
      data: data.length ? data : ['ERROR.unknownError'],
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['rb-error-snackbar'],
    });
  }

  private extractClientErrorMessage(error: unknown): string {
    if (!navigator.onLine) {
      return 'ERROR.noInternet';
    }
    const message = error instanceof Error ? error.message : String(error);
    return message.slice(0, 150) + ' ...';
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
      case 440:
        return ['ERROR.sessionExpired'];
      case 403:
        return [error.error?.message, error.error?.description, '403'];
      default:
        return this.generateCustomErrorMessage(error);
    }
  }

  protected generateCustomErrorMessage(error: HttpErrorResponse): string[] {
    const managementPortalError = error.headers.get(MANAGEMENT_PORTAL_ERROR_HEADER);
    const managementPortalParams = error.headers.get(MANAGEMENT_PORTAL_PARAMS_HEADER);
    if (managementPortalError && managementPortalParams) {
      return [`ERROR.${managementPortalParams}.${managementPortalError}`];
    }

    const body = error.error;
    const detail =
      body?.error ||
      body?.message ||
      body?.error_description ||
      body?.statusText ||
      error.message ||
      (typeof body === 'string' ? body : undefined);

    return [detail ? `ERROR.${detail}` : 'ERROR.unknownError'];
  }
}
