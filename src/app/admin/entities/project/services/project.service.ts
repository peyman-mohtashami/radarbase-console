import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppProject, RadarProject} from "../models/project";
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  private readonly resourceUrl = 'api/projects';
  total = 0;

  private toAppModel(entity: RadarProject): AppProject {
    return { ...entity, _name: entity.projectName, _search: `${entity.projectName} ${entity.description} ${entity.location}` };
  }

  private toRadarModel(entity: AppProject): RadarProject {
    return { ...entity, organizationName: undefined };
  }

  getAll(organizationName?: string): Observable<AppProject[]> {
    return this.http.get<RadarProject[]>(this.resourceUrl)
      .pipe(
        map((entities) =>
          entities.filter(entity => {
            if (!organizationName) return true;
            return entity.organization.name === organizationName;
          }).map((entity) => this.toAppModel(entity))
        )
      );
  }

  add(entity: AppProject): Observable<AppProject> {
    return this.http.post<RadarProject>(this.resourceUrl, this.toRadarModel(entity))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  getByKey(key: number | string): Observable<AppProject> {
    return this.http.get<RadarProject>(`${this.resourceUrl}/${encodeURIComponent(key)}`)
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  update(update: AppProject): Observable<AppProject> {
    return this.http.put<RadarProject>(this.resourceUrl, this.toRadarModel(update))
      .pipe(map((entity) => this.toAppModel(entity)));
  }

  delete(entity: AppProject): Observable<void> {
    return this.http.delete<void>(
      `${this.resourceUrl}/${encodeURIComponent(entity._name)}`
    );
  }
}
