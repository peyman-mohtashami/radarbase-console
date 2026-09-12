import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import { AuthService } from "../services/auth.service";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data['allowedRoles'];

  if (!authService.isAuthorized(allowedRoles)) {
    return router.parseUrl('/admin');
  }
  return true;
}
