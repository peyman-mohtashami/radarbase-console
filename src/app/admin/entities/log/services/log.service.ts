import {Injectable} from '@angular/core';
import {AppLog, RadarLog} from '../models/log';
import {BaseEntityService} from '../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LogService extends BaseEntityService<AppLog, RadarLog> {

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
