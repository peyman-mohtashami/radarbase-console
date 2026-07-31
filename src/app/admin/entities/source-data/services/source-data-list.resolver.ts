import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {SourceDataStore} from './source-data.store';

@Injectable({providedIn: 'root'})
export class SourceDataListResolver implements Resolve<void> {
  private store = inject(SourceDataStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    this.store.applyQueryParams(route.queryParams);
    const res = await this.store.getWithQuery();
  }
}
