import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer
} from "@angular/core";
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {localeReducer} from "./store/reducers";
import {LocaleEffects} from "./store/locale.effects";
import {localeService} from "./services/locale.service";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./services/custom-mat-paginator-intl";
import {map} from "rxjs/operators";
import {DateFnsAdapter, MAT_DATE_FNS_FORMATS} from '@angular/material-date-fns-adapter';
import { enGB } from 'date-fns/locale';

const localeInitializerFn = (localeService: localeService) => {
  return () => localeService.init().pipe(map(() => true));
};

export function provideLocale(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState('locale', localeReducer),
    provideEffects([LocaleEffects]),
    provideAppInitializer(() => {
      const initializerFn = localeInitializerFn(inject(localeService));
      return initializerFn();
    }),
    { provide: MAT_DATE_LOCALE, useValue: enGB },
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FNS_FORMATS },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ]);
}
