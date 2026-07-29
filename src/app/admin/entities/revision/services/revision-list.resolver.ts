import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RevisionService } from './revision.service';
import { AppRevision } from "../models/revision";
import {UserStore} from '../../user/services/user.store';
import {RevisionStore} from './revision.store';

@Injectable({ providedIn: 'root' })
export class RevisionListResolver implements Resolve<void> {
  private store = inject(RevisionStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
