import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppRevision } from "../models/revision";
import {RadarRevision} from '../../../../shared/models/radar-revision.model';

@Injectable()
export class RevisionService extends BaseEntityService<
  RadarRevision,
  AppRevision
> {
  public override resourceUrl = 'api/revisions';

  constructor(http: HttpClient) {
    super(http);
  }

  override getResourceUrl(parentName?: string): string {
    console.log('getResourceUrl', parentName);
    if (parentName) {
      return `api/subjects/${parentName}/revisions`;
    } else {
      return `api/revisions`;
    }
  }
}
