import {inject, makeEnvironmentProviders, provideAppInitializer} from "@angular/core";
import {ThemeService} from "./theme/services/theme.service";
import {firstValueFrom} from "rxjs";
import {provideAuth} from "./auth/provideAuth";
import {provideError} from "./error/provideError";
import {provideLocale} from "./locale/provideLocale";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {LocaleService} from "./locale/services/locale.service";
import {RuntimeConfigTranslateLoader} from "./locale/runtime-config-translate.loader";
import {AppCustomizationService} from "./app-customization/services/app-customization.service";


function configInitializerFn(customizationService: AppCustomizationService, themeService: ThemeService, localeService: LocaleService) {
  return async () => {
    await firstValueFrom(customizationService.init());
    themeService.init();
    localeService.init();
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
    { provide: TranslateLoader, useClass: RuntimeConfigTranslateLoader },

    provideAppInitializer(() => {
      const initializerFn = configInitializerFn(
        inject(AppCustomizationService),
        inject(ThemeService),
        inject(LocaleService)
      );
      return initializerFn();
    }),
  ]);
}
