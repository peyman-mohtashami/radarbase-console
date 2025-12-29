import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { SourceDataService } from './source-data.service';
import { AppSourceData } from "../models/source-data";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class SourceDataListResolver implements Resolve<AppSourceData[]> {
  private entityService = inject(SourceDataService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSourceData[]> {
    this.selectedEntitiesService.clearAllSelected();
    return this.entityService.getWithQuery(route.queryParams);
  }
}
