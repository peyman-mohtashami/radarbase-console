import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {SubjectStore} from './subject.store';

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<void> {
  private store = inject(SubjectStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    this.store.applyQueryParams(route.queryParams);
    await this.store.getWithQuery();
  }
}
