import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import { Observable, of } from "rxjs";

import {getGlobalConfiguration, getProjectConfiguration, getSubjectConfiguration} from "../mock/mock-configs";
import {map, tap} from "rxjs/operators";
import {AppConfig, RadarConfig, RadarConfigBundle} from "../models/config";
import {environment} from "../../../../../environments/environment";
import {ActivatedRouteSnapshot, Params} from '@angular/router';
import {AppProject} from '../../project/models/project';
import {AppSubject} from '../../subject/models/subject';
import {AppClient} from '../../client/models/client';
import {BaseEntityService} from '../../../services/base-entity.service';

@Injectable({ providedIn: 'root' })
export class ConfigService extends BaseEntityService<AppConfig, RadarConfig> {
  override CACHE_ENABLED = false;

  override getResourceUrl(): string {
    return `${environment.apiUrl}api/subjects`;
  }

  override toAppModel(entity: RadarConfig): AppConfig {
    return {
      ...entity,
      id: entity.name,
      _name: entity.name,
      _search: entity.name
    };
  }

  // toRadarModel(entity: AppConfig): RadarConfig {
  //   return {
  //     ...entity,
  //   };
  // }

  override getWithQuery(queryParams?: Params, clientId?: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
    if (!clientId) throw new Error('Client id is required');
    const {
      pageIndex = 0,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'desc',
      ...filter
    } = queryParams ?? {};

    const headers = getHeaders();
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`;

    const process = (entities: AppConfig[]) => {
      const filteredEntities = this.getFilteredEntities(entities, filter);
      const sortedEntities = this.applySorting(filteredEntities, {sortField, sortOrder});
      return this.applyPagination(sortedEntities, {pageSize, pageIndex});
    };

    // if (this.CACHE_ENABLED && this.cacheLoaded) {
    //   this.total.set(this.cache.length);
    //   return of(queryParams ? process(this.cache) : this.cache);
    // }
    if (!environment.localDeployment) {
      return this.http.get<RadarConfigBundle>(url, {headers}).pipe(
        map(configBundle =>
          getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
        ),
        // map((entities) => entities.map((entity) => this.toAppModel(entity))),
        tap((entities) => {
          this.cache = entities;
          this.cacheLoaded = true;
          this.total.set(entities.length);
        }),
        map((entities) => queryParams ? process(entities) : entities)
      );
    } else {
      let radarConfigBundle;
      if (subjectId && projectId) {
        radarConfigBundle = getSubjectConfiguration(clientId, projectId, subjectId);
      } else {
        if (projectId) {
          radarConfigBundle = getProjectConfiguration(clientId, projectId);
        } else {
          radarConfigBundle = getGlobalConfiguration(clientId);
        }
      }
      return (
        of(radarConfigBundle).pipe(
          map((configBundle) => {
            return getConfigsFromConfigBundle(configBundle)
          }),
          map((configs) => {
            return configs.map((config) => {
              return this.toAppModel(config)
            })
          }),
        )
      );

    }
  }

  getAll(clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
    if (!environment.localDeployment) {
      const headers = getHeaders();
      const appConfigBaseUrl = getAppConfigBaseUrl();
      const urlSegment = getUrlSegment(projectId, subjectId);
      const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`;

      return this.http.get<RadarConfigBundle>(url, {headers}).pipe(
        map((configBundle) =>
          getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
        ));
    } else {
      let radarConfigBundle;
      if (subjectId && projectId) {
        radarConfigBundle = getSubjectConfiguration(clientId, projectId, subjectId);
      } else {
        if (projectId) {
          radarConfigBundle = getProjectConfiguration(clientId, projectId);
        } else {
          radarConfigBundle = getGlobalConfiguration(clientId);
        }
      }
      return (
        of(radarConfigBundle).pipe(
          map((configBundle) => {
            return getConfigsFromConfigBundle(configBundle)
          }),
          map((configs) => {
            return configs.map((config) => {
              return this.toAppModel(config)
            })
          }),
        )
      );
    }
  }

  publish(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]>{
    const headers = getHeaders();
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`

    return this.http.post<RadarConfigBundle>(url, {config: configs}, {headers}).pipe(
      map((configBundle) => getConfigsFromConfigBundle(configBundle)),
      map((configs) => configs.map((config) => this.toAppModel(config))),
    )
  }
}

export function getUrlSegment(projectId?: string, subjectId?: string) {
  let urlSegment = `global`;
  if (projectId) {
    urlSegment = `projects/${projectId}`;
    if (subjectId) {
      urlSegment = `${urlSegment}/users/${subjectId}`;
    }
  }
  return urlSegment;
}

export function getAppConfigBaseUrl() {
  return typeof window !== 'undefined' ? `${window.location.origin}/appconfig/api` : '/appconfig/api';
}

export function getHeaders() {
  return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
}

export function getConfigsFromConfigBundle(configBundle: RadarConfigBundle): RadarConfig[] {
  const mergedDefaultsWithConfigs = configBundle.defaults?.map((defaultConfig) => {
    let _config: RadarConfig = {
      name: defaultConfig.name,
      default: defaultConfig.value,
      value: defaultConfig.value,
      scope: defaultConfig.scope,
    };
    configBundle.config.forEach((config, index, arr) => {
      if (defaultConfig.name === config.name) {
        _config = {
          name: defaultConfig.name,
          default: defaultConfig.value,
          value: config.value,
          scope: defaultConfig.scope,
        };
        arr.splice(index, 1);
      }
    });
    return _config;
  });

  let _configs = [...configBundle.config];
  if (mergedDefaultsWithConfigs) {
    _configs = [..._configs, ...mergedDefaultsWithConfigs];
  }
  return _configs;
}
