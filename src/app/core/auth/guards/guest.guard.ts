import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

import {AuthService } from "../services/auth.service";
import {LastUrlService} from '../../navigation-tracker/services/last-url.service';

export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.parseUrl(LastUrlService.getLastUrl() || '/admin');
  }
  return true;
}
