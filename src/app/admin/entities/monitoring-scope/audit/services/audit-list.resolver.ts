import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuditService } from './audit.service';
import { AppAudit } from "../models/audit";
import {tap} from 'rxjs/operators';
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class AuditListResolver implements Resolve<AppAudit[]> {
  private entityService = inject(AuditService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppAudit[]> {
    return this.entityService.getWithQuery(route.queryParams).pipe(
      tap(() => {
        this.selectedEntitiesService.clearSelected([SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT, SelectedEntities.SUBJECT, SelectedEntities.CLIENT]);
      })
    );
  }
}
