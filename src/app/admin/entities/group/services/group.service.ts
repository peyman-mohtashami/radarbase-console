import {Injectable} from '@angular/core';
import {AppGroup, RadarGroup} from "../models/group";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../services/base-entity.service';

@Injectable({
  providedIn: "root"
})
export class GroupService extends BaseEntityService<AppGroup, RadarGroup> {
  override CACHE_ENABLED = false

  projectName?: string;

  override getResourceUrl(): string {
    return `api/projects/${this.projectName}/groups`;
  }

  override toAppModel(entity: RadarGroup): AppGroup {
    return { ...entity, _name: entity.name, _search: `${entity.name}` };
  }

  override toRadarModel(entity: AppGroup, projectName?: string): RadarGroup {
    return { ...entity, projectName: projectName! };
  }

  override getWithQuery(queryParams: Params, projectName?: string): Observable<AppGroup[]> {
    this.projectName = projectName;
    return super.getWithQuery(queryParams);
  }
}
