import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {ConfigStore} from './config.store';

@Injectable({ providedIn: 'root' })
export class ConfigListResolver implements Resolve<void> {
  private store = inject(ConfigStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getAll();
    this.store.applyQueryParams(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
