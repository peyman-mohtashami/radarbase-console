import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppClient, RadarPairInfo} from "../models/client";
import {AppSubject} from '../../subject/models/subject';

@Injectable({providedIn: 'root'})
export class ClientPairService {
  private pairUrl = 'api/oauth-clients/pair';
  private resourceUrl = 'api/meta-token';

  private http = inject(HttpClient);

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
