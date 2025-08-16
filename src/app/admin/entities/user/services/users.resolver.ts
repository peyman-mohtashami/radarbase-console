import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppUser } from "../models/user";
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<AppUser[]> {
  constructor(private entityService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppUser[]> | Promise<AppUser[]> | AppUser[] {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
