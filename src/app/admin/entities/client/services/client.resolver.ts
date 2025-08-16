import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { first, map, mergeMap } from 'rxjs/operators';

// import { ClientEntityService } from '../store/services/client.entity.service';
import { Store } from "@ngrx/store";
import { AdminActions } from "../../../store/action.types";
import { AppClient } from "../models/client";
import {ClientService} from "./client.service";

@Injectable({ providedIn: 'root' })
export class ClientResolver implements Resolve<AppClient> {
  // constructor(private entityService: ClientEntityService, private store: Store) {
    constructor(private entityService: ClientService, private store: Store) {
    // console.log(80, "ClientResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ): Observable<AppClient> | Promise<AppClient> | AppClient {
    return this.entityService.getByKey(route.params['id']);

    // // console.log(80, "ClientResolver resolve")
    //
    // return this.entityService.loaded$.pipe(
    //   mergeMap((loaded) => {
    //     if (!loaded) {
    //       return this.entityService.getAll();
    //     } else {
    //       return this.entityService.entities$;
    //     }
    //   }),
    //   map(
    //     (entities) =>
    //       entities.filter((e) => e.clientId === route.params['id'])[0]
    //   ),
    //   // tap(entity => console.log(80, "ClientResolver resolve entity", entity)),
    //   tap((entity) => {
    //     this.store.dispatch(
    //       AdminActions.clientSelected({ selectedClient: entity })
    //     );
    //   }),
    //   first()
    // );
  }
}
