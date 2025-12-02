import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppClient, RadarClient} from "../models/client";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ClientService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/oauth-clients';

  toAppModel(entity: RadarClient): AppClient {
    return {
      ...entity,
      // id: entity.clientId,
      _name: entity.clientId,
      _authorizedGrantTypes: entity.authorizedGrantTypes?.reduce((a: Record<string, boolean>, c: string) => {
        a[c] = true;
        return a;
      }, {}),
      _dynamic_registration: entity.additionalInformation?.['dynamic_registration'] === 'true',
      _search: `${entity.clientId}`
    };
  }

  toRadarModel(entity: AppClient): RadarClient {
    return {
      ...entity,
      authorizedGrantTypes: Object.keys(entity._authorizedGrantTypes ?? {}).filter(
        (k) => entity._authorizedGrantTypes[k]
      ),
      scope: this.customSplit(entity.scope),
      authorities: this.customSplit(entity.authorities),
      resourceIds: this.customSplit(entity.resourceIds),
      autoApproveScopes: this.customSplit(entity.autoApproveScopes),
      registeredRedirectUri: this.customSplit(entity.registeredRedirectUri),
      additionalInformation: {
        ...entity.additionalInformation,
      }
    };
  }

  customSplit(str: string | string[] | null, token = ',') {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    return str.split(token);
  }

  getAll(): Observable<AppClient[]> {
    return this.http.get<RadarClient[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  // getByKey(key: number | string): Observable<AppClient> {
  //   return this.http.get<RadarClient>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
  //     .pipe(map((entity) => this.toAppModel(entity)));
  // }

  add(entity: AppClient): Observable<AppClient> {
    return this.http.post<RadarClient>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppClient): Observable<AppClient> {
    return this.http.put<RadarClient>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppClient): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${entity.clientId}`
    );
  }

}
