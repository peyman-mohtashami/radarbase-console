import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, OperatorFunction } from "rxjs";


import { BaseEntityService } from '../../../services/base.entity.service';
import { QueryParams } from '@ngrx/data';
import { filter, map, tap } from "rxjs/operators";
import {
  getGlobalConfiguration,
  getProjectConfiguration,
} from '../../config/mock/mock-configs';
import { select, Store } from "@ngrx/store";
// import { project } from "../../../store/admin.selectors";
import { AppProject } from "../../project/models/project";
import { AppQuestionnaireBundle, toAppQuestionnaireBundle, toRadarQuestionnaireBundle } from "../models/questionnaire";
import {appData, data} from "../mock-app-config/data";
import {RadarProject} from '../../../../shared/models/radar-project.model';

@Injectable({providedIn: 'root'})
export class QuestionnaireService extends BaseEntityService<any, any> {
// export class QuestionnaireService extends BaseEntityService<
//   RadarQuestionnaireBundle,
//   AppQuestionnaireBundle
// > {
  // entities?: RadarConfigBundle;
  // project: RadarProject | null = null;
  override total = 0;

  override toAppModel = toAppQuestionnaireBundle;

  override toRadarModel = toRadarQuestionnaireBundle;

  constructor(http: HttpClient, private store: Store) {
    super(http);
    // this.store.pipe(
    //   select(project),
    //   filter(project => project !== undefined) as OperatorFunction<AppProject | null |  undefined, AppProject | null>
    // ).subscribe((project) => {
    //   this.project = project;
    // });
  }

  override getTotal(): number {
    return this.total;
  }

  override getWithQuery() {
    console.log('Class: QuestionnaireService, Function: getWithQuery, Line 52 ' , appData);
    return of(appData);
  }

  // override getWithQuery(
  //   queryParams?: QueryParams | string
  // ): Observable<AppQuestionnaireBundle[]> {
  //   if (this.project) {
  //     this.entities = getProjectConfiguration('aRMT', this.project.projectName.toString());
  //   } else {
  //     this.entities = getGlobalConfiguration('aRMT');
  //   }
  //   return (
  //     // this.http
  //     //   .get<DTO[]>(this.resourceUrl, {
  //     //     params,
  //     //     observe: 'response',
  //     //   })
  //     // of(configBundle).pipe(
  //     of(this.entities).pipe(
  //       tap((res) => console.log(res)),
  //       // tap(
  //       //   (res) =>
  //       //     (this.total = +(
  //       //       res.headers.get('x-total-count') ||
  //       //       res.body?.length.toString() ||
  //       //       '0'
  //       //     ))
  //       // ),
  //       // map((res) => {
  //       //   return (res.body || []).map((entity) =>
  //       //     this.transformFromApi(entity)
  //       //   );
  //       // })
  //       map((configBundle) => this.getConfigsFromConfigBundle(configBundle)),
  //       tap((res) => console.log(res)),
  //       map((configs) => this.filterConfigsByCategory(configs)),
  //       tap((res) => console.log(res)),
  //       map((questionnaires) => questionnaires.map((questionnaire) => this.toAppModel(questionnaire))),
  //       tap((res) => console.log(res)),
  //     )
  //   );
  // }

  // filterConfigsByCategory(configs: RadarConfig[]): RadarQuestionnaireBundle[] {
  //   const questionnaireBundles =  configs.find((config) => config.name === 'questionnaires')?.value
  //   return JSON.parse(questionnaireBundles || '[]') as RadarQuestionnaireBundle[]
  // }
  //
  // getConfigsFromConfigBundle(configs: RadarConfigBundle): RadarConfig[] {
  //   const mergedDefaultsWithConfigs = configs.defaults?.map((defaultConfig) => {
  //     let _config: RadarConfig = {
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
  //
  // // override transformFromApi(entity: RadarQuestionnaireDTO): RadarQuestionnaireDef {
  // //
  // // }
  // //
  // // override convertFilterParamsToHttpParams(params: HttpParams, queryParams?:Params){
  // //   // console.log(queryParams)
  // //   if(queryParams?.["login"] && queryParams['login'] !== '') {
  // //     params = params.append('login', queryParams['login']);
  // //   }
  // //   if(queryParams?.["externalId"] && queryParams['externalId'] !== '') {
  // //     params = params.append('externalId', queryParams['externalId']);
  // //   }
  // //   if(queryParams?.["personName"] && queryParams['personName'] !== '') {
  // //     params = params.append('personName', queryParams['personName']);
  // //   }
  // //   if(queryParams && queryParams['dateOfBirth.is'] && queryParams['dateOfBirth.is'] !== '') {
  // //     const newDate: Moment = moment(queryParams['dateOfBirth.is']);
  // //     // console.log(newDate.isValid())
  // //     if( moment(queryParams['dateOfBirth.is']).isValid()){
  // //       params = params.append('dateOfBirth.is', queryParams['dateOfBirth.is']);
  // //     }
  // //
  // //   }
  // //   if(queryParams && queryParams['enrollmentDate.from'] && queryParams['enrollmentDate.from'] !== '') {
  // //     params = params.append('enrollmentDate.from', queryParams['enrollmentDate.from']);
  // //   }
  // //   if(queryParams && queryParams['enrollmentDate.to'] && queryParams['enrollmentDate.to'] !== '') {
  // //     params = params.append('enrollmentDate.to', queryParams['enrollmentDate.to']);
  // //   }
  // //   if(queryParams?.["groupId"] && queryParams['groupId'] !== '') {
  // //     params = params.append('groupId', queryParams['groupId']);
  // //   }
  // //   return params;
  // // }
}
