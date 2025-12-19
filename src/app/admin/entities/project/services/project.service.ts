import {Injectable} from '@angular/core';
import {AppProject, RadarProject} from "../models/project";
import {Observable} from 'rxjs';
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../services/base-entity.service';
import {environment} from '../../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProjectService extends BaseEntityService<AppProject, RadarProject> {
  organizationName?: string

  override CACHE_ENABLED = false;

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/projects`;
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
    console.log('Class: ProjectService, Function: getWithQuery, Line 31 organizationName' , organizationName);
    this.organizationName = organizationName;
    return super.getWithQuery(queryParams);
  }

  override customFilter(entities: RadarProject[]) {
    console.log('Class: ProjectService, Function: customFilter, Line 36 this.organizationName' , this.organizationName);
    return entities.filter(entity => {
      if (!this.organizationName) return true;
      return entity.organization.name === this.organizationName;
    });
  }
}
