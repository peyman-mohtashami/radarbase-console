import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {UserStore} from './user.store';

@Injectable({ providedIn: 'root' })
export class UserListResolver implements Resolve<void> {
  private store = inject(UserStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    this.store.applyQueryParams(route.queryParams);
    await this.store.getWithQuery();
  }
}
