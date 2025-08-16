import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { QueryParams } from '@ngrx/data';

import { ProtocolService } from './protocol.service';
import { select, Store } from "@ngrx/store";
import { project } from "../../../store/admin.selectors";
import { filter, mergeMap } from "rxjs/operators";
import { AdminActions } from "../../../store/action.types";
import { AppClient } from "../../client/models/client";
import { AppProtocol } from "../models/protocol";

@Injectable({providedIn: 'root'})
export class ProtocolsResolver implements Resolve<AppProtocol[]> {
  constructor(private entityService: ProtocolService, private store: Store) {
    console.log(8, "ProtocolsResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppProtocol[]>
    | Promise<AppProtocol[]>
    | AppProtocol[] {
    console.log(8, "ProtocolsResolver resolve")

    this.store.dispatch(
      AdminActions.clientSelected({ selectedClient: {clientId: "aRMT"} as AppClient })
    );

    const params: QueryParams = { ...route.queryParams };

    const project$ = this.store.pipe(
      select(project),
      filter(project => project !== undefined)
    );

    return project$.pipe(
      mergeMap(() => this.entityService.getWithQuery(params)),
      tap(entities => console.log(8, "ProtocolsResolver resolve entities", entities)),
    )
  }
}
