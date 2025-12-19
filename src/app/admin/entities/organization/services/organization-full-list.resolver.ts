import {inject, Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {AppOrganization} from "../models/organization";
import {OrganizationService} from "./organization.service";

@Injectable({providedIn: 'root'})
export class OrganizationFullListResolver implements Resolve<AppOrganization[]> {
  private entityService = inject(OrganizationService);

  resolve(): Observable<AppOrganization[]> {
    return this.entityService.getWithQuery();
  }
}
