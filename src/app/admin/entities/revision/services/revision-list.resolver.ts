import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {RevisionStore} from './revision.store';

@Injectable({ providedIn: 'root' })
export class RevisionListResolver implements Resolve<void> {
  private store = inject(RevisionStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    this.store.applyQueryParams(route.queryParams);
    const res = await this.store.getWithQuery();
    if (res) this.store.selected.set(null);
  }
}
