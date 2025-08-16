import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppClient} from "../models/client";
import {RadarClient} from '../../../../shared/models/radar-client.model';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseEntityService<
  RadarClient,
  AppClient
> {
  public override resourceUrl = 'api/oauth-clients';

  constructor(http: HttpClient) {
    super(http);
  }

  override toAppModel(entity: RadarClient): AppClient {
    return {
      ...entity,
      id: entity.clientId,
      name: entity.clientId,
      formAuthorizedGrantTypes: entity.authorizedGrantTypes?.reduce(
        (a: any, c: string) => {
          a[c] = true;
          return a;
        },
        {}
      ),
      additionalInformation: {
        dynamic_registration:
          entity.additionalInformation?.['dynamic_registration'] === 'true',
      },
    };
  }

  override toRadarModel(entity: AppClient): RadarClient {
    // delete entity.id;
    // delete entity.formAuthorizedGrantTypes;
    return {
      ...entity,
      authorizedGrantTypes: Object.keys(entity.formAuthorizedGrantTypes).filter(
        (k) => entity.formAuthorizedGrantTypes[k]
      ),
      // formAuthorizedGrantTypes: undefined,
      // id: undefined,
      scope: this.customSplit(entity?.scope),
      resourceIds: this.customSplit(entity?.resourceIds),
      autoApproveScopes: this.customSplit(entity?.autoApproveScopes),
      registeredRedirectUri: this.customSplit(entity?.registeredRedirectUri),
    };
  }

  customSplit(str?: string | string[], token = ',') {
    // if (!token) {
    //   token = ',';
    // }
    if (!str) {
      return [];
    }
    if (Array.isArray(str)) {
      return str;
    }
    return str.split(token);
  }
}
