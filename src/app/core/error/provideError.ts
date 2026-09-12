import {EnvironmentProviders, ErrorHandler, makeEnvironmentProviders} from "@angular/core";
import {GlobalErrorHandler} from "./services/global-error-handler";

export function provideError(): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
  ]);
}
