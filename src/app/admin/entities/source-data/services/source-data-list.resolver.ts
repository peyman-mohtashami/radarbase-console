import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs';

import {SourceDataService} from './source-data.service';
import {AppSourceData} from "../models/source-data";
import {ClientStore} from '../../client/services/client.store';

@Injectable({providedIn: 'root'})
export class SourceDataListResolver implements Resolve<void> {
  private store = inject(ClientStore);

  private entityService = inject(SourceDataService);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
    // return this.entityService.getWithQuery(route.queryParams);
  }
}
