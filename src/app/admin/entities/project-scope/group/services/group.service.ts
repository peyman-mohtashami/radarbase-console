import {inject, Injectable} from '@angular/core';
import {AppGroup, RadarGroup} from "../models/group";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {environment} from '../../../../../../environments/environment';
import {GroupConfigService} from './group-config.service';

@Injectable({
  providedIn: "root"
})
export class GroupService extends BaseEntityService<AppGroup, RadarGroup> {
  override configService = inject(GroupConfigService);

  override CACHE_ENABLED = false

  projectName?: string;

  override getResourceUrl(): string {
    console.log('Class: GroupService, Function: getResourceUrl, Line 17 this.projectName' , this.projectName);
    return `${environment.apiUrl}api/projects/${this.projectName}/groups`;
  }

  override toAppModel(entity: RadarGroup): AppGroup {
    return { ...entity, _name: entity.name, _search: `${entity.name}` };
  }

  override toRadarModel(entity: AppGroup, projectName?: string): RadarGroup {
    return { ...entity, projectName: projectName! };
  }

  override getWithQuery(queryParams?: Params, projectName?: string): Observable<AppGroup[]> {
    console.log('Class: GroupService, Function: getWithQuery, Line 30 projectName' , projectName);
    this.projectName = projectName;
    return super.getWithQuery(queryParams);
  }
}
