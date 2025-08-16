import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppSourceData } from "../models/source-data";
import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';

@Injectable({ providedIn: 'root' })
export class SourceDataService extends BaseEntityService<
  RadarSourceData,
  AppSourceData
> {
  public override resourceUrl = 'api/source-data';

  constructor(http: HttpClient) {
    super(http);
  }

  override toAppModel(entity: RadarSourceData): AppSourceData {
    return {
      ...entity,
      name: entity.sourceDataName
    };
  }
}
