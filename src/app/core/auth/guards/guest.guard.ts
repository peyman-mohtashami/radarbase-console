import {inject} from '@angular/core';
import {
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';

import {AuthService } from "../services/auth.service";
import {StorageService} from "../../storage/services/storage.service";

export const guestGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isUnauthenticated().pipe(
    tap((isLoggedOut) => {
      if (!isLoggedOut) {
        router.navigate([StorageService.getLastLocation() || '/admin']).then();
      }
    }),
  )
}
