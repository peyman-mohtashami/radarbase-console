import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import {ConfigService} from './config.service';
import {AppConfig} from "../models/config";
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class ConfigListResolver implements Resolve<AppConfig[]> {
  private entityService = inject(ConfigService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppConfig[]> {
    this.entityService.clearCache();
    const client = this.selectedEntitiesService.selectedClient();
    const project = this.selectedEntitiesService.selectedProject();
    const subject = this.selectedEntitiesService.selectedSubject();

    return this.entityService.getWithQuery(
      route.queryParams,
      client?._name,
      project?._name,
      subject?.login
    );
  }
}
