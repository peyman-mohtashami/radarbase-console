import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {PermissionStore} from './permission.store';

@Injectable({ providedIn: 'root' })
export class PermissionListResolver implements Resolve<void> {
  private store = inject(PermissionStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    await this.store.getAll();
    this.store.applyQueryParams(route.queryParams);
  }
}
