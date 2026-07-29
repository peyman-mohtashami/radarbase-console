import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuditService } from './audit.service';
import { AppAudit } from "../models/audit";
import {RevisionStore} from '../../../revision/services/revision.store';
import {AuditStore} from './audit.store';

@Injectable({ providedIn: 'root' })
export class AuditListResolver implements Resolve<void> {
  private store = inject(AuditStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const res = await this.store.getWithQuery(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
