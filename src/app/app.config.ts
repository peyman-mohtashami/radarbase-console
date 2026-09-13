import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {provideCore} from './core/provideCore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withXhr(),
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      LoggerModule.forRoot({
        level: NgxLoggerLevel.DEBUG,
      }),
    ),
    provideCore(),
    provideRouter(routes, withRouterConfig({
      paramsInheritanceStrategy: 'always'
    }))
  ]
};
