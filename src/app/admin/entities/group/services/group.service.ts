import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from "rxjs/operators";
import {AppGroup, RadarGroup} from "../models/group";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class GroupService {
  private http = inject(HttpClient);

  private toAppModel(entity: RadarGroup): AppGroup {
    return { ...entity, _name: entity.name, _search: `${entity.name}` };
  }

  private toRadarModel(projectName: string, entity: AppGroup): RadarGroup {
    return { ...entity, projectName };
  }

  getAll(projectName: string): Observable<AppGroup[]> {
    return this.http.get<RadarGroup[]>(`api/projects/${projectName}/groups`)
      .pipe(
        map((entities) =>
          entities.map((entity) => this.toAppModel(entity))
        )
      );
  }

  getByKey(projectName: string, key: number | string): Observable<AppGroup> {
    return this.http.get<RadarGroup>(`api/projects/${projectName}/groups/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  add(projectName: string, entity: AppGroup): Observable<AppGroup> {
    return this.http.post<RadarGroup>(`api/projects/${projectName}/groups`, this.toRadarModel(projectName, entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(projectName: string, update: AppGroup): Observable<AppGroup> {
    return this.http.put<RadarGroup>(`api/projects/${projectName}/groups`, this.toRadarModel(projectName, update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(projectName: string, entity: AppGroup): Observable<void> {
    return this.http.delete<void>(
      `api/projects/${projectName}/groups/${entity.name}`
    );
  }
}
