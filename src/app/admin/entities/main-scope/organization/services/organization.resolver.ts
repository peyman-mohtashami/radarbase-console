import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {AppOrganization} from "../models/organization";
import {OrganizationService} from './organization.service';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<AppOrganization> {
  private entityService = inject(OrganizationService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<AppOrganization> {
    const organizationId = route.paramMap.get('organizationId')!;
    return this.entityService.getByKey(organizationId).pipe(
      catchError(() => {
        this.router.navigate(['/']).then(() => {
          throw new Error(`ADMIN.organization.error.notFound`);
        });
        throw new Error();
      })
    );
  }
}

