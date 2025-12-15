import {Injectable} from '@angular/core';
import {AppLog, RadarLog} from '../models/log';
import {BaseEntityService} from '../../../services/base-entity.service';

@Injectable({ providedIn: 'root' })
export class LogService extends BaseEntityService<AppLog, RadarLog> {

  override getResourceUrl(): string {
    return 'management/logs';
  }

  override toAppModel(entity: RadarLog): AppLog {
    return {
      ...entity,
      _name: entity.name,
      _search: `${entity.name} ${entity.level}`,
    };
  }
}
