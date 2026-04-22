import {inject, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http";
import {
  AppConfig,
  RadarConfig,
  RadarConfigBundle
} from '../../../admin/entities/configuration-scope/config/models/config';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadarbaseAppConfigService {
  private http = inject(HttpClient);

  getRadarConfigBundle(clientId: string, projectId?: string, subjectId?: string, context?: HttpContext): Observable<RadarConfigBundle> {
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`;

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<RadarConfigBundle>(url, {headers, context});
  }

  getConfig(radarConfigBundle: RadarConfigBundle, configName: string): RadarConfig | undefined {
    const configs = [...radarConfigBundle.config];
    radarConfigBundle.defaults?.forEach(defaultConfig => {
      if (!radarConfigBundle.config.find(config => config.name === defaultConfig.name)) {
        configs.push(defaultConfig);
      }
    });

    return configs.find(c => c.name === configName);
  }

  postConfig(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${clientId}`;
    return this.http.post<RadarConfigBundle>(url, {config: configs});
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
  if (environment.production) {
    return typeof window !== 'undefined' ? `${window.location.origin}/appconfig/api` : '/appconfig/api';
  }
  return '/appconfig/api';
}
