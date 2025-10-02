import {inject, Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AppOrganization, RadarOrganization} from "../models/organization";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrganizationService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/organizations';

  toAppModel(entity: RadarOrganization): AppOrganization {
    return {
      ...entity,
      _name: entity.name,
      _search: `${entity.name} ${entity.description} ${entity.location}`,
    };
  }

  toRadarModel(entity: AppOrganization): RadarOrganization {
    const radarOrganization: RadarOrganization = {...entity, _name: undefined};
    return { ...radarOrganization };
  }

  getAll(): Observable<AppOrganization[]> {
    return this.http.get<RadarOrganization[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  getByKey(key: number | string): Observable<AppOrganization> {
    return this.http.get<RadarOrganization>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(entity: AppOrganization): Observable<AppOrganization> {
    return this.http.post<RadarOrganization>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppOrganization): Observable<AppOrganization> {
    return this.http.put<RadarOrganization>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppOrganization): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${entity.id}`
    );
  }
}
