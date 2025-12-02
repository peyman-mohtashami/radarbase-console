import {inject} from '@angular/core';
import {
  Router,
  NavigationExtras,
} from '@angular/router';

import {AuthService} from "../services/auth.service";

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    const navigationExtras: NavigationExtras = {
      state: {
        error: 'requiredLogin',
      },
    };
    router.navigate(['/auth/login'], navigationExtras).then();
    return false;
  }
  return true;
}
