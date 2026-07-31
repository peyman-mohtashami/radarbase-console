import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {SourceStore} from './source.store';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<void> {
  private store = inject(SourceStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    this.store.applyQueryParams(route.queryParams);
    await this.store.getWithQuery();
  }
}
