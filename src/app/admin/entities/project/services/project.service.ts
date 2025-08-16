import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { BaseEntityService } from '../../../services/base.entity.service';
import {AppProject} from "../models/project";
import {RadarProject} from '../../../../shared/models/radar-project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService extends BaseEntityService<
  RadarProject,
  AppProject
> {
  public override resourceUrl = 'api/projects';

  constructor(http: HttpClient) {
    super(http);
  }

  override toAppModel(entity: RadarProject): AppProject {
    return { ...entity, name: entity.projectName };
  }
  override toRadarModel(entity: AppProject): RadarProject {
    return { ...entity };
  }
}
