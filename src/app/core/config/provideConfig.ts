import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {provideState} from "@ngrx/store";
import {configReducer} from "./store/reducers";

export function provideConfig(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState('config', configReducer),
  ]);
}
