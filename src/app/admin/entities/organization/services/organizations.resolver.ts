import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { AppOrganization } from "../models/organization";
import {OrganizationService} from "./organization.service";

@Injectable({ providedIn: 'root' })
export class OrganizationsResolver implements Resolve<AppOrganization[]> {
  constructor(private entityService: OrganizationService) {
    console.log(1, "OrganizationsResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<AppOrganization[]>
    | Promise<AppOrganization[]>
    | AppOrganization[] {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
