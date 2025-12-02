import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";
import { AppClient } from "../models/client";
import {ClientService} from "./client.service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient> {
  private entityService = inject(ClientService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppClient> | Promise<AppClient> | AppClient {
    return this.entityService.getAll().pipe(
      map(clients => {
        const client = clients.find(client => client.clientId === route.params['id']);
        if (client) {
          return client;
        } else {
          throw new Error('Client not found');
        }
      })
    )
  }
}
