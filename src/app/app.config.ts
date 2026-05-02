import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {provideCore} from './core/provideCore';
// import {provideMonacoEditor} from "ngx-monaco-editor-v2";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    importProvidersFrom(
      LoggerModule.forRoot({
        // serverLoggingUrl: '/api/logs',
        level: NgxLoggerLevel.DEBUG,
        // serverLogLevel: NgxLoggerLevel.ERROR
      }),
    ),
    // provideMonacoEditor({ baseUrl: '/assets/monaco/min/vs' }), //TODO only for protocol questionnaire builder
    provideCore(),
    provideRouter(routes)
  ]
};
