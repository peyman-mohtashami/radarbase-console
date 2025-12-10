import {Injectable} from '@angular/core';
import {AppClient, RadarClient} from "../models/client";
import {BaseEntityService} from '../../../services/base-entity.service';

@Injectable({providedIn: 'root'})
export class ClientService extends BaseEntityService<AppClient, RadarClient>{
  override getResourceUrl(): string {
    return 'api/oauth-clients';
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
}
