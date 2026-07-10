import {inject, makeEnvironmentProviders, provideAppInitializer} from "@angular/core";
import {ThemeService} from "./theme/services/theme.service";
import {provideAuth} from "./auth/provideAuth";
import {provideError} from "./error/provideError";
import {provideLocale} from "./locale/provideLocale";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {LocaleService} from "./locale/services/locale.service";
import {RuntimeConfigTranslateLoader} from "./locale/runtime-config-translate.loader";
import {ConfigurationService} from './configuration/services/configuration.service';
import {LastUrlService} from './navigation-tracker/services/last-url.service';

function configInitializerFn(_lastUrlService: LastUrlService, customizationService: ConfigurationService, themeService: ThemeService, localeService: LocaleService) {
  return async () => {
    await customizationService.init();
    themeService.init();
    localeService.init();
  };
}

export function provideCore() {
  return makeEnvironmentProviders([
    provideAuth(),
    // provideError(),
    provideLocale(),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en'
    }),
    { provide: TranslateLoader, useClass: RuntimeConfigTranslateLoader },

    provideAppInitializer(() => {
      const initializerFn = configInitializerFn(
        inject(LastUrlService),
        inject(ConfigurationService),
        inject(ThemeService),
        inject(LocaleService)
      );
      return initializerFn();
    }),
  ]);
}
