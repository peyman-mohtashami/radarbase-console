import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

import {map} from "rxjs/operators";
import {
  AppProtocol,
  FormProtocol,
  QuestionnaireLanguage,
  QuestionnaireTimeUnit,
  RadarProtocol,
  RadarProtocolWrapper
} from "../models/protocol";
import {ISO_LANGUAGES_MAP} from "../../questionnaire/models/questionnaire";
import {RadarOption} from "../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component";
import {RadarConfig, RadarConfigBundle} from "../../config/models/config";
import {environment} from "../../../../../environments/environment";
import {MockProtocolServer} from "../mock/mockProtocolServer";

export const DEFAULT_LANGUAGE = ISO_LANGUAGES_MAP['en'];

@Injectable({providedIn: 'root'})
export class ProtocolService {

  private http = inject(HttpClient);
  private readonly CLIENT_ID = 'protocol-service';

  radarToAppModel(entity: RadarProtocol): AppProtocol {
    const languages = extractLanguages(entity);
    return {
      ...entity,
      _github: !!entity.questionnaire?.repository,
      _languages: languages,
      _onDemand: entity.type === 'on_demand',
      _relativeToReferenceTime: !!entity.protocol?.referenceTimestamp,
      _reminderEnabled: !!entity.protocol?.reminders?.repeat,
      _repeatedProtocol: isRepeatedProtocol(entity.protocol?.repeatProtocol),
    };
  }

  appToFormModel(entity: AppProtocol): FormProtocol {
    return {
      general: {
        name: entity.name,
        isDemo: entity.isDemo ?? false,
        languages: entity._languages,
        onDemand: entity._onDemand,
        order: entity.order ?? 0,
        showInCalendar: entity.showInCalendar ?? false
      },
      content: {
        showIntroduction: entity.showIntroduction ?? false,
        startText: extractStartText(entity.startText, entity._languages),
        endText: extractStartText(entity.endText, entity._languages),
        warn: extractStartText(entity.warn, entity._languages),
        notification: entity.protocol?.notification ? {
          title: extractStartText(entity.protocol.notification?.title ?? null, entity._languages),
          text: extractStartText(entity.protocol.notification?.text ?? null, entity._languages),
        } : undefined,
      },
      questionsGroup: {
        github: entity._github,
        questionnaire: entity.questionnaire ? {
          avsc: entity.questionnaire.avsc,
          name: entity.questionnaire.name,
          repository: entity.questionnaire.repository
        } : undefined,
        estimatedCompletionTime: entity.estimatedCompletionTime,
        appQuestionnaire: entity.appQuestionnaire,
      },
      scheduling: entity.protocol ? {
        repeatedProtocol: entity._repeatedProtocol,
        completionWindow: {
          amount: entity.protocol?.completionWindow?.amount ?? 0,
          unit: mapUnit(entity.protocol?.completionWindow?.unit),
        },
        relativeToReferenceTime: entity._relativeToReferenceTime,
        referenceTimestamp: entity.protocol.referenceTimestamp ? toTimestamp(entity.protocol.referenceTimestamp) : undefined,
        repeatProtocol: {
          amount: entity.protocol.repeatProtocol.amount,
          unit: mapUnit(entity.protocol.repeatProtocol.unit)
        },
        repeatQuestionnaire: {
          unit: mapUnit(entity.protocol.repeatQuestionnaire.unit),
          unitsFromZero: entity.protocol.repeatQuestionnaire.unitsFromZero
        },
        reminders: {
          enabled: entity._reminderEnabled,
          amount: entity.protocol.reminders?.amount ?? 0,
          repeat: entity.protocol.reminders?.repeat ?? 0,
          unit: mapUnit(entity.protocol.reminders?.unit)
        },
      } : undefined,
    }
  }

  appToRadarModel(entity: AppProtocol): RadarProtocol {
    const {
      _languages,
      _onDemand,
      _github,
      _repeatedProtocol,
      _relativeToReferenceTime,
      _reminderEnabled,
      ...rest
    } = entity;

    // Remove keys with undefined values recursively
    const pruneUndefined = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj
          .map(pruneUndefined)
          .filter(v => v !== undefined);
      }
      if (obj && typeof obj === 'object') {
        return Object.entries(obj).reduce((acc, [k, v]) => {
          const cleaned = pruneUndefined(v);
          if (cleaned !== undefined) {
            (acc as any)[k] = cleaned;
          }
          return acc;
        }, {} as Record<string, any>);
      }
      return obj === undefined ? undefined : obj;
    };

    return pruneUndefined(rest) as RadarProtocol;
  }

  formToAppModel(entity: FormProtocol): AppProtocol {
    return {
      name: entity.general.name,
      _languages: entity.general.languages,
      _onDemand: entity.general.onDemand,
      isDemo: entity.general.isDemo,
      order: entity.general.order,
      showInCalendar: entity.general.showInCalendar,
      type: entity.general.onDemand ? 'on_demand' : 'scheduled',

      showIntroduction: entity.content.showIntroduction,
      startText: entity.content.startText,
      endText: entity.content.endText,
      warn: entity.content.warn,

      questionnaire: entity.questionsGroup.questionnaire?.name ? entity.questionsGroup.questionnaire : undefined,
      appQuestionnaire: entity.questionsGroup.appQuestionnaire,
      _github: entity.questionsGroup.github,
      estimatedCompletionTime: entity.questionsGroup.estimatedCompletionTime,

      protocol: entity.general.onDemand ? undefined : {
        referenceTimestamp: entity.scheduling?.referenceTimestamp ? {
          timestamp: entity.scheduling?.referenceTimestamp,
          format: 'date'
        } : undefined,
        repeatProtocol: {
          unit: entity.scheduling?.repeatedProtocol ? entity.scheduling?.repeatProtocol.unit : 'year',//?? 'min',
          amount: entity.scheduling?.repeatedProtocol ? entity.scheduling?.repeatProtocol.amount : 9999,//
        },
        repeatQuestionnaire: {
          unit: entity.scheduling?.repeatQuestionnaire.unit ?? 'min',
          unitsFromZero: entity.scheduling?.repeatQuestionnaire.unitsFromZero ?? [0]
        },
        reminders: {
          unit: entity.scheduling?.reminders?.unit ?? 'min',
          amount: entity.scheduling?.reminders?.amount ?? 0,
          repeat: entity.scheduling?.reminders?.repeat ?? 0,
          // title: entity.scheduling?.reminders
          // text: Record<string, string>
        },
        // clinicalProtocol? : {
        //   requiresInClinicCompletion: boolean
        //   repeatAfterClinicVisit? : {
        //     unit: string
        //     unitsFromZero: number[]
        //   }
        // }
        notification: {
          title: entity.content.notification?.title,
          text: entity.content.notification?.text,
        },
        completionWindow: entity.scheduling?.completionWindow?.amount ? {
          unit: entity.scheduling?.completionWindow?.unit ?? 'min',
          amount: entity.scheduling?.completionWindow?.amount ?? 0
        } : undefined,
      },
      _relativeToReferenceTime: entity.scheduling?.relativeToReferenceTime ?? false,
      _repeatedProtocol: entity.scheduling?.repeatedProtocol ?? false,
      _reminderEnabled: entity.scheduling?.reminders?.enabled ?? false,
    }
  }

  getAll(projectId?: string, subjectId?: string): Observable<AppProtocol[]> {
    const headers = this.getHeaders();
    const appConfigBaseUrl = `${(typeof window !== 'undefined' ? window.location.origin : '')}/appconfig/api`;

    let urlSegment = `global`;
    if (projectId) {
      urlSegment = `projects/${projectId}`;
      if (subjectId) {
        urlSegment = `${urlSegment}/users/${subjectId}`;
      }
    }

    const url = `${appConfigBaseUrl}/${urlSegment}/config/${this.CLIENT_ID}`;

    return (!environment.localDeployment ? this.http.get<RadarConfigBundle>(url, {headers}) : MockProtocolServer.get(url)).pipe(
      map(configBundle => {
          const superProtocolString = this.getConfigsFromConfigBundle(configBundle)
            .find(config => config.name === 'main');
          const superProtocol = superProtocolString ? JSON.parse(superProtocolString.value) : [];
          const protocols = superProtocol?.['protocols'] as RadarProtocol[] || [];
          return protocols.map(p => this.radarToAppModel(p));
        }
      ));
  }

  publish(protocols: AppProtocol[], projectId?: string, subjectId?: string): Observable<AppProtocol[]> {
    const headers = this.getHeaders();
    const appConfigBaseUrl = `${(typeof window !== 'undefined' ? window.location.origin : '')}/appconfig/api`;
    let urlSegment = `global`;
    if (projectId) {
      urlSegment = `projects/${projectId}`;
      if (subjectId) {
        urlSegment = `${urlSegment}/users/${subjectId}`;
      }
    }
    console.log('Class: ProtocolService, Function: publish, Line 82 urlSegment' , urlSegment);

    const radarProtocols = protocols.map(p => this.appToRadarModel(p));
    const radarProtocolWrapper: RadarProtocolWrapper = {
      name: null,
      healthIssues: [],
      schemaVersion: null,
      version: null,
      protocols: radarProtocols
    };
    const configs = [{name: 'main', value: JSON.stringify(radarProtocolWrapper)}];

    return this.http.post<RadarConfigBundle>(`${appConfigBaseUrl}/${urlSegment}/config/${this.CLIENT_ID}`, {config: configs}, {headers}).pipe(
      map(configBundle => {
          const superProtocolString = this.getConfigsFromConfigBundle(configBundle).find(config => config.name === 'main');
          const superProtocol = superProtocolString ? JSON.parse(superProtocolString.value) : [];
          return superProtocol?.['protocols'] as AppProtocol[] || [];
        }
      )
    )
  }

  private getConfigsFromConfigBundle(_configBundle: RadarConfigBundle): RadarConfig[] {
    const configBundle: RadarConfigBundle = JSON.parse(JSON.stringify(_configBundle));

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

  private getHeaders() {
    return new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  }
}


export function extractStartText(textObject: Record<string, string> | null, languages: RadarOption[]): Record<string, string> {
  if (!textObject) return {};
  const result: Record<string, string> = {};
  languages.forEach(lang => {
    result[lang.id] = textObject[lang.id];
  });
  if (Object.keys(result).length === 0) return {};
  return result;
}

export function mapUnit(unit?: string): QuestionnaireTimeUnit {
  switch (unit) {
    case 'min': return QuestionnaireTimeUnit.min;
    case 'hour': return QuestionnaireTimeUnit.hour;
    case 'day': return QuestionnaireTimeUnit.day;
    case 'week': return QuestionnaireTimeUnit.week;
    case 'month': return QuestionnaireTimeUnit.month;
    case 'year': return QuestionnaireTimeUnit.year;
    default: return QuestionnaireTimeUnit.day;
  }
}

export function isRepeatedProtocol(repeatProtocol?: { unit: string; amount: number }) {
  if (!repeatProtocol) return false;
  const {unit, amount} = repeatProtocol ?? {unit: 'min', amount: 0};
  if (unit === 'year' && amount > 10) return false;
  else if (unit === 'month' && amount > 10 * 12) return false;
  else if (unit === 'week' && amount > 10 * 52) return false;
  else if (unit === 'day' && amount > 10 * 365) return false;
  else if (unit === 'hour' && amount > 10 * 365 * 24) return false;
  else if (unit === 'min' && amount > 10 * 365 * 24 * 60) return false;
  return true;
}

export function extractLanguages(entity: RadarProtocol): QuestionnaireLanguage[] {
  const languagesSet = new Set<QuestionnaireLanguage>();
  languagesSet.add(DEFAULT_LANGUAGE);
  Object.keys(entity.startText ?? {}).forEach(key => {
    if (entity.startText?.[key]) {
      languagesSet.add(ISO_LANGUAGES_MAP[key]);
    }
  });
  Object.keys(entity.endText ?? {}).forEach(key => {
    if (entity.endText?.[key]) {
      languagesSet.add(ISO_LANGUAGES_MAP[key]);
    }
  });
  Object.keys(entity.warn ?? {}).forEach(key => {
    if (entity.warn?.[key]) {
      languagesSet.add(ISO_LANGUAGES_MAP[key]);
    }
  });
  Object.keys(entity.protocol?.notification?.title ?? {}).forEach(key => {
    if (entity.protocol?.notification?.title?.[key]) {
      languagesSet.add(ISO_LANGUAGES_MAP[key]);
    }
  });
  Object.keys(entity.protocol?.notification?.text ?? {}).forEach(key => {
    if (entity.protocol?.notification?.text?.[key]) {
      languagesSet.add(ISO_LANGUAGES_MAP[key]);
    }
  });
  return [...languagesSet];
}


export function toTimestamp(referenceTimestamp: {timestamp: string; format: string}): string | undefined {
  if (referenceTimestamp?.format === 'date') {
    return referenceTimestamp.timestamp;
  }
  return undefined;
}

export function toReferenceTimestamp(timestamp: string | null): {timestamp: string; format: string} {
  if (!timestamp) return {timestamp: '', format: 'date'};
  return {
    timestamp: '',
    format: 'date'
  };
}
