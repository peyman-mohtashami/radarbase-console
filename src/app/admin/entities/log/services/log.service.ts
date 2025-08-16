import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppLog } from "../models/log";
import {RadarLog} from '../../../../shared/models/radar-log.model';

@Injectable({ providedIn: 'root' })
export class LogService extends BaseEntityService<RadarLog, AppLog> {
  public override resourceUrl = 'management/logs';

  constructor(http: HttpClient) {
    super(http);
  }
}
