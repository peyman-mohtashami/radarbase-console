import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';
import {Observable} from "rxjs";
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient> {
  private entityService = inject(ClientService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient> {
    return this.entityService.getWithQuery().pipe(
      map(clients => {
        const client = clients.find(client => client.clientId === route.params['clientId']);
        if (client) {
          return client;
        } else {
          throw new Error('Client not found');
        }
      })
    )
  }
}
