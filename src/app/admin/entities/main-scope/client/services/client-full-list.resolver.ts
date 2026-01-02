import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class ClientFullListResolver implements Resolve<AppClient[]> {
  private entityService = inject(ClientService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient[]> {
    const scope = route.data['scope'];
    if (scope === 'global') {
      this.selectedEntitiesService.clearAllSelected();
    } else if (scope === 'project') {
      this.selectedEntitiesService.selectedClient.set(undefined);
      this.selectedEntitiesService.selectedSubject.set(undefined);
    } else {
      this.selectedEntitiesService.selectedClient.set(undefined);
    }
    return this.entityService.getWithQuery();
  }
}
