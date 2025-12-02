import {ErrorHandler, makeEnvironmentProviders} from "@angular/core";
import {GlobalErrorHandler} from "./services/global-error-handler";

export function provideError() {
  return makeEnvironmentProviders([
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
  ]);
}
