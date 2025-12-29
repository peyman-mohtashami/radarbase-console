import {inject} from '@angular/core';
import {
  Router,
} from '@angular/router';

import {AuthService } from "../services/auth.service";
import {LastUrlService} from '../../navigation-tracker/services/last-url.service';

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate([LastUrlService.getLastUrl() || '/admin']).then();
    return false;
  }
  return true;
}
