import {inject, Injectable} from '@angular/core';

import {Params} from '@angular/router';
import {RevisionDto} from '../models/revision';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class RevisionService {
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}api/revisions`;

  getWithQuery(queryParams: Params) {
    return this.http.get<RevisionDto[]>(this.apiUrl, {
      params: queryParams,
      observe: 'response',
    });
  }
}
