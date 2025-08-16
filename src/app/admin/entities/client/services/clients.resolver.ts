import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

// import { ClientEntityService } from '../store/services/client.entity.service';
import { AppClient } from "../models/client";
import {ClientService} from "./client.service";

@Injectable({ providedIn: 'root' })
export class ClientsResolver implements Resolve<AppClient[]> {
  // constructor(private entityService: ClientEntityService) {}
  constructor(private entityService: ClientService) {}

  resolve(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppClient[]>
    | Promise<AppClient[]>
    | AppClient[] {
    return this.entityService.getWithQuery(route.queryParams);

    // return this.entityService.loaded$.pipe(
    //   mergeMap((loaded) => {
    //     if (!loaded) {
    //       return this.entityService.getAll();
    //     } else {
    //       return this.entityService.entities$;
    //     }
    //   }),
    //   first()
    // );
  }
}
