import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseEntityService } from '../../../services/base.entity.service';
import { AppRevision } from "../models/revision";
import {RadarRevision} from '../../../../shared/models/radar-revision.model';

@Injectable({ providedIn: 'root' })
export class RevisionService extends BaseEntityService<
  RadarRevision,
  AppRevision
> {
  public override resourceUrl = 'api/revisions';

  constructor(http: HttpClient) {
    super(http);
  }
}
