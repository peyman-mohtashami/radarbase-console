import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class ClientListResolver implements Resolve<AppClient[]> {
  private entityService = inject(ClientService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient[]> {
    this.selectedEntitiesService.clearAllSelected();
    return this.entityService.getWithQuery(route.queryParams);
  }
}
