import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AuthActions } from './action.types';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  logoutPasswordGrant$;
  logoutSuccessPasswordGrant$;

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {
    this.logoutPasswordGrant$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logoutPasswordGrant),
          tap(() => {
            this.authService.logoutPasswordGrant().subscribe();
          })
        ),
      { dispatch: false }
    );

    this.logoutSuccessPasswordGrant$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.logoutSuccessPasswordGrant), //, AuthActions.logoutOnUnauthorized),
          tap(() => {
            this.router.navigate(['/login']).then();
          })
        ),
      { dispatch: false }
    );
  }
}
