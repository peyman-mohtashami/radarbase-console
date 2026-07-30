import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {ClientStore} from './client.store';

@Injectable({providedIn: 'root'})
export class ClientListResolver implements Resolve<void> {
  private store = inject(ClientStore);

  async resolve(route: ActivatedRouteSnapshot) {
    const res = await this.store.getAll();
    this.store.applyQueryParams(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
