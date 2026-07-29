import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {GroupStore} from './group.store';

@Injectable({ providedIn: 'root' })
export class GroupListResolver implements Resolve<void> {
  private store = inject(GroupStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);

    // const projectId = route.paramMap.get('projectId');
    // return this.entityService.getWithQuery(route.queryParams, projectId ?? undefined);
  }
}
