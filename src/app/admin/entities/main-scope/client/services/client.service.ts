import {inject, Injectable} from '@angular/core';
import {AppClient, RadarClient, RadarPairInfo} from "../models/client";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {ClientConfigService} from './client-config.service';
import {AppSubject} from '../../../project-scope/subject/models/subject';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ClientService extends BaseEntityService<AppClient, RadarClient>{
  override configService = inject(ClientConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/oauth-clients`;
  }

  override toAppModel(entity: RadarClient): AppClient {
    return {
      ...entity,
      id: entity.clientId,
      _name: entity.clientId,
      _authorizedGrantTypes: entity.authorizedGrantTypes?.reduce((a: Record<string, boolean>, c: string) => {
        a[c] = true;
        return a;
      }, {}),
      _dynamic_registration: entity.additionalInformation?.['dynamic_registration'] === 'true',
      _search: `${entity.clientId}`
    };
  }

  override toRadarModel(entity: AppClient): RadarClient {
    const additionalInformation: Record<string, boolean> = {};
    if (entity.additionalInformation['dynamic_registration']) {
      additionalInformation['dynamic_registration'] = true;
    }
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
      additionalInformation,
    };
  }

  customSplit(str: string | string[] | null, token = ',') {
    if (!str) return [];
    if (Array.isArray(str)) return str;
    return str.split(token);
  }

  getClientPairInfo(client: AppClient, subject: AppSubject, persistent: boolean): Observable<RadarPairInfo> {
    let params = new HttpParams();

    if (subject.login) {
      params = params.append('clientId', client.clientId);
      params = params.append('login', subject.login);
      params = params.append('persistent', persistent.toString());
    }
    return this.http.get<RadarPairInfo>(`${environment.apiUrl}api/oauth-clients/pair`, { params });
  }

  deletePairInfoToken(tokenName: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}api/meta-token/${tokenName}`);
  }
}
