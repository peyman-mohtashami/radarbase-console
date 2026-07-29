import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {LogStore} from './log.store';

@Injectable({providedIn: 'root'})
export class LogListResolver implements Resolve<void> {
  private store = inject(LogStore);

  async resolve(route: ActivatedRouteSnapshot) {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
