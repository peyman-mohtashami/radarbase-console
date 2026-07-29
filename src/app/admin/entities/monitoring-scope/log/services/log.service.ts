import {inject, Injectable} from '@angular/core';
import {AppLog, LogDto} from '../models/log';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {LogConfigService} from './log-config.service';
import {HttpClient} from '@angular/common/http';
import {OrganizationDto} from '../../../organization/models/organization';

@Injectable({ providedIn: 'root' })
export class LogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}management/logs`;

  getWithQuery() {
    return this.http.get<LogDto[]>(this.apiUrl);
  }
}
