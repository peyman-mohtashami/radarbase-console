import {inject, makeEnvironmentProviders, provideAppInitializer} from "@angular/core";
import {ConfigService} from "./config/services/config.service";
import {ThemeService} from "./theme/services/theme.service";
import {firstValueFrom} from "rxjs";
import {provideStore} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {provideAuth} from "./auth/provideAuth";
import {uiReducer} from "./store/reducers";
import {UiEffects} from "./store/ui.effects";
import {provideConfig} from "./config/provideConfig";
import {provideError} from "./error/provideError";
import {provideLocale} from "./locale/provideLocale";

function configInitializerFn(configService: ConfigService, themeService: ThemeService) {
  return async () => {
    await firstValueFrom(configService.init());
    await firstValueFrom(themeService.init());
  };
}

export function provideCore() {
  return makeEnvironmentProviders([
    provideStore({}),
    provideEffects([]),
    provideAuth(),
    provideConfig(),
    provideError(),
    provideLocale(),

    provideAppInitializer(() => {
      const initializerFn = configInitializerFn(
        inject(ConfigService),
        inject(ThemeService)
      );
      return initializerFn();
    }),

    provideStore({ ui: uiReducer }),
    provideEffects([UiEffects]),
  ]);
}
