import {inject} from '@angular/core';
import {
  Router,
  NavigationExtras,
} from '@angular/router';
import {tap} from 'rxjs/operators';

import {AuthService} from "../services/auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated()
    .pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          const navigationExtras: NavigationExtras = {
            state: {
              error: 'requiredLogin',
            },
          };
          router.navigate(['login'], navigationExtras).then();
        }
      })
    )
}
