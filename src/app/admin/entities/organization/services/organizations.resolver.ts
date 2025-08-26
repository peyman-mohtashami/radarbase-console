import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from "rxjs";
import { AppOrganization } from "../models/organization";
import {OrganizationService} from "./organization.service";

@Injectable({ providedIn: 'root' })
export class OrganizationsResolver implements Resolve<AppOrganization[]> {
  constructor(private entityService: OrganizationService) {}

  resolve():
    | Observable<AppOrganization[]>
    | Promise<AppOrganization[]>
    | AppOrganization[] {
    return this.entityService.getAll();
  }
}
