import {inject, Injectable} from '@angular/core';
import {AppGroup, RadarGroup} from "../models/group";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {GroupConfigService} from './group-config.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class GroupService extends BaseEntityService<AppGroup, RadarGroup> {
  override configService = inject(GroupConfigService);

  override CACHE_ENABLED = false

  projectName?: string;

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/projects/${this.projectName}/groups`;
  }

  override toAppModel(entity: RadarGroup): AppGroup {
    return { ...entity, _name: entity.name, _search: `${entity.name}` };
  }

  override toRadarModel(entity: AppGroup, projectName?: string): RadarGroup {
    return { ...entity, projectName: projectName! };
  }

  override getWithQuery(queryParams?: Params, projectName?: string): Observable<AppGroup[]> {
    this.projectName = projectName;
    return super.getWithQuery(queryParams);
  }

  override delete(entity: AppGroup): Observable<void> {
    return this.http.delete<void>(`${this.getResourceUrl()}/${entity._name}?unlinkSubjects=true`).pipe(
      tap(() => {
        this.cacheLoaded = false;
      })
    );
  }
}
