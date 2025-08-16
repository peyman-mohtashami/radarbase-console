import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BaseEntityService } from '../../../services/base.entity.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { project } from '../../../store/admin.selectors';
import { AppSource } from "../models/source";
import {RadarProject} from '../../../../shared/models/radar-project.model';
import {RadarSource} from '../../../../shared/models/radar-source.model';

@Injectable({ providedIn: 'root' })
export class SourceService extends BaseEntityService<
  RadarSource,
  AppSource
> {
  // override resourceUrl = 'api/projects/radar/sources?projectName=radar&page=0&size=20&sort=id,asc';

  project?: RadarProject | null;

  constructor(http: HttpClient, private store: Store) {
    super(http);
    this.store.select(project).subscribe((project) => {
      this.project = project;
      if (project) {
        this.resourceUrl = `api/projects/${project.projectName}/sources`;
      }
      // this.resourceUrl = \`api/projects/${project?.projectName}/sources?projectName=radar&page=0&size=20&sort=id,asc'
    });
  }

  queryAvailable(projectName: string): Observable<AppSource[]> {
    const params = {
      assigned: false,
      minimized: true,
    };
    return this.http
      .get<RadarSource[]>(this.getResourceUrl(projectName), {
        params,
      })
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  override add(entity: AppSource): Observable<AppSource> {
    return this.http
      .post<RadarSource>(`api/sources`, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  override delete(key: number | string): Observable<number | string> {
    return this.http.delete<number | string>(
      `api/sources/${encodeURIComponent(key)}`
    );
  }

  override toAppModel(entity: RadarSource): AppSource {
    return {
      ...entity,
      id: entity.id.toString(),
      name: entity.sourceName,
    };
  }
  override toRadarModel(entity: AppSource): RadarSource {
    return {
      ...entity,
      project: this.project || undefined,
      assigned: !!entity.assigned,
    };
  }
}
