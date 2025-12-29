import {inject, Injectable} from '@angular/core';
import {AppLog, RadarLog} from '../models/log';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {LogConfigService} from './log-config.service';

@Injectable({ providedIn: 'root' })
export class LogService extends BaseEntityService<AppLog, RadarLog> {
  override configService = inject(LogConfigService);

  override getResourceUrl(): string {
    return `${environment.apiUrl}management/logs`;
  }

  override toAppModel(entity: RadarLog): AppLog {
    return {
      ...entity,
      _name: entity.name,
      _search: `${entity.name} ${entity.level}`,
    };
  }
}
