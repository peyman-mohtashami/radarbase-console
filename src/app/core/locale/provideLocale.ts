import {
  EnvironmentProviders,
  makeEnvironmentProviders,
} from "@angular/core";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./services/custom-mat-paginator-intl";
import {DateFnsAdapter, MAT_DATE_FNS_FORMATS} from '@angular/material-date-fns-adapter';
import { enGB } from 'date-fns/locale';

export function provideLocale(): EnvironmentProviders {
  return makeEnvironmentProviders([
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
