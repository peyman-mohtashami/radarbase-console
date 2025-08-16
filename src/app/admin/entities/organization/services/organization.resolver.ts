import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppOrganization } from "../models/organization";
import { OrganizationService } from './organization.service';
import {tap} from "rxjs/operators";
import { AdminActions } from '../../../store/action.types';

@Injectable({ providedIn: 'root' })
export class OrganizationResolver implements Resolve<AppOrganization> {
  constructor(
    private entityService: OrganizationService,
    private store: Store
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppOrganization>
    | Promise<AppOrganization>
    | AppOrganization {

    return this.entityService.getByKey(route.params['id']).pipe(
      tap((entity) =>
        this.store.dispatch(
          AdminActions.organizationSelected({ selectedOrganization: entity })
        )
      ),
    );
  }
}

