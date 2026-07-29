import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {UserStore} from './user.store';

@Injectable({ providedIn: 'root' })
export class UserListResolver implements Resolve<void> {
  private store = inject(UserStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
