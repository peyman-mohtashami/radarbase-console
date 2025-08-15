import {Inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {tap, withLatestFrom} from 'rxjs/operators';
import {UiActions} from "./action.types";
import {DOCUMENT} from "@angular/common";
import {Store} from "@ngrx/store";
import {UiState} from "./reducers";
import {isLightTheme, isMenuOpen} from "./ui.selectors";

@Injectable()
export class UiEffects {
  toggleTheme$;
  toggleMenu$;

  constructor(
    private store: Store<UiState>,
    private actions$: Actions,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.toggleTheme$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UiActions.toggleTheme),
          withLatestFrom(this.store.select(isLightTheme)),
          tap(([, isLightTheme]) => {
            if(isLightTheme){
              this.document.documentElement.classList.remove('dark');
              localStorage.setItem('theme', 'light');
            } else {
              this.document.documentElement.classList.add('dark');
              localStorage.setItem('theme', 'dark');
            }
          })
        ),{ dispatch: false }
    );

    this.toggleMenu$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(UiActions.toggleMenu),
          withLatestFrom(this.store.select(isMenuOpen)),
          tap(([, isMenuOpen]) => {
            localStorage.setItem('sidebar', isMenuOpen.toString());
          })
        ),
      { dispatch: false }
    );

  }
}
