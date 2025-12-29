import {inject, Injectable} from '@angular/core';
import {AppClient, RadarClient} from "../models/client";
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {ClientConfigService} from './client-config.service';

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
}
