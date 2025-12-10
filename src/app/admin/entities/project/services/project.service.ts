import {Injectable} from '@angular/core';
import {AppProject, RadarProject} from "../models/project";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../services/base-entity.service';

@Injectable({providedIn: 'root'})
export class ProjectService extends BaseEntityService<AppProject, RadarProject> {
  organizationName?: string

  override CACHE_ENABLED = false;

  override getResourceUrl(): string {
    return 'api/projects';
  }

  override toAppModel(entity: RadarProject): AppProject {
    return {
      ...entity,
      _name: entity.projectName,
      _search: `${entity.projectName} ${entity.description} ${entity.location}`
    };
  }

  override toRadarModel(entity: AppProject): RadarProject {
    return entity;
  }

  override getWithQuery(queryParams?: Params, organizationName?: string): Observable<AppProject[]> {
    this.organizationName = organizationName;
    return super.getWithQuery(queryParams);
  }

  override customFilter(entities: RadarProject[], organizationName?: string) {
    return entities.filter(entity => {
      if (!organizationName) return true;
      return entity.organization.name === organizationName;
    });
  }
}
