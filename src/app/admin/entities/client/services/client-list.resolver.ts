import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {AppClient} from "../models/client";
import {ClientService} from "./client.service";

@Injectable({providedIn: 'root'})
export class ClientListResolver implements Resolve<AppClient[]> {
  private entityService = inject(ClientService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppClient[]> {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
