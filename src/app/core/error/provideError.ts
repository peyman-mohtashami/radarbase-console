import {ErrorHandler, makeEnvironmentProviders} from "@angular/core";
import {GlobalErrorHandler} from "./services/global-error-handler";
import {provideState} from "@ngrx/store";
import {errorReducer} from "./store/reducers";

export function provideError() {
  return makeEnvironmentProviders([
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    provideState('error', errorReducer)
  ]);
}
