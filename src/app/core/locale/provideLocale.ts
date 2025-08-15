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
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter
} from "@angular/material-moment-adapter";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomMatPaginatorIntl} from "./services/custom-mat-paginator-intl";
import {map} from "rxjs/operators";

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
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
  ]);
}
