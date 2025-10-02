import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";
import { AppClient } from "../models/client";
import {ClientService} from "./client.service";

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient> {
  private entityService = inject(ClientService);

  resolve(
    route: ActivatedRouteSnapshot,
  ): Observable<AppClient> | Promise<AppClient> | AppClient {
    return this.entityService.getByKey(route.params['id']);
  }
}
