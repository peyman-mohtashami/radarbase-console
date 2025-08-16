import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, OperatorFunction } from "rxjs";

import { BaseEntityService } from '../../../services/base.entity.service';
import { QueryParams } from '@ngrx/data';
// import { MOCK_PROTOCOLS } from '../mock/data';
// import {
//   getGlobalConfiguration,
//   getProjectConfiguration,
// } from '../../config/mock/mock-configs';
import { filter, map } from "rxjs/operators";
import { select, Store } from "@ngrx/store";
import { project } from "../../../store/admin.selectors";
import { AppProject } from "../../project/models/project";
import {
  deleteGlobalProtocol,
  deleteProjectProtocol,
  getGlobalProtocols,
  getProjectProtocols,
  postGlobalProtocol,
  postProjectProtocol, updateGlobalProtocol, updateProjectProtocol
} from "../mock/protocols";
import { AppProtocol, toAppProtocol, toRadarProtocol } from "../models/protocol";
import {RadarProtocol} from '../../../../shared/models/radar-protocol.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';

@Injectable({providedIn: 'root'})
export class ProtocolService extends BaseEntityService<
  RadarProtocol,
  AppProtocol
> {
  entities?: RadarProtocol[];
  project: RadarProject | null = null;
  override total = 0;

  override toAppModel = toAppProtocol;

  override toRadarModel = toRadarProtocol;

  constructor(http: HttpClient, private store: Store) {
    super(http);
    this.store.pipe(
      select(project),
      filter(project => project !== undefined) as OperatorFunction<AppProject | null |  undefined, AppProject | null>
    ).subscribe((project) => {
      this.project = project;
    });
  }

  override getTotal(): number {
    return this.total;
  }

  override getWithQuery(
    queryParams?: QueryParams | string
  ): Observable<AppProtocol[]> {
    if (this.project) {
      // this.entities = getProjectConfiguration('aRMT', this.project.projectName.toString());
      this.entities = getProjectProtocols(this.project.projectName);
    } else {
      // this.entities = getGlobalConfiguration('aRMT');
      this.entities = getGlobalProtocols();
    }
    return (
      // this.http
      //   .get<DTO[]>(this.resourceUrl, {
      //     params,
      //     observe: 'response',
      //   })
      // of(configBundle).pipe(
      of(this.entities).pipe(
        // tap(
        //   (res) =>
        //     (this.total = +(
        //       res.headers.get('x-total-count') ||
        //       res.body?.length.toString() ||
        //       '0'
        //     ))
        // ),
        // map((res) => {
        //   return (res.body || []).map((entity) =>
        //     this.transformFromApi(entity)
        //   );
        // })
        // map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
        // map((configs) => this.filterConfigsByCategory(configs)),
        map((protocols) => protocols.map((protocol) => this.toAppModel(protocol)))
      )
    );
  }

  // private filterConfigsByCategory(configs: RadarConfigDTO[]): RadarProtocolDTO[] {
  //   const protocols =  configs.find((config) => config.name === 'protocols')?.value
  //   return JSON.parse(protocols || '[]') as RadarProtocolDTO[]
  // }
  //
  // private getConfigsFromConfigBundle(configs: RadarConfigBundleDTO): RadarConfigDTO[] {
  //   const mergedDefaultsWithConfigs = configs.defaults?.map((defaultConfig) => {
  //     let _config: RadarConfigDTO = {
  //       name: defaultConfig.name,
  //       default: defaultConfig.value,
  //       value: defaultConfig.value,
  //       scope: defaultConfig.scope,
  //     };
  //     configs.config.forEach((config, index, arr) => {
  //       if (defaultConfig.name === config.name) {
  //         _config = {
  //           name: defaultConfig.name,
  //           default: defaultConfig.value,
  //           value: config.value,
  //           scope: defaultConfig.scope,
  //         };
  //         arr.splice(index, 1);
  //       }
  //     });
  //     return _config;
  //   });
  //
  //   let _configs = [...configs.config];
  //   if (mergedDefaultsWithConfigs) {
  //     _configs = [..._configs, ...mergedDefaultsWithConfigs];
  //   }
  //   return _configs;
  // }

  override add(entity: AppProtocol): Observable<AppProtocol> {
    console.log('add protocol')
    if (this.project) {
      console.log('add protocol 0 ')
      // this.entities = getProjectConfiguration('aRMT', this.project.projectName.toString());
      return of(this.toAppModel(postProjectProtocol(this.project.projectName, entity)));
    } else {
      console.log('add protocol 1')
      console.log(entity);
      const t1 = this.toRadarModel(entity);
      console.log(t1)
      const t2 = postGlobalProtocol(t1);
      console.log(t2)
      const t3 = this.toAppModel(t2);
      console.log(t3)

      // console.log()
      // console.log(postGlobalProtocol(this.transformToApi(entity)));
      // this.entities = getGlobalConfiguration('aRMT');
      return of(t3);
    }
  }

  getById(key: number | string): Observable<AppProtocol> {
    return of()
    // const protocol = MOCK_PROTOCOLS.filter((p) => p.id === +key);
    // return of(protocol[0]).pipe(map((entity) => this.transformFromApi(entity)));
    // //return this.http.get<RadarProtocol>(`${this.resourceUrl}/${encodeURIComponent(key)}`);
  }
  //
  override update(update: AppProtocol): Observable<AppProtocol> {
    console.log("update", update);
    if (this.project) {
      console.log('update protocol 0 ')
      // this.entities = getProjectConfiguration('aRMT', this.project.projectName.toString());
      return of(this.toAppModel(updateProjectProtocol(this.project.projectName, update)));
    } else {
      console.log('update protocol 1')
      console.log(update);
      const t1 = this.toRadarModel(update);
      console.log(t1)
      const t2 = updateGlobalProtocol(t1);
      console.log(t2)
      const t3 = this.toAppModel(t2);
      console.log(t3)

      // console.log()
      // console.log(postGlobalProtocol(this.transformToApi(entity)));
      // this.entities = getGlobalConfiguration('aRMT');
      return of(t3);
    }
  }

  override delete(key: number | string): Observable<number | string> {
    console.log(key)
    if (this.project) {
      return of(deleteProjectProtocol(this.project.projectName, key));
    } else {
      console.log('del protocol 1')
      // console.log(entity);
      // const t1 = this.transformToApi(entity);
      // console.log(t1)
      const t2 = deleteGlobalProtocol(key);
      console.log(t2)
      // const t3 = this.transformFromApi(t2);
      // console.log(t3)

      // console.log()
      // console.log(postGlobalProtocol(this.transformToApi(entity)));
      // this.entities = getGlobalConfiguration('aRMT');
      return of(t2);
    }
    // return this.http.delete<number | string>(
    //   `${this.resourceUrl}/${encodeURIComponent(key)}`
    // );
  }



  // override toDto(entity: RadarProtocol): ProtocolDTO {
  //   // find all languages and default language
  //   // const defaultLanguage: ProtocolLanguage = {
  //   //   code: 'en',
  //   //   default: true,
  //   //   valid: true,
  //   // };
  //   const languagesSet = new Set<string>();
  //   // languagesSet.add('en');
  //   Object.keys(entity.startText || {}).forEach((language) => {
  //     if (entity.startText?.[language]) {
  //       languagesSet.add(language);
  //     }
  //   });
  //   Object.keys(entity.endText || {}).forEach((language, index) => {
  //     if (entity.endText?.[language] || index === 0) {
  //       languagesSet.add(language);
  //     }
  //   });
  //   Object.keys(entity.warn || {}).forEach((language, index) => {
  //     if (entity.warn?.[language] || index === 0) {
  //       languagesSet.add(language);
  //     }
  //   });
  //   if (!languagesSet.size) {
  //     languagesSet.add('en');
  //   }
  //   const defaultLanguage = [...languagesSet][0];
  //   console.log(entity);
  //   Object.keys(entity.protocol?.notification?.title || {}).forEach(
  //     (language, index) => {
  //       if (entity.protocol?.notification?.title?.[language] || index === 0) {
  //         languagesSet.add(language);
  //       }
  //     }
  //   );
  //   Object.keys(entity.protocol?.notification?.text || {}).forEach(
  //     (language, index) => {
  //       if (entity.protocol?.notification?.text?.[language] || index === 0) {
  //         languagesSet.add(language);
  //       }
  //     }
  //   );
  //   return {
  //     ...entity,
  //     // uId: entity.id,
  //     // uName: entity.name,
  //     languages: [...languagesSet].map((l, index) => ({
  //       code: l,
  //       default: index === 0,
  //     })),
  //     defaultLanguage: defaultLanguage,
  //     customStartText: {
  //       enabled: !!entity.showIntroduction,
  //       startText: entity.startText?.[defaultLanguage],
  //       // defaultLanguage
  //       //   ? entity.startText //?.[defaultLanguage.name]
  //       //   : undefined,
  //     },
  //     customEndText: {
  //       enabled: !!entity.endText?.[defaultLanguage],
  //       endText: entity.endText?.[defaultLanguage]
  //       // defaultLanguage
  //       //   ? entity.endText //?.[defaultLanguage]
  //       //   : undefined,
  //     },
  //     customWarnText: {
  //       enabled: !!entity.warn?.[defaultLanguage],
  //       warn: entity.warn?.[defaultLanguage]
  //       // defaultLanguage
  //       //   ? entity.warn
  //       //   : undefined, //?.[defaultLanguage] : undefined,
  //     },
  //     customProtocol: {
  //       repeatProtocol: {
  //         enabled:
  //           (!!entity.protocol.repeatProtocol?.unit &&
  //             !!entity.protocol.repeatProtocol?.amount &&
  //             entity.protocol.repeatProtocol?.unit !== 'year') ||
  //           (entity.protocol.repeatProtocol?.unit === 'year' &&
  //             (entity.protocol.repeatProtocol?.amount || 0) < 10),
  //         unit: entity.protocol?.repeatProtocol?.unit,
  //         amount: entity.protocol?.repeatProtocol?.amount,
  //       },
  //       repeatQuestionnaire: {
  //         times: entity?.protocol?.repeatQuestionnaire?.unitsFromZero
  //           ?.map((t) => this.minutes2WDHM(t))
  //           .join(','),
  //         //repeatQuestionnaireTimes, //rawData.protocol?.repeatQuestionnaire?.times,
  //         unit: entity.protocol?.repeatQuestionnaire?.unit,
  //         //unitsFromZero: repeatQuestionnaireTimes,
  //       },
  //       reminders: {
  //         enabled: !!(
  //           entity.protocol?.reminders?.unit &&
  //           entity.protocol?.reminders?.repeat
  //         ),
  //         unit: entity.protocol?.reminders?.unit,
  //         amount: entity.protocol?.reminders?.amount,
  //         repeat: entity.protocol?.reminders?.repeat,
  //       },
  //       clinicalProtocol: {
  //         enabled: !!entity.protocol?.clinicalProtocol, //?.enabled,
  //         requiresInClinicCompletion:
  //           entity.protocol?.clinicalProtocol?.requiresInClinicCompletion,
  //         repeatAfterClinicVisit: {
  //           enabled: !!(
  //             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unit &&
  //             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
  //               ?.unitsFromZero
  //           ),
  //           unit: entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit
  //             ?.unit,
  //           unitsFromZero:
  //             entity.protocol?.clinicalProtocol?.repeatAfterClinicVisit?.unitsFromZero?.join(
  //               ','
  //             ),
  //         },
  //       },
  //       notification: {
  //         enabled: !!(
  //           defaultLanguage &&
  //           (entity.protocol?.notification?.title?.[defaultLanguage] ||
  //             entity.protocol?.notification?.text?.[defaultLanguage])
  //         ),
  //         title:  entity.protocol?.notification?.title?.[defaultLanguage],
  //           // ? entity.protocol?.notification?.title //?.[defaultLanguage]
  //           // : undefined,
  //         text: entity.protocol?.notification?.text?.[defaultLanguage],
  //           // // defaultLanguage
  //           // ? entity.protocol?.notification?.text //?.[defaultLanguage]
  //           // : undefined,
  //       },
  //       completionWindow: {
  //         enabled: !!(
  //           entity.protocol?.completionWindow?.unit &&
  //           entity.protocol?.completionWindow?.amount
  //         ),
  //         unit: entity.protocol.completionWindow?.unit || '',
  //         amount: entity.protocol?.completionWindow?.amount || 0,
  //       },
  //     },
  //   };
  // }
  // override fromDto(entity: ProtocolDTO): RadarProtocol {
  //   const modifiedEntity = {
  //     id: entity.id,
  //     name: entity.name,
  //     showIntroduction: entity.customStartText?.enabled,
  //     showInCalendar: entity.showInCalendar,
  //     isDemo: entity.isDemo,
  //     order: entity.order,
  //     questionnaire: {
  //       repository: '',
  //       name: entity.questionnaire.name,
  //       avsc: entity.questionnaire.avsc,
  //     },
  //     startText: {
  //       ...entity.startText,
  //       [entity.defaultLanguage]: entity.customStartText.startText,
  //     },
  //     endText: {
  //       ...entity.endText,
  //       [entity.defaultLanguage]: entity.customEndText.endText,
  //     },
  //     warn: {
  //       ...entity.warn,
  //       [entity.defaultLanguage]: entity.customWarnText.warn,
  //     },
  //     estimatedCompletionTime: entity.estimatedCompletionTime,
  //     protocol: {
  //       repeatProtocol: {
  //         unit: entity.customProtocol.repeatProtocol?.enabled
  //           ? entity.customProtocol.repeatProtocol.unit
  //           : 'year',
  //         amount: entity.customProtocol.repeatProtocol?.enabled
  //           ? entity.customProtocol.repeatProtocol.amount
  //           : 9999,
  //       },
  //       repeatQuestionnaire: {
  //         unit: entity.customProtocol.repeatQuestionnaire?.unit,
  //         unitsFromZero: entity.customProtocol.repeatQuestionnaire?.times
  //           ?.split(',')
  //           .map((item) => this.WDHM2minutes(item)), // todo
  //       },
  //       reminders: entity.customProtocol.reminders?.enabled
  //         ? {
  //             unit: entity.customProtocol.reminders.unit,
  //             amount: entity.customProtocol.reminders.amount,
  //             repeat: entity.customProtocol.reminders.repeat,
  //           }
  //         : undefined,
  //       clinicalProtocol: entity.customProtocol.clinicalProtocol?.enabled
  //         ? {
  //             requiresInClinicCompletion:
  //               entity.customProtocol.clinicalProtocol
  //                 .requiresInClinicCompletion,
  //             repeatAfterClinicVisit: {
  //               unit: entity.customProtocol.clinicalProtocol
  //                 ?.repeatAfterClinicVisit?.unit || "",
  //               unitsFromZero:
  //                 entity.customProtocol.clinicalProtocol?.repeatAfterClinicVisit
  //                   ?.unitsFromZero?.split(',').map(item => +item) || [],
  //             },
  //           }
  //         : undefined,
  //       notification: entity.customProtocol.notification?.enabled
  //         ? {
  //             title: {
  //               ...entity.protocol.notification?.title,
  //               [entity.defaultLanguage]:
  //                 entity.customProtocol.notification.title || "",
  //             },
  //             text: {
  //               ...entity.protocol.notification?.text,
  //               [entity.defaultLanguage]:
  //                 entity.customProtocol.notification.text || "",
  //             },
  //           }
  //         : undefined,
  //       completionWindow: entity.customProtocol.completionWindow?.enabled
  //         ? {
  //           unit: entity.customProtocol.completionWindow?.enabled
  //             ? entity.customProtocol.completionWindow.unit
  //             : '',
  //           amount: entity.customProtocol.completionWindow?.enabled
  //             ? entity.customProtocol.completionWindow.amount
  //             : 0,
  //         } : undefined,
  //     }, //RadarSubProtocol,
  //     // description: entity.description,
  //     //createdAt?: entity.createdAt,
  //     modifiedAt: new Date().toString(),
  //     //createdBy?: string;
  //     modifiedBy: 'peyman',
  //     // attributes?: Record<string, string>;
  //   };
  //   console.log(modifiedEntity);
  //   return modifiedEntity;
  //   // return { ...entity };
  // }




}


export function minutes2WDHM(minutes: number): string {
  const w = Math.floor(minutes / (60 * 24 * 7));
  const d = Math.floor((minutes % (60 * 24 * 7)) / (60 * 24));
  const h = Math.floor((minutes % (60 * 24)) / 60);
  const m = Math.floor(minutes % 60);

  const wDisplay = w > 0 ? 'W' + (w + 1) + '/' : ''; //+ (w == 1 ? " week, " : " weeks, ") : "";
  const dDisplay = d > 0 ? 'D' + (d + 1) + '/' : ''; //+ (d == 1 ? " day, " : " days, ") : "";
  const hDisplay = h < 10 ? '0' + h : h; // h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  const mDisplay = m < 10 ? '0' + m : m; //m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";

  return wDisplay + dDisplay + hDisplay + ':' + mDisplay; //.replace(/,\s*$/, "");
}

export function WDHM2minutes(wdhm: string): number {
  let w = 0,
    d = 0,
    h = 0,
    m = 0;
  const array = wdhm.split('/');
  array.forEach((item) => {
    if (item.trim().startsWith('W')) {
      w = +item.substring(1).trim();
    } else if (item.trim().startsWith('D')) {
      d = +item.substring(1).trim();
    } else {
      h = +item.split(':')[0].trim();
      m = +item.split(':')[1].trim();
    }
  });
  return w * 7 * 24 * 60 + d * 24 * 60 + h * 60 + m;
}
