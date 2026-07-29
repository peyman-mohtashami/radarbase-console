import {inject, Injectable} from '@angular/core';
import {AppClient, ClientDto, CreateClientDto, RadarPairInfo, UpdateClientDto} from "../models/client";
import {BaseEntityService} from '../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../environments/environment';
import {ClientConfigService} from './client-config.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {
  AppOrganization,
  CreateOrganizationDto,
  OrganizationDto,
  UpdateOrganizationDto
} from '../../organization/models/organization';
import {AppSubject} from '../../project-subject/models/subject';

@Injectable({providedIn: 'root'})
export class ClientService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}api/oauth-clients`;

  getWithQuery() {
    return this.http.get<ClientDto[]>(this.apiUrl);
  }

  getByKey(key: string) {
    return this.http.get<ClientDto>(`${this.apiUrl}/${key}`);
  }

  add(entity: CreateClientDto) {
    return this.http.post<ClientDto>(this.apiUrl, entity);
  }

  update(entity: UpdateClientDto) {
    return this.http.put<ClientDto>(this.apiUrl, entity);
  }

  delete(entity: AppClient) {
    return this.http.delete<ClientDto>(`${this.apiUrl}/${entity.name}`);
  }


  // override toAppModel(entity: ClientDto): AppClient {
  //   return {
  //     ...entity,
  //     id: entity.clientId,
  //     _name: entity.clientId,
  //     _authorizedGrantTypes: entity.authorizedGrantTypes?.reduce((a: Record<string, boolean>, c: string) => {
  //       a[c] = true;
  //       return a;
  //     }, {}),
  //     _dynamic_registration: entity.additionalInformation?.['dynamic_registration'] === 'true',
  //     _search: `${entity.clientId}`
  //   };
  // }
  //
  // override toRadarModel(entity: AppClient): ClientDto {
  //   const additionalInformation: Record<string, boolean> = {};
  //   if (entity.additionalInformation['dynamic_registration']) {
  //     additionalInformation['dynamic_registration'] = true;
  //   }
  //   return {
  //     ...entity,
  //     authorizedGrantTypes: Object.keys(entity._authorizedGrantTypes ?? {}).filter(
  //       (k) => entity._authorizedGrantTypes[k]
  //     ),
  //     scope: this.customSplit(entity.scope),
  //     authorities: this.customSplit(entity.authorities),
  //     resourceIds: this.customSplit(entity.resourceIds),
  //     autoApproveScopes: this.customSplit(entity.autoApproveScopes),
  //     registeredRedirectUri: this.customSplit(entity.registeredRedirectUri),
  //     additionalInformation,
  //   };
  // }
  //
  // customSplit(str: string | string[] | null, token = ',') {
  //   if (!str) return [];
  //   if (Array.isArray(str)) return str;
  //   return str.split(token);
  // }

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
