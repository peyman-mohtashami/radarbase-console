import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {SourceStore} from './source.store';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<void> {
  private store = inject(SourceStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
