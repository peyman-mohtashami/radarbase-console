import {ErrorHandler, inject, Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
  private snackBar = inject(MatSnackBar);

  handleError(error: Error | HttpErrorResponse): void {
    console.error(error);

    if (error instanceof HttpErrorResponse) {
      // 401 is handled by ServerErrorInterceptor (clears the session and redirects
      // to login), so showing an error snackbar on top of that would be noise.
      if (error.status === 401) return;
      this.show(this.extractServerErrorMessage(error));
    } else {
      this.show([this.extractClientErrorMessage(error)]);
    }
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

  private extractClientErrorMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'ERROR.noInternet';
    }
    const message = error.message || error.toString();
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
    const managementPortalError = error.headers.get(
      'x-managementportalapp-error'
    );
    const managementPortalParams = error.headers.get(
      'x-managementportalapp-params'
    );
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
