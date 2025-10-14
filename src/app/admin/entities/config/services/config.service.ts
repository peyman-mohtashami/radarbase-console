import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

import {
  getGlobalConfiguration,
  getProjectConfiguration, postGlobalConfiguration, postProjectConfiguration
} from "../mock/mock-configs";
import { map } from "rxjs/operators";
import {AppConfig} from "../models/config";
import {RadarConfig, RadarConfigBundle} from '../../../../shared/models/radar-config.model';

export const RESERVED_CONFIG_NAMES = [
  'measurements',
  'feedbackConfig',
  'protocols',
  'questionnaires',
];

@Injectable({ providedIn: 'root' })
export class ConfigService {

  private http = inject(HttpClient);

  total = 0;

  toAppModel(entity: RadarConfig): AppConfig {
    const generateShortId = () => Math.random().toString(36).substring(2, 10); // 8 chars like "f7ight4w"
    return {
      ...entity,
      id: generateShortId(),
      // id: entity.name,
      _name: entity.name,
      _search: entity.name
    };
  }

  toRadarModel(entity: AppConfig): RadarConfig {
    return {
      ...entity,
    };
  }

  getAll(clientId: string, projectId?: string): Observable<AppConfig[]> {
    console.log('Class: ConfigService, Function: getAll, Line 45 clientId, projectId' , clientId, projectId);
    let radarConfigBundle;
    if (projectId) {
      radarConfigBundle = getProjectConfiguration(clientId, projectId);
    } else {
      radarConfigBundle = getGlobalConfiguration(clientId);
    }
    console.log('Class: ConfigService, Function: getAll, Line 51 radarConfigBundle' , radarConfigBundle);
    return (
      of(radarConfigBundle).pipe(
        map((configBundle) => {
          return this.getConfigsFromConfigBundle(configBundle)
        }),
        map((configs) => {
          return configs.map((config) => {
            return this.toAppModel(config)
          })
        }),
      )
    );
  }

  // add(entity: AppConfig): Observable<AppConfig> {
  //   const e = { ...entity, id: entity.name, changed: true };
  //   this.entities.push(e);
  //   this.entitiesChanged();
  //   this.updated = e['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  //   // this.entitiesToShow.push(e);
  //   this.checkIfChangeHappened(true);
  //   return of(e);
  // }
  //
  // override delete(entity: AppConfig): Observable<string | number> {
  //   this.entities = this.entities.filter((e) => e.name !== entity.name);
  //   this.entitiesChanged();
  //   this.checkIfChangeHappened(true);
  //   return of(entity.name);
  // }
  //
  // override update(entity: AppConfig): Observable<AppConfig> {
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 188 entity' , entity);
  //   const itemIndex = this.entities.findIndex(
  //     (item) => {
  //       console.log('Class: ConfigsPageComponent, Function: , Line 191 item' , item);
  //       return item.id == entity.id
  //     }
  //   );
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 195 itemIndex' , itemIndex);
  //   const e = { ...entity, changed: true };
  //   this.entities[itemIndex] = e;
  //   console.log('Class: ConfigsPageComponent, Function: update, Line 194 this.entities' , this.entities);
  //   this.entitiesChanged();
  //   this.updated = entity['id'];
  //   setTimeout(() => {
  //     this.updated = undefined;
  //   }, 1000);
  //   this.checkIfChangeHappened(true);
  //   return of(e);
  // }

  // getWithQuery(clientId: string, projectId?: string): Observable<AppConfig[]> {
  //   // const clientId = (queryParams as Params)?.['id'];
  //   // const projectId = (queryParams as Params)?.['projectId'];
  //   let radarConfigBundle;
  //   console.log('Class: ConfigService, Function: getWithQuery, Line 73 clientId, projectId' , clientId, projectId);
  //   if (projectId) {
  //     radarConfigBundle = getProjectConfiguration(clientId, projectId);
  //   } else {
  //     radarConfigBundle = getGlobalConfiguration(clientId);
  //   }
  //   console.log('Class: ConfigService, Function: getWithQuery, Line 71 radarConfigBundle' , radarConfigBundle);
  //   return (
  //     of(radarConfigBundle).pipe(
  //       map((configBundle) => {
  //         console.log('Class: ConfigService, Function: , Line 75 configBundle' , configBundle);
  //         return this.getConfigsFromConfigBundle(configBundle)
  //       }),
  //       map((configs) => {
  //         console.log('Class: ConfigService, Function: , Line 79' , configs.map((config) => this.toAppModel(config)));
  //         return configs.map((config) => {
  //           console.log('Class: ConfigService, Function: config, Line 89 config' , config);
  //           return this.toAppModel(config)
  //         })
  //       }),
  //       // map((configs) => {
  //       //   console.log('Class: ConfigService, Function: , Line 93' , this.filterConfigsByCategory(configs, category));
  //       //   return this.filterConfigsByCategory(configs, category)
  //       // })
  //     )
  //   );
  // }

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

  publish1(configs: AppConfig[]): Observable<AppConfig[]>{
    // let configBundle: RadarConfigBundle;
    // if (this.client) {
    //   if (this.project) {
    //     configBundle = postProjectConfiguration(this.client.clientId, this.project.projectName, configs)
    //   } else {
    //     configBundle = postGlobalConfiguration(this.client.clientId, configs)
    //   }
    //   return (
    //     of(configBundle).pipe(
    //       map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
    //       map((configs) => configs.map((config) => this.toAppModel(config))),
    //       map((configs) => this.filterConfigsByCategory(configs))
    //     )
    //   );
    // }
    return of([]);
  }
}
