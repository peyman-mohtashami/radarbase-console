import {inject, Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {AppOrganization} from "../models/organization";
import {OrganizationService} from './organization.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<AppOrganization> {
  private entityService = inject(OrganizationService);

  resolve(route: ActivatedRouteSnapshot):
    | Observable<AppOrganization>
    | Promise<AppOrganization>
    | AppOrganization {
    return this.entityService.getAll().pipe(
      map(entities => {
        const entity = entities.find(entity =>
          entity.name === route.params['organizationId'])
        if (entity) {
          return entity;
        } else {
          throw new Error('Entity not found');
        }
      }));
    // return this.entityService.getByKey(route.params['id'])
  }
}

