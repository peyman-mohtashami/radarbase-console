import {inject, makeEnvironmentProviders, provideAppInitializer} from "@angular/core";
import {provideAuth} from "./auth/provideAuth";
import {provideError} from "./error/provideError";
import {provideLocale} from "./locale/provideLocale";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {LocaleService} from "./locale/services/locale.service";
import {RuntimeConfigTranslateLoader} from "./locale/runtime-config-translate.loader";
import {ConfigurationService} from './configuration/services/configuration.service';

function configInitializerFn(customizationService: ConfigurationService, localeService: LocaleService) {
  return async () => {
    await customizationService.init();
    await localeService.init();
  };
}

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    provideError(),
    provideLocale(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en'
    }),
    {provide: TranslateLoader, useClass: RuntimeConfigTranslateLoader},

    provideAppInitializer(() => {
      const initializerFn = configInitializerFn(
        inject(ConfigurationService),
        inject(LocaleService)
      );
      return initializerFn();
    }),
  ]);
}
