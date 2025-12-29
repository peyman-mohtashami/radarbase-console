import {inject, Injectable} from '@angular/core';
import {AppOrganization, RadarOrganization} from "../models/organization";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrganizationConfigService} from './organization-config.service';

@Injectable({providedIn: 'root'})
export class OrganizationService extends BaseEntityService<AppOrganization, RadarOrganization> {
  override configService = inject(OrganizationConfigService);

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

  override getByKey(key: number | string): Observable<AppOrganization> {
    if (!this.cacheLoaded) {
      return this.getWithQuery().pipe(map(items => items.find(item => item._name === key)!));
    }
    const organization = this.cache.find(item => item._name === key)
    if (!organization) throw new Error(`Organization with id ${key} not found`);
    return of(organization);
  }

  override getEntity(key: number | string): AppOrganization {
    const organization = this.cache.find(item => item._name === key);
    if (!organization) throw new Error(`Organization with id ${key} not found`);
    return organization;
  }
}
