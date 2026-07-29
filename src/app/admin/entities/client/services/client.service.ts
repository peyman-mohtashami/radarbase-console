import {inject, Injectable} from '@angular/core';
import {AppClient, ClientDto, CreateClientDto, RadarPairInfo, UpdateClientDto} from "../models/client";
import {environment} from '../../../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
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
