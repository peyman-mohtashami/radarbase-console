import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from "rxjs";

import {
  getGlobalConfiguration,
  getProjectConfiguration, getSubjectConfiguration, postGlobalConfiguration, postProjectConfiguration
} from "../mock/mock-configs";
import {map, tap} from "rxjs/operators";
import {AppConfig, RadarConfig, RadarConfigBundle} from "../models/config";
import {environment} from "../../../../../environments/environment";
import {BaseEntityService} from '../../../services/base-entity.service';
import {Params} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ConfigService extends BaseEntityService<AppConfig, RadarConfig> {

  override getResourceUrl(): string {
    return 'api/organizations';
  }

  override toAppModel(entity: RadarConfig): AppConfig {
    return {
      ...entity,
      id: entity.name,
      _name: entity.name,
      _search: entity.name
    };
  }

  override toRadarModel(entity: AppConfig): RadarConfig {
    return {
      ...entity,
    };
  }

  override getWithQuery(queryParams: Params, clientId?: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
    const {
      pageIndex = 0,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'desc',
      ...filter
    } = queryParams ?? {};

    const process = (entities: AppConfig[]) => {
      const filteredEntities = this.getFilteredEntities(entities, filter);
      const sortedEntities = this.applySorting(filteredEntities, {sortField, sortOrder});
      return this.applyPagination(sortedEntities, {pageSize, pageIndex});
    };

    if (!environment.localDeployment) { // server side config
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      const appConfigBaseUrl =
        typeof window !== 'undefined'
          ? `${window.location.origin}/appconfig/api`
          : '/appconfig/api'; // fallback for SSR or tests

      let urlSegment = `global`;
      if (projectId) {
        urlSegment = `projects/${projectId}`;
        if (subjectId) {
          urlSegment = `${urlSegment}/users/${subjectId}`;
        }
      }

      return this.http.get<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${clientId}`, {headers}).pipe(
        map((configBundle) =>
          this.getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
        ),
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
        radarConfigBundle = getSubjectConfiguration(clientId!, projectId, subjectId);
      } else {
        if (projectId) {
          radarConfigBundle = getProjectConfiguration(clientId!, projectId);
        } else {
          radarConfigBundle = getGlobalConfiguration(clientId!);
        }
      }
      return (
        of(radarConfigBundle).pipe(
          map((configBundle) =>
            this.getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
          ),
          tap((entities) => {
            this.cache = entities;
            this.cacheLoaded = true;
            this.total.set(entities.length);
          }),
          map((entities) => queryParams ? process(entities) : entities)
          // map((configBundle) => {
          //   return this.getConfigsFromConfigBundle(configBundle)
          // }),
          // map((configs) => {
          //   return configs.map((config) => {
          //     return this.toAppModel(config)
          //   })
          // }),
        )
      );
    }
    //return super.getWithQuery(queryParams);
  }

  // getAll(clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
  //   if (!environment.localDeployment) { // server side config
  //     const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
  //     // const baseUrl = 'http://localhost/appconfig/api';
  //     const appConfigBaseUrl =
  //       typeof window !== 'undefined'
  //         ? `${window.location.origin}/appconfig/api`
  //         : '/appconfig/api'; // fallback for SSR or tests
  //
  //     let urlSegment = `global`;
  //     if (projectId) {
  //       urlSegment = `projects/${projectId}`;
  //       if (subjectId) {
  //         urlSegment = `${urlSegment}/users/${subjectId}`;
  //       }
  //     }
  //
  //     return this.http.get<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${clientId}`, {headers}).pipe(
  //       map((configBundle) =>
  //         this.getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
  //       ));
  //   } else {
  //     let radarConfigBundle;
  //     if (subjectId && projectId) {
  //       radarConfigBundle = getSubjectConfiguration(clientId, projectId, subjectId);
  //     } else {
  //       if (projectId) {
  //         radarConfigBundle = getProjectConfiguration(clientId, projectId);
  //       } else {
  //         radarConfigBundle = getGlobalConfiguration(clientId);
  //       }
  //     }
  //     console.log('Class: ConfigService, Function: getAll, Line 71 radarConfigBundle', radarConfigBundle);
  //     console.log('Class: ConfigService, Function: getAll, Line 71 radarConfigBundle.config', radarConfigBundle.config);
  //     return (
  //       of(radarConfigBundle).pipe(
  //         map((configBundle) => {
  //           return this.getConfigsFromConfigBundle(configBundle)
  //         }),
  //         map((configs) => {
  //           return configs.map((config) => {
  //             return this.toAppModel(config)
  //           })
  //         }),
  //       )
  //     );
  //   }
  // }

  getConfigsFromConfigBundle(configBundle: RadarConfigBundle): RadarConfig[] {
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

  publish(data: {entities: AppConfig[]; clientId: string; projectId?: string; subjectId?: string;}): Observable<AppConfig[]>{
    const {entities, clientId, projectId, subjectId} = data;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    const appConfigBaseUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/appconfig/api`
        : '/appconfig/api'; // fallback for SSR or tests

    let urlSegment = `global`;
    if (projectId) {
      urlSegment = `projects/${projectId}`;
      if (subjectId) {
        urlSegment = `${urlSegment}/users/${subjectId}`;
      }
    }

    return this.http.post<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${clientId}`,{config: entities}, {headers}).pipe(
      map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
      map((configs) => configs.map((config) => this.toAppModel(config))),
      // map((configs) => this.filterConfigsByCategory(configs))
    )
  }
}
