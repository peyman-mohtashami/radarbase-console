import {inject, Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AppOrganization} from "../models/organization";
import {OrganizationService} from './organization.service';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<AppOrganization> {
  private entityService = inject(OrganizationService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot):
    | Observable<AppOrganization>
    | Promise<AppOrganization>
    | AppOrganization {
    return this.entityService.getAll().pipe(
      map(entities => {
        const entity = entities.find(entity =>
          entity.name === route.paramMap.get('organizationId'))
        if (entity) {
          return entity;
        } else {
          this.router.navigate(['/']).then(() => {
            throw new Error(`Organization with name: ${route.paramMap.get('organizationId')} not found`)
          });
          throw new Error();
        }
      }));
    // return this.entityService.getByKey(route.params['id'])
  }
}

