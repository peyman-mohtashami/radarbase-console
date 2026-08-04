import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {AppConfig, ConfigDto} from "../../config/models/config";
import {getConfigsFromConfigBundle,} from '../../config/services/config.service';
import {RadarbaseAppConfigService} from '../../../../core/configuration/services/radarbase-app-config.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireService {
  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);

  getWithQuery(clientId: string, projectId?: string, subjectId?: string): Observable<ConfigDto[]> {
    return this.radarbaseAppConfigService.getRadarConfigBundle(clientId, projectId, subjectId).pipe(
      map(configBundle => getConfigsFromConfigBundle(configBundle)),
    );
  }

  publish(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string): Observable<ConfigDto[]>{
    return this.radarbaseAppConfigService.postConfig(configs, clientId, projectId, subjectId).pipe(
      map(configBundle => getConfigsFromConfigBundle(configBundle)),
    )
  }
}
