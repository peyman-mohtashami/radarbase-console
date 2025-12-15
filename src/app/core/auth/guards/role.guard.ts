import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from "../services/auth.service";

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const allowedRoles: string[] = route.data['allowedRoles'];

  const isAllowed = authService.isAuthorized(allowedRoles);
  if (!isAllowed) {
    router.navigate(['admin']).then();
    return false;
  }
  return true;
}
