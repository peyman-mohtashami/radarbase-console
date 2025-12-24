import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { RevisionService } from './revision.service';
import { AppRevision } from "../models/revision";
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class RevisionListResolver implements Resolve<AppRevision[]> {
  private entityService = inject(RevisionService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppRevision[]> {
    this.selectedEntitiesService.clearAllSelected();
    return this.entityService.getWithQuery(route.queryParams);
  }
}
