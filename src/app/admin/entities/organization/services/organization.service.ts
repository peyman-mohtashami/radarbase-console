import {Injectable} from '@angular/core';
import {AppOrganization, RadarOrganization} from "../models/organization";
import {BaseEntityService} from '../../../services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class OrganizationService extends BaseEntityService<AppOrganization, RadarOrganization> {

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/organizations`;
  }

  override toAppModel(entity: RadarOrganization): AppOrganization {
    return {
      ...entity,
      _name: entity.name,
      _search: `${entity.name} ${entity.description} ${entity.location}`,
    };
  }

  override toRadarModel(entity: AppOrganization): RadarOrganization {
    return entity;
  }
}
