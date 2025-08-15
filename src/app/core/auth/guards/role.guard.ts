import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from "../services/auth.service";

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const allowedRoles: string[] = route.data['allowedRoles'];

  return authService.isAuthorized(allowedRoles).pipe(
    tap((isAllowed) => {
      if (!isAllowed) {
        router.navigate(['admin']).then();
      }
    })
  )
}
