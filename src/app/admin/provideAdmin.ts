import {
  EnvironmentProviders,
  makeEnvironmentProviders,
} from "@angular/core";
import {provideState} from "@ngrx/store";
import {adminReducer} from "./store/reducers";
import {provideRouter} from "@angular/router";
import {adminRoutes} from "./admin.routes";

export function provideAdmin(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState('admin', adminReducer),
    provideRouter(adminRoutes),
  ]);
}
