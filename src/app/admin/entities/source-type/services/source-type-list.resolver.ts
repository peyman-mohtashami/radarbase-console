import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {SourceTypeStore} from './source-type.store';

@Injectable({providedIn: 'root'})
export class SourceTypeListResolver implements Resolve<void> {
  private store = inject(SourceTypeStore);

  async resolve(route: ActivatedRouteSnapshot) {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
