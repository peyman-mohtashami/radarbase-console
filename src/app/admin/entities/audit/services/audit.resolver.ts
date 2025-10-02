import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuditService } from './audit.service';
import { AppAudit } from "../models/audit";

@Injectable({ providedIn: 'root' })
export class AuditResolver implements Resolve<AppAudit[]> {
  private entityService = inject(AuditService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppAudit[]> | Promise<AppAudit[]> | AppAudit[] {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
