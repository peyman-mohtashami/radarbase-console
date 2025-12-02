import {inject} from '@angular/core';
import {
  Router,
} from '@angular/router';

import {AuthService } from "../services/auth.service";
import {StorageService} from "../../storage/services/storage.service";

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate([StorageService.getLastLocation() || '/admin']).then();
    return false;
  }
  return true;
}
