import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideTranslateService, TranslateLoader} from '@ngx-translate/core';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideEntityData} from '@ngrx/data';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {provideCore} from './core/provideCore';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {metaReducers, reducers} from './store/reducers';

export const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => {
  console.log('Class: , Function: httpLoaderFactory, Line 31 ' , );
  // return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
  return new TranslateHttpLoader();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideAnimations(),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
      // withInterceptors([loggingInterceptor, cachingInterceptor]),
    ),
    // provideHttpClient(),
    provideTranslateService({
      defaultLanguage: 'en',
      // loader: {
      //   provide: TranslateLoader,
      //   useFactory: httpLoaderFactory,
      //   deps: [HttpClient],
      // },
    }),
    provideStore(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    provideEffects([]),
    // provideEntityData(entityConfig),
    // provideEntityData({entityMetadata: entityMetaData}),
    // provideEntityData({}),
    provideEntityData({
      // entityMetadata: {
      //   RadarOrganization: {
      //     entityDispatcherOptions: {},
      //     selectId: (org) => org.id,
      //   },
      // },
    }),
    importProvidersFrom(
      //     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production , connectInZone: true}),
      LoggerModule.forRoot({
        // serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        // serverLogLevel: NgxLoggerLevel.ERROR
      }),
      //     CoreModule,
      //     SharedModule,
      //     AdminModule
    ),
    provideCore(),
    //provideAdmin(),
    provideRouter(routes)
  ]
};
