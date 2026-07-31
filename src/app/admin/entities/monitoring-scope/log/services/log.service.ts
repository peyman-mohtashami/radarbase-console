import {inject, Injectable} from '@angular/core';
import {LogDto} from '../models/log';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}management/logs`;

  getWithQuery() {
    return this.http.get<LogDto[]>(this.apiUrl);
  }
}
