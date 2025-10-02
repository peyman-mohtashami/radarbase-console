import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from "../models/user";
import {PermissionService} from "./permission.service";

@Injectable({ providedIn: 'root' })
export class PermissionResolver implements Resolve<AppUser> {
  private entityService = inject(PermissionService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppUser> | Promise<AppUser> | AppUser {
    return this.entityService.getByKey(route.params['id']);
  }
}
