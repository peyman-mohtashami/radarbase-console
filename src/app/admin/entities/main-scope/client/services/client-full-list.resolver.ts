import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class ClientFullListResolver implements Resolve<AppClient[]> {
  private entityService = inject(ClientService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient[]> {
    const scope = route.data['scope'];
    if (scope === 'global') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT, SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT]);
    } else if (scope === 'project') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT, ]);
    } else {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT]);
    }
    return this.entityService.getWithQuery();
  }
}
