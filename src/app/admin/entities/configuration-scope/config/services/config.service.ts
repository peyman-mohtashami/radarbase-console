import {inject, Injectable} from '@angular/core';
import { Observable, of } from "rxjs";

import {getAppConfiguration, postAppConfiguration} from "../mock/mock-configs";
import {map, tap} from "rxjs/operators";
import {AppConfig, RadarConfig, RadarConfigBundle} from "../models/config";
import {environment} from "../../../../../../environments/environment";
import {Params} from '@angular/router';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {RadarbaseAppConfigService} from '../../../../../core/configuration/services/radarbase-app-config.service';

@Injectable({ providedIn: 'root' })
export class ConfigService extends BaseEntityService<AppConfig, RadarConfig> {

  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);

  override CACHE_ENABLED = true;

  updatedList: AppConfig[] = [];

  override toAppModel(entity: RadarConfig): AppConfig {
    return {
      ...entity,
      id: entity.name,
      _name: entity.name,
      _search: entity.name
    };
  }

  override getWithQuery(queryParams?: Params, clientId?: string, projectId?: string, subjectId?: string): Observable<AppConfig[]> {
    if (!clientId) throw new Error('Client id is required');
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

    if (this.CACHE_ENABLED && this.cacheLoaded) {
      this.total.set(this.cache.length);
      return of(queryParams ? process(this.updatedList) : this.updatedList);
    }

    let radarConfigBundleObservable = this.radarbaseAppConfigService.getRadarConfigBundle(clientId, projectId, subjectId);// this.http.get<RadarConfigBundle>(url, {headers});
    if (environment.localDeployment) {
      radarConfigBundleObservable = of(getAppConfiguration(clientId, projectId, subjectId));
    }

    return radarConfigBundleObservable.pipe(
      map(configBundle =>
        getConfigsFromConfigBundle(configBundle).map((config) => this.toAppModel(config)),
      ),
      tap((entities) => {
        this.cache = [...entities];
        this.updatedList = [...entities];
        this.cacheLoaded = true;
        this.total.set(entities.length);
      }),
      map((entities) => queryParams ? process(entities) : entities)
    );
  }

  override getEntity(key: number | string): AppConfig {
    const entity = this.updatedList.find(item => item._name === key);
    if (!entity) throw new Error(`Entity with id ${key} not found`);
    return entity;
  }

  override add(entity: AppConfig): Observable<AppConfig> {
    return of(entity)
      .pipe(
        map(entity => this.toAppModel(entity)),
        tap(_entity => {
          this.total.set(this.total() + 1);
          this.updatedList.push(_entity);
        })
      );
  }

  override update(update: AppConfig): Observable<AppConfig> {
    return of(update)
      .pipe(
        map(entity => this.toAppModel(entity)),
        tap(() => {
          this.updatedList = this.updatedList.map((e) => (e.id === update.id ? update : e));
        })
      );
  }

  override delete(entity: AppConfig): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.updatedList = this.updatedList.filter((e) => e.id !== entity.id);
      })
    );
  }

  publish(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string): Observable<AppConfig[]>{
    // const headers = getHeaders();
    // const appConfigBaseUrl = getAppConfigBaseUrl();
    // const urlSegment = getUrlSegment(projectId, subjectId);
    // const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`

    let radarConfigBundleObservable = this.radarbaseAppConfigService.postConfig(configs, clientId, projectId, subjectId); //this.http.post<RadarConfigBundle>(url, {config: configs}, {headers});
    if (environment.localDeployment) {
      radarConfigBundleObservable = of(postAppConfiguration(configs, clientId, projectId, subjectId));
    }
    return radarConfigBundleObservable.pipe(
      map((configBundle) => getConfigsFromConfigBundle(configBundle)),
      map((configs) => configs.map((config) => this.toAppModel(config))),
    )
  }

  override clearCache() {
    this.cacheLoaded = false;
    this.cache = [];
    this.updatedList = [];
  }
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
