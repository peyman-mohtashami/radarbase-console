import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppClient } from "../models/client";
import { AppSubject } from "../../subject/models/subject";
import {RadarPairInfo} from '../../../../shared/models/radar-client.model';

@Injectable()
export class ClientPairService {
  private pairUrl = 'api/oauth-clients/pair';
  private resourceUrl = 'api/meta-token';

  constructor(private http: HttpClient) {}

  get(
    client: AppClient,
    subject: AppSubject,
    persistent: boolean
  ): Observable<RadarPairInfo> {
    let params = new HttpParams();

    if (subject.login) {
      params = params.append('clientId', client.clientId);
      params = params.append('login', subject.login);
      params = params.append('persistent', persistent.toString());
    }
    return this.http.get<RadarPairInfo>(this.pairUrl, { params });
  }

  delete(tokenName: string): Observable<any> {
    return this.http.delete(this.resourceUrl + '/' + tokenName);
  }
}
