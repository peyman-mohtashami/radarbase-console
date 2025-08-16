import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppSourceType} from "../models/source-type";
import {RadarSourceType} from '../../../../shared/models/radar-source-type.model';

@Injectable({ providedIn: 'root' })
export class SourceTypeService extends BaseEntityService<
  RadarSourceType,
  AppSourceType
> {
  public override resourceUrl = 'api/source-types';

  constructor(http: HttpClient) {
    super(http);
  }

  override toAppModel(entity: RadarSourceType): AppSourceType {
    return {
      ...entity,
      name: `${entity.producer}/${entity.model}/${entity.catalogVersion}`,
    };
  }

  override toRadarModel(entity: AppSourceType): RadarSourceType {
    return { ...entity };
  }
}
