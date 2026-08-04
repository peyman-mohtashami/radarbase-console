import {inject, Injectable} from '@angular/core';
import { Observable } from "rxjs";

import {map} from "rxjs/operators";
import {AppConfig, ConfigDto, ConfigBundleDto} from "../models/config";
import {RadarbaseAppConfigService} from '../../../../core/configuration/services/radarbase-app-config.service';

@Injectable({ providedIn: 'root' })
export class ConfigService {

  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);

  getWithQuery(clientId: string, projectId?: string, subjectId?: string): Observable<ConfigDto[]> {
    return this.radarbaseAppConfigService.getRadarConfigBundle(clientId, projectId, subjectId).pipe(
      map(configBundle =>
        getConfigsFromConfigBundle(configBundle),
      ),
    );
  }

  publish(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string): Observable<ConfigDto[]>{
    return this.radarbaseAppConfigService.postConfig(configs, clientId, projectId, subjectId).pipe(
      map(configBundle => getConfigsFromConfigBundle(configBundle)),
    )
  }
}

export function getConfigsFromConfigBundle(configBundle: ConfigBundleDto): ConfigDto[] {
  const mergedDefaultsWithConfigs = configBundle.defaults?.map((defaultConfig) => {
    let _config: ConfigDto = {
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
