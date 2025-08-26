import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AppOrganization} from "../models/organization";
import {OrganizationService} from './organization.service';

@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<AppOrganization> {
  constructor(private entityService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot):
    | Observable<AppOrganization>
    | Promise<AppOrganization>
    | AppOrganization {
    return this.entityService.getByKey(route.params['id'])
  }
}

