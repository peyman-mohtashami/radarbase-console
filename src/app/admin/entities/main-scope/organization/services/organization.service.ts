import {computed, inject, Injectable} from '@angular/core';
import {AppOrganization, RadarOrganization} from "../models/organization";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {filter, Observable, of, startWith} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrganizationConfigService} from './organization-config.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

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
  let current: ActivatedRoute | null = route;

  while (current) {
    if (key in current.snapshot.data) {
      return current.snapshot.data[key];
    }
    current = current.parent;
  }

  return null;
}

// export function injectRouteParam(name: string) {
//   const router = inject(Router);
//   const route = inject(ActivatedRoute);
//
//   const currentRoute = toSignal(
//     router.events.pipe(
//       filter((e): e is NavigationEnd => e instanceof NavigationEnd),
//       startWith(null),
//       map(() => route)
//     ),
//     { requireSync: true }
//   );
//
//   return computed(() => {
//     let current: ActivatedRoute | null = currentRoute();
//     console.log('Class: injectRouteParam, Function: , Line 79 current' , current);
//
//     while (current) {
//       const value = current.snapshot.paramMap.get(name);
//       if (value) {
//         return value;
//       }
//       current = current.firstChild;
//     }
//
//     return null;
//   });
// }
// export function findParam(route: ActivatedRoute, name: string): string | null {
//   let current: ActivatedRoute | null = route;
//
//   while (current) {
//     const value = current.snapshot?.paramMap.get(name);
//     if (value) {
//       return value;
//     }
//     current = current.firstChild ?? null;
//   }
//
//   return null;
// }
