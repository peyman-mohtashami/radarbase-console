import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Params} from '@angular/router';

import {AuditDto} from "../models/audit";
import {environment} from '../../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuditService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}management/audits`;

  getWithQuery(queryParams: Params) {
    return this.http.get<AuditDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }
}
