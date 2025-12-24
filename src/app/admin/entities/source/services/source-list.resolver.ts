import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import { AppSource } from "../models/source";
import {SourceService} from './source.service';
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class SourceListResolver implements Resolve<AppSource[]> {
  private entityService = inject(SourceService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppSource[]> {
    this.selectedEntitiesService.selectedSubject.set(undefined);
    this.selectedEntitiesService.selectedClient.set(undefined);

    this.entityService.clearCache();

    const project = this.selectedEntitiesService.selectedProject();
    return this.entityService.getWithQuery(route.queryParams, project?.projectName);
  }
}
