import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocaleActions } from './action.types';
import { localeService } from '../services/locale.service';

@Injectable()
export class LocaleEffects {
  switchLocale$;

  constructor(
    private actions$: Actions,
    private localeService: localeService
  ) {
    this.switchLocale$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(LocaleActions.switchLanguage),
          tap((action) => {
            // change html dir
            document.dir = action.currentLanguage.direction || 'ltr';
            this.localeService.registerCulture(action.currentLanguage);
          })
        ),
      { dispatch: false }
    );

  }
}
