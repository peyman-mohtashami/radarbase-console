import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppAudit } from "../models/audit";
import {RadarAudit} from '../../../../shared/models/radar-audit.model';

@Injectable({ providedIn: 'root' })
export class AuditService extends BaseEntityService<
  RadarAudit,
  AppAudit
> {
  public override resourceUrl = 'management/audits';

  constructor(http: HttpClient) {
    super(http);
  }

  override convertFilterParamsToHttpParams(
    params: HttpParams,
    queryParams?: Params
  ) {
    if (queryParams?.['toDate'] && queryParams['toDate'] !== '') {
      params = params.append('toDate', queryParams['toDate']);
    }
    if (queryParams?.['fromDate'] && queryParams['fromDate'] !== '') {
      params = params.append('fromDate', queryParams['fromDate']);
    }
    return params;
  }

  override toAppModel(entity: RadarAudit): AppAudit {
    return { ...entity, id: entity.timestamp, name: entity.timestamp };
  }

  override toRadarModel(entity: AppAudit): RadarAudit {
    return { ...entity };
  }
}
