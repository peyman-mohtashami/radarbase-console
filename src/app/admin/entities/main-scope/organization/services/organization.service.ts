import {inject, Injectable} from '@angular/core';
import {AppOrganization, RadarOrganization} from "../models/organization";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrganizationConfigService} from './organization-config.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from '@angular/router';

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


export function findRouteData(
  route: ActivatedRoute,
  key: string
): any {
  console.log('Class: findRouteData, Function: findRouteData, Line 51 ' , );
  let current: ActivatedRoute | null = route;

  while (current) {
    console.log('Class: findRouteData, Function: findRouteData, Line 55 current' , current);
    if (key in current.snapshot.data) {
      return current.snapshot.data[key];
    }
    current = current.parent;
    console.log('Class: findRouteData, Function: findRouteData, Line 60 current' , current);
  }

  return null;
}


// Works from a root-provided service — walks DOWN the whole tree.
export function findRouteDataFromRoot(router: Router, key: string): any {
  const stack: ActivatedRouteSnapshot[] = [router.routerState.snapshot.root];
  while (stack.length) {
    const node = stack.pop()!;
    if (key in node.data) return node.data[key];
    stack.push(...node.children);
  }
  return null;
}
