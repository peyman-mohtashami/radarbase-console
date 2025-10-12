import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideTranslateService} from '@ngx-translate/core';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideEntityData} from '@ngrx/data';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {provideCore} from './core/provideCore';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {metaReducers, reducers} from './store/reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      })
    }),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    provideEffects([]),
    provideEntityData({
    }),
    importProvidersFrom(
      //     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
      LoggerModule.forRoot({
        // serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        // serverLogLevel: NgxLoggerLevel.ERROR
      }),
    ),
    provideCore(),
    provideRouter(routes)
  ]
};
