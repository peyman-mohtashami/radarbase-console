import {ErrorHandler, inject, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
// import {NotificationActions} from "../../rb-notification/store/action.types";
// import {Store} from "@ngrx/store";
// import {LogService} from "../../log/services/log.service";
// import {ErrorDisplayType} from "../enums/error.enum";
import {AppError} from "../models/error.model";
// import {appClientErrorOccurred, appServerErrorOccurred} from "../store/error.actions";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorSnackbarComponent} from "../components/error-snackbar/error-snackbar.component";

@Injectable({providedIn: 'root'})
export class GlobalErrorHandler implements ErrorHandler {
  errorService = inject(ErrorService);
  snackBar = inject(MatSnackBar);

  handleError(error: Error | HttpErrorResponse): void {
    console.log('Class: GlobalErrorHandler, Function: handleError, Line 17 error' , error.name, error.message);
    let appError: AppError;
    if (!(error instanceof HttpErrorResponse)) {
      console.log('Class: GlobalErrorHandler, Function: handleError, Line 19 ', 'Client Error');
      appError = {
        message: [this.extractClientErrorMessage(error)],
      };
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: appError,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        panelClass: ['rb-error-snackbar'],
      });
      this.errorService.error.set(appError);
      // this.store.dispatch(appClientErrorOccurred({error: appError}));
    } else {
      const m = this.extractServerErrorMessage(error)
      console.log('Class: GlobalErrorHandler, Function: handleError, Line 35 m' , m);
      appError = {
        message: m, //this.extractServerErrorMessage(error),
      };
      if ([400, 500].includes((error as HttpErrorResponse).status)) {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: appError,
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          panelClass: ['rb-error-snackbar'],
        });
      }
      console.log('Class: GlobalErrorHandler, Function: handleError, Line 21 ', 'Server Error');
      this.errorService.error.set(appError);
      // this.store.dispatch(appServerErrorOccurred({error: appError}));
    }

    // const displayType = ErrorDisplayType.Snackbar;
    //
    // const appError: AppError = {
    //   message: this.extractMessage(error),
    //   displayType,
    //   code: "AAA" //error?.status || 'UNKNOWN'
    // };


    // throw new Error('Method not implemented.');
  }


  // handle(error: any, displayType: ErrorDisplayType = ErrorDisplayType.Notification): void {
  //   const appError: AppError = {
  //     message: this.extractMessage(error),
  //     displayType,
  //     code: error?.status || 'UNKNOWN'
  //   };
  //   this.store.dispatch(appErrorOccurred({ error: appError }));
  // }

  private extractMessage(error: any): string {
    if (typeof error === 'string') return error;
    return error?.message || 'An unknown error occurred';
  }

  private extractClientErrorMessage(error: Error): string {
    console.log(error);
    if (!navigator.onLine) {
      return 'ERROR.noInternet';
    }
    // const errorMessage = 'ERROR.clientError';
    if (error.message) {
      return error.message.slice(0, 150) + ' ...';
    } else {
      return error.toString().slice(0, 150) + ' ...';
    }
  }


  // // Error handling is important and needs to be loaded first.
  // // Because of this we should manually inject the services with Injector.
  // constructor(private injector: Injector) {}
  //
  // handleError(error: Error | HttpErrorResponse) {
  //   const errorService = this.injector.get(ErrorService);
  //   const logger = this.injector.get(LogService);
  //   const store = this.injector.get(Store)
  //
  //   let message = [''];
  //   if (!(error instanceof HttpErrorResponse)) {
  //     // Client Error
  //     message = errorService.getClientMessage(error);
  //     store.dispatch(NotificationActions.setError({error: message}))
  //
  //     logger.logError(error); //message, stackTrace);
  //   } else {
  //     logger.logInfo(error);
  //   }
  //
  //   // Always log errors
  //   // logger.logError(message, stackTrace);
  //
  //   if (message.length) {
  //     // console.log('Global Error:', error.name, error.message);
  //   }
  // }

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
      case 400:
      case 409:
      case 500:
        return this.generateCustomErrorMessage(error);
      case 403:
        return [error.error.message, error.error.description, '403'];
      case 401:
        return this.generateCustomErrorMessage(error);//[]; //["ADMIN.error.loginRequired"]; //["You are not logged in or your session expired."];
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
    console.log('Class: GlobalErrorHandler, Function: generateCustomErrorMessage, Line 144 error' , error);
    const managementPortalError = error.headers.get(
      'x-managementportalapp-error'
    );
    const managementPortalParams = error.headers.get(
      'x-managementportalapp-params'
    );
    if (managementPortalError && managementPortalParams) {
      console.log('Class: GlobalErrorHandler, Function: generateCustomErrorMessage, Line 152 ' , );
      return [`ERROR.${managementPortalParams}.${managementPortalError}`];
    } else {
      console.log('Class: GlobalErrorHandler, Function: generateCustomErrorMessage, Line 155 ' , );
      return ['ERROR.' + (error.error.error || error.error.message || error.error.error_description || error.error.statusText || error.message || (error as any).error_description || error.error)];
    }
  }
}
