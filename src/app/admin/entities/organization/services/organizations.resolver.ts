import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {AppOrganization} from "../models/organization";
import {OrganizationService} from "./organization.service";

@Injectable({providedIn: 'root'})
export class OrganizationsResolver implements Resolve<AppOrganization[]> {
  private entityService = inject(OrganizationService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppOrganization[]> {
    return this.entityService.getWithQuery(route.queryParams);
  }
}
