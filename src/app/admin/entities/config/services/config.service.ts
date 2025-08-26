import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, OperatorFunction } from "rxjs";
import { Params } from '@angular/router';

import {
  getGlobalConfiguration,
  getProjectConfiguration, postGlobalConfiguration, postProjectConfiguration
} from "../mock/mock-configs";
import { BaseEntityService } from '../../../services/base.entity.service';
import { select, Store } from "@ngrx/store";
import { filter, map } from "rxjs/operators";
// import { client, clientConfigCategory, project } from "../../../store/admin.selectors";
import { AppClient } from "../../client/models/client";
import { AppProject } from "../../project/models/project";
import {AppConfig} from "../models/config";
import {RadarConfig, RadarConfigBundle} from '../../../../shared/models/radar-config.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';
import {RadarClient} from '../../../../shared/models/radar-client.model';

export const RESERVED_CONFIG_NAMES = [
  'measurements',
  'feedbackConfig',
  'protocols',
  'questionnaires',
];

export const DEFAULT_PAGE_SIZE = 50;

@Injectable({ providedIn: 'root' })
export class ConfigService extends BaseEntityService<
  RadarConfig,
  AppConfig
> {
  entities?: RadarConfigBundle;

  project: RadarProject | null = null;
  client: RadarClient | null = null;
  category: string | null = null;
  override total = 0;


  constructor(http: HttpClient, private store: Store) {
    super(http);
    // this.store.pipe(
    //   select(project),
    //   filter(project => project !== undefined) as OperatorFunction<AppProject | null |  undefined, AppProject | null>
    // ).subscribe((project) => {
    //   this.project = project;
    // });
    // this.store.pipe(
    //   select(client),
    //   filter(client => !!client) as OperatorFunction<AppClient | null |  undefined, AppClient>
    // ).subscribe((client) => {
    //   this.client = client;
    // });
    // this.store.pipe(
    //   select(clientConfigCategory)
    // ).subscribe((category) => {
    //   console.log('Class: ConfigService, Function: , Line 61 category' , category);
    //   this.category = category || 'general';
    // });
  }

  override getTotal(): number {
    return this.total;
  }

  override getWithQuery(queryParams?: Params | string): Observable<AppConfig[]> {
    const clientId = (queryParams as Params)?.['id'];
    const projectId = (queryParams as Params)?.['projectId'];
    let radarConfigBundle;
    console.log('Class: ConfigService, Function: getWithQuery, Line 73 clientId, projectId' , clientId, projectId);
    if (projectId) {
      radarConfigBundle = getProjectConfiguration(clientId, projectId);
    } else {
      radarConfigBundle = getGlobalConfiguration(clientId);
    }
    console.log('Class: ConfigService, Function: getWithQuery, Line 71 radarConfigBundle' , radarConfigBundle);
    return (
      of(radarConfigBundle).pipe(
        map((configBundle) => {
          console.log('Class: ConfigService, Function: , Line 75 configBundle' , configBundle);
          return this.getConfigsFromConfigBundle(configBundle)
        }),
        map((configs) => {
          console.log('Class: ConfigService, Function: , Line 79' , configs.map((config) => this.toAppModel(config)));
          return configs.map((config) => {
            console.log('Class: ConfigService, Function: config, Line 89 config' , config);
            return this.toAppModel(config)
          })
        }),
        // map((configs) => {
        //   console.log('Class: ConfigService, Function: , Line 93' , this.filterConfigsByCategory(configs, category));
        //   return this.filterConfigsByCategory(configs, category)
        // })
      )
    );
  }

  // override getWithQuery(queryParams?: Params | string): Observable<AppConfig[]> {
  //   return getGlobalConfiguration(queryParams?.['clientId']);
  //
  //
  //   console.log("*** ", queryParams)
  //   const category = (queryParams as Params)?.['category'] ?? 'general';
  //   console.log("*** ", category)
  //   console.log("*** ", this.client, this.project)
  //   if (this.client) {
  //     if (this.project) {
  //       this.entities = getProjectConfiguration(this.client.clientId.toString(), this.project.projectName.toString());
  //     } else {
  //       this.entities = getGlobalConfiguration(this.client.clientId.toString());
  //     }
  //     console.log("*** ", this.entities)
  //
  //     return (
  //       of(this.entities).pipe(
  //         map((configBundle) => {
  //           console.log('Class: ConfigService, Function: , Line 85 configBundle' , configBundle);
  //           return this.getConfigsFromConfigBundle(configBundle)
  //         }),
  //         map((configs) => {
  //           console.log('Class: ConfigService, Function: , Line 89' , configs.map((config) => this.toAppModel(config)));
  //           return configs.map((config) => this.toAppModel(config))
  //         }),
  //         map((configs) => {
  //           console.log('Class: ConfigService, Function: , Line 93' , this.filterConfigsByCategory(configs, category));
  //           return this.filterConfigsByCategory(configs, category)
  //         })
  //       )
  //     );
  //   }
  //   return of([]);
  // }

  filterConfigsByCategory(configs: AppConfig[], category?: string): AppConfig[] {
    if (category === 'general') {
      return configs.filter(
        (config) => !RESERVED_CONFIG_NAMES.includes(config.name)
      );
    } else {
      // console.log('Class: ConfigService, Function: filterConfigsByCategory, Line 98 ', category);
      return configs.filter((config) => {
        // console.log('Class: ConfigService, Function: , Line 100 config.name' , config.name);
        return config.name === category
      });
    }
  }

  getConfigsFromConfigBundle(configBundle: RadarConfigBundle): RadarConfig[] {
    console.log('Class: ConfigService, Function: getConfigsFromConfigBundle, Line 117 configBundle' , configBundle);
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

  publish(configs: AppConfig[]): Observable<AppConfig[]>{
    let configBundle: RadarConfigBundle;
    if (this.client) {
      if (this.project) {
        configBundle = postProjectConfiguration(this.client.clientId, this.project.projectName, configs)
      } else {
        configBundle = postGlobalConfiguration(this.client.clientId, configs)
      }
      return (
        of(configBundle).pipe(
          map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
          map((configs) => configs.map((config) => this.toAppModel(config))),
          map((configs) => this.filterConfigsByCategory(configs))
        )
      );
    }
    return of([]);
  }

  override convertParamsToHttpParams(queryParams: Params): {
    params: HttpParams;
    parentEntityName: string;
  } {
    let params = new HttpParams();
    params = params.append(
      'size',
      queryParams?.['pageSize'] || DEFAULT_PAGE_SIZE
    );
    params = params.append('page', queryParams?.['pageIndex'] || '0');
    if (
      queryParams?.['sortField'] &&
      queryParams['sortField'] !== '' &&
      queryParams?.['sortOrder'] &&
      queryParams['sortOrder'] !== ''
    ) {
      params = params.append(
        'sort',
        queryParams['sortField'] + ',' + queryParams['sortOrder']
      );
    } else {
      params = params.append('sort', 'id' + ',' + 'desc');
    }
    params = this.convertFilterParamsToHttpParams(params, queryParams);
    return { params, parentEntityName: queryParams?.['parentEntityName'] };
  }

  override convertFilterParamsToHttpParams(
    params: HttpParams,
    queryParams?: Params
  ) {
    return params;
  }

  override getResourceUrl(parentEntityName?: string | string[]): string {
    return this.resourceUrl;
  }

  override toAppModel(entity: RadarConfig): AppConfig {
    return {
      ...entity,
      id: entity.name,
    };
  }
  override toRadarModel(entity: AppConfig): RadarConfig {
    return {
      ...entity,
    };
  }
}
