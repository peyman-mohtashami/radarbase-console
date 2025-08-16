import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { select, Store } from "@ngrx/store";

import { BaseEntityService } from '../../../services/base.entity.service';
import { project } from '../../../store/admin.selectors';
import { filter } from "rxjs/operators";
import { AppGroup } from "../models/group";
import {RadarProject} from '../../../../shared/models/radar-project.model';
import {RadarGroup} from '../../../../shared/models/radar-group.model';

@Injectable({
  providedIn: "root"
})
export class GroupService extends BaseEntityService<
  RadarGroup,
  AppGroup
> {
  project?: RadarProject | null;

  constructor(http: HttpClient, private store: Store) {
    super(http);
    this.store.pipe(
      select(project),
      filter(project => !!project),
    ).subscribe((project) => {
      this.project = project;
      if (project) {
        this.resourceUrl = `api/projects/${encodeURIComponent(
          project.projectName
        )}/groups`;
      }
    });
  }

  override toAppModel(entity: RadarGroup): AppGroup {
    return { ...entity, project: this.project || undefined };
  }

  override toRadarModel(entity: AppGroup): RadarGroup {
    return { ...entity };
  }
}
