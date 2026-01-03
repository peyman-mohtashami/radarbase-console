import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";

import {ProtocolService} from './protocol.service';
import {AppProtocol} from "../models/protocol";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class ProtocolListResolver implements Resolve<AppProtocol[]> {
  private entityService = inject(ProtocolService);
  private selectedEntitiesService = inject(SelectedEntitiesService);


  resolve(route: ActivatedRouteSnapshot): Observable<AppProtocol[]> {
    this.entityService.clearCache();

    const scope = route.data['scope'];
    if (scope === 'global') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT, SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT]);
    } else if (scope === 'project') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT, ]);
    } else {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT]);
    }

    const project = this.selectedEntitiesService.getSelected().project();
    const subject = this.selectedEntitiesService.getSelected().subject();
    return this.entityService.getWithQuery(route.queryParams, project?._name, subject?._name);
  }
}
