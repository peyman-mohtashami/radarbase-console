import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';

import {AppOrganization} from "../models/organization";
import {OrganizationStore} from './organization.store';

@Injectable({providedIn: 'root'})
export class OrganizationResolver implements Resolve<AppOrganization | null> {
  private store = inject(OrganizationStore);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot): Promise<AppOrganization | null> {
    const organizationId = route.paramMap.get('organizationId')!;
    await this.store.getByKey(organizationId);

    const organization = this.store.selected();

    if (!organization) await this.router.navigate(['/admin/organizations']);
    return organization;
  }
}

