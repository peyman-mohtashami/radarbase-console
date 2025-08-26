import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot, Params,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { QueryParams } from '@ngrx/data';

import { ConfigService } from './config.service';
import { select, Store } from "@ngrx/store";
// import { client, project } from "../../../store/admin.selectors";
import { filter, mergeMap } from "rxjs/operators";
import {AppConfig} from "../models/config";

@Injectable({ providedIn: 'root' })
export class ConfigsResolver implements Resolve<AppConfig[]> {
  constructor(private entityService: ConfigService, private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  ):
    | Observable<AppConfig[]>
    | Promise<AppConfig[]>
    | AppConfig[] {
    // const params: QueryParams = { ...route.queryParams };
    const clientId = route.params['id'];
    const projectId = route.parent?.parent?.parent?.parent?.params['id'];
    const params: Params = {id: clientId, projectId: projectId};
    // console.log('Class: ConfigsResolver, Function: resolve, Line 30 params' , params);
    // console.log('Class: ConfigsResolver, Function: resolve, Line 31 route.parent?.parent?.parent?.parent?.params' , route.parent?.parent?.parent?.parent?.params);
    // console.log('Class: ConfigsResolver, Function: resolve, Line 29 params' , params);

    // const project$ = this.store.pipe(
    //   select(project),
    //   filter(project => project !== undefined)
    // );
    //
    // const client$ = this.store.pipe(
    //   select(client),
    //   filter(client => !!client)
    // );
    //
    // const projectAndClient$ = project$.pipe(
    //   mergeMap(() => client$)
    // )

    // return projectAndClient$.pipe(
    //   mergeMap(() => this.entityService.getWithQuery(params)),
    // )
    return this.entityService.getWithQuery(params);
    // return [];
  }
}
