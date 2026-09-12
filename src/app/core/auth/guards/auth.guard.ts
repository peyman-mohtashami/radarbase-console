import {inject} from '@angular/core';
import {Router, NavigationExtras, CanActivateFn} from '@angular/router';

import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  const navigationExtras: NavigationExtras = {
    state: {
      error: 'requiredLogin',
    },
  };
  void router.navigate(['/auth/login'], navigationExtras);
  return false;
}
