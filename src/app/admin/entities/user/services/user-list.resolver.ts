import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from 'rxjs';
import {AppUser} from "../models/user";
import {UserService} from './user.service';

@Injectable({ providedIn: 'root' })
export class UserListResolver implements Resolve<AppUser[]> {
  private entityService = inject(UserService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppUser[]> {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
