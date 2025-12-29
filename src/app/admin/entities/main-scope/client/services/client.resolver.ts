import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";
import { AppClient } from "../models/client";
import {ClientService} from "./client.service";
import {map} from "rxjs/operators";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient> {
  private entityService = inject(ClientService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient> {
    return this.entityService.getWithQuery().pipe(
      map(clients => {
        const client = clients.find(client => client.clientId === route.params['id']);
        if (client) {
          this.selectedEntitiesService.setSelectedClient(client);
          return client;
        } else {
          throw new Error('Client not found');
        }
      })
    )
  }
}
