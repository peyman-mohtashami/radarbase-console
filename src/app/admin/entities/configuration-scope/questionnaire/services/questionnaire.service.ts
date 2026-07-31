import {inject, Injectable} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from "../models/questionnaire";
import {forkJoin, Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {AppConfig} from "../../config/models/config";
import {getConfigsFromConfigBundle,} from '../../config/services/config.service';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {Params} from '@angular/router';
import {RadarbaseAppConfigService} from '../../../../../core/configuration/services/radarbase-app-config.service';
import {
  RadarProtocol,
  RadarProtocolWrapper,
  RadarQuestion,
  RadarQuestionnaire,
  RadarSubProtocol
} from '../models/protocol';
// import {RadarOption} from '../../../../../shared/components/mat-dynamic-input/mat-dynamic-input.component';

@Injectable({providedIn: 'root'})
export class QuestionnaireService extends BaseEntityService<AppQuestionnaire, AppQuestionnaire> {
  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);

  updatedList: AppQuestionnaire[] = [];

  override getWithQuery(queryParams?: Params, projectId?: string, subjectId?: string): Observable<AppQuestionnaire[]> {
    this.cacheLoaded = false;
    this.cache = [];

    const {
      pageIndex = 0,
      pageSize = 10,
      sortField = 'id',
      sortOrder = 'desc',
      ...filter
    } = queryParams ?? {};

    const process = (entities: AppQuestionnaire[]) => {
      const filteredEntities = this.getFilteredEntities(entities, filter);
      const sortedEntities = this.applySorting(filteredEntities, {sortField, sortOrder});
      return this.applyPagination(sortedEntities, {pageSize, pageIndex});
    };

    if (this.CACHE_ENABLED && this.cacheLoaded) {
      this.total.set(this.cache.length);
      return of(queryParams ? process(this.updatedList) : this.updatedList);
    }

    const radarProtocolConfigBundleObservable = this.radarbaseAppConfigService.getRadarConfigBundle('protocol-service', projectId, subjectId).pipe(
      map(configBundle => {
          const superProtocolString = getConfigsFromConfigBundle(configBundle)
            .find(config => config.name === 'main');
          const superProtocol = superProtocolString ? JSON.parse(superProtocolString.value) : [];
          return (superProtocol?.['protocols'] || []) as RadarProtocol[];
        }
      )
    );

    const radarQuestionnaireConfigBundleObservable = this.radarbaseAppConfigService.getRadarConfigBundle('questionnaire-service', projectId, subjectId).pipe(
      map(configBundle => {
          const radarConfigs = getConfigsFromConfigBundle(configBundle);
          return radarConfigs.reduce((acc: Record<string, Record<string, RadarQuestion[]>>, cur) => {
            const name = cur.name;
            const {base, lang} = parseName(name);
            acc[base] = {...acc[base], [lang]: JSON.parse(cur.value)};
            return acc;
          }, {});
        }
      )
    );

    return forkJoin({
      protocols: radarProtocolConfigBundleObservable,
      questionnaires: radarQuestionnaireConfigBundleObservable
    }).pipe(
      map(({ protocols, questionnaires }) =>
        protocols.map(protocol => {
          return this.toAppQuestionnaire(protocol, questionnaires[protocol.name])
        })
      ),
      tap((entities) => {
        console.log('Class: QuestionnaireService, Function: , Line 72 entities' , entities);
        this.cache = [...entities];
        this.updatedList = [...entities];
        this.cacheLoaded = true;
        this.total.set(entities.length);
      }),
      map((entities) => queryParams ? process(entities) : entities)
    );
  }

  toAppQuestionnaire(protocol: RadarProtocol, questionnaire?: Record<string, RadarQuestion[]>): AppQuestionnaire {
    const schedule: AppQuestionnaire['schedule'] = protocol.type === 'on_demand' ?
      {onDemand: true} :
      {
        onDemand: false,
        completionWindow: {
          unit: protocol.protocol?.completionWindow?.unit,
          amount: protocol.protocol?.completionWindow?.amount,
        },
        notification: {
          title: protocol.protocol?.notification?.title,
          text: protocol.protocol?.notification?.text,
        },
        referenceTimestamp: protocol.protocol?.referenceTimestamp?.timestamp,
        relativeToReferenceTime: !!protocol.protocol?.referenceTimestamp,
        reminders: {
          enabled: !!protocol.protocol?.reminders?.amount,
          unit: protocol.protocol?.reminders?.unit,
          amount: protocol.protocol?.reminders?.amount,
          repeat: protocol.protocol?.reminders?.repeat,
        },
        repeatedProtocol: protocol.protocol?.repeatProtocol.amount !== '999',
        repeatProtocol: {
          unit: protocol.protocol?.repeatProtocol.unit,
          amount: protocol.protocol?.repeatProtocol.amount,
        },
        repeatQuestionnaire: {
          unit: protocol.protocol?.repeatQuestionnaire.unit,
          unitsFromZero: protocol.protocol?.repeatQuestionnaire.unitsFromZero,
        }
      };

    return {
      modelVersion: "",
      version: "",
      name: protocol.name,
      defaultLanguage: protocol.defaultLanguage,
      languages: protocol.languages,
      title: protocol.title,
      description: protocol.description,
      isDemo: protocol.isDemo === 'true',
      order: protocol.order !== undefined ? `${protocol.order}` : undefined,
      showInCalendar: protocol.showInCalendar === 'true',

      showIntroduction: protocol.showIntroduction,
      startText: protocol.startText,
      endText: protocol.endText,
      warningEnabled: protocol.warningEnabled,
      warn: protocol.warn,
      estimatedCompletionTime: protocol.estimatedCompletionTime !== undefined ? `${protocol.estimatedCompletionTime}` : undefined,

      questions: this.toAppQuestions(questionnaire),
      schedule: schedule,
      isActive: protocol.isActive,
      isValid: protocol.isValid,

      _name: protocol.name,
      _search: protocol.name,
    }
  }

  toAppQuestions(
    radarQuestionsWrapper: Record<string, RadarQuestion[]> | undefined
  ): AppQuestion[] {
    if (!radarQuestionsWrapper) {
      return [];
    }

    const result = new Map<string, AppQuestion>();

    for (const [lang, questions] of Object.entries(radarQuestionsWrapper)) {
      for (const radarQuestion of questions) {
        // Use id if available, otherwise field_name
        const key = radarQuestion.id ?? radarQuestion.field_name;

        let appQuestion = result.get(key);

        if (!appQuestion) {
          appQuestion = {
            id: radarQuestion.id,
            field_name: radarQuestion.field_name,
            field_type: radarQuestion.field_type,
            required_field: radarQuestion.required_field,
            field_label: {},
            section_header: {},
            field_note: {},
            matrix_group_name: radarQuestion.matrix_group_name,
            matrix_ranking: radarQuestion.matrix_ranking,
            branching_logic: radarQuestion.branching_logic,
            conditionalLogic: radarQuestion.conditionalLogic,
            show_selected_label: radarQuestion.show_selected_label,
            multi_line: radarQuestion.multi_line,
            text_validation_type_or_show_slider_number: radarQuestion.text_validation_type_or_show_slider_number,
            text_validation_min: radarQuestion.text_validation_min,
            text_validation_max: radarQuestion.text_validation_max,
            date_type: radarQuestion.date_type,
            field_annotation: radarQuestion.field_annotation ? {
              image: radarQuestion.field_annotation?.image,
              timer: {
                start: Number(radarQuestion.field_annotation.timer?.start ?? 0),
                end: Number(radarQuestion.field_annotation.timer?.end ?? 0),
              },
              unit: radarQuestion.field_annotation.unit,
            } : undefined,
            range: radarQuestion.range ? {
              min: Number(radarQuestion.range.min),
              max: Number(radarQuestion.range.max),
              step: Number(radarQuestion.range.step),
              labelLeft: {},
              labelRight: {},
            }: undefined,
            calculation_fn: radarQuestion.calculation_fn,
            calculation_args: radarQuestion.calculation_args,
            isValid: radarQuestion.isValid,
          };

          if (radarQuestion.select_choices_or_calculations) {
            appQuestion.select_choices_or_calculations =
              radarQuestion.select_choices_or_calculations.map(choice => ({
                code: choice.code,
                label: {},
              }));
          }

          result.set(key, appQuestion);
        }

        // Localized fields
        appQuestion.field_label[lang] = radarQuestion.field_label;

        if (radarQuestion.section_header) {
          appQuestion.section_header ??= {};
          appQuestion.section_header[lang] = radarQuestion.section_header;
        }

        if (radarQuestion.field_note) {
          appQuestion.field_note ??= {};
          appQuestion.field_note[lang] = radarQuestion.field_note;
        }

        if (appQuestion.range && radarQuestion.range) {
          if (radarQuestion.range.labelLeft) {
            appQuestion.range.labelLeft ??= {};
            appQuestion.range.labelLeft[lang] = radarQuestion.range.labelLeft;
          }

          if (radarQuestion.range.labelRight) {
            appQuestion.range.labelRight ??= {};
            appQuestion.range.labelRight[lang] = radarQuestion.range.labelRight;
          }
        }

        if (
          appQuestion.select_choices_or_calculations &&
          radarQuestion.select_choices_or_calculations
        ) {
          radarQuestion.select_choices_or_calculations.forEach((choice, index) => {
            appQuestion!.select_choices_or_calculations![index].label[lang] =
              choice.label;
          });
        }
      }
    }

    return [...result.values()];
  }

  override getEntity(key: number | string): AppQuestionnaire {
    const entity = this.updatedList.find(item => item._name === key);
    if (!entity) throw new Error(`Entity with id ${key} not found`);
    return entity;
  }

  override add(entity: AppQuestionnaire): Observable<AppQuestionnaire> {
    console.log('Class: QuestionnaireService, Function: add, Line 258 entity' , entity);
    this.total.set(this.total() + 1);
    this.updatedList.push(entity);
    return this.publish(this.updatedList).pipe(map(() => entity));
  }

  override update(update: AppQuestionnaire): Observable<AppQuestionnaire> {
    this.updatedList = this.updatedList.map((e) => (e._name === update._name ? update : e));
    return this.publish(this.updatedList).pipe(map(() => update));
  }

  override delete(entity: AppQuestionnaire): Observable<void> {
    this.updatedList = this.updatedList.filter((e) => e._name !== entity._name);
    return this.publish(this.updatedList).pipe(map(() => undefined));
  }

  publish(questionnaires: AppQuestionnaire[], projectId?: string, subjectId?: string): Observable<AppQuestionnaire[]> {
    console.log('Class: QuestionnaireService, Function: publish, Line 274 questionnaires' , questionnaires);
    const {protocols: ps, questionnaires: qs} = this.splitProtocolsAndQuestionnaires(questionnaires);

    const radarProtocolWrapper: RadarProtocolWrapper = {
      name: null,
      healthIssues: [],
      schemaVersion: null,
      version: null,
      protocols: ps
    };
    const protocolConfigs: AppConfig[] = [{
      name: 'main', value: JSON.stringify(radarProtocolWrapper),
      search: ''
      // id: "",
      // _name: ""
    }];

    const radarProtocolConfigBundleObservable = this.radarbaseAppConfigService.postConfig(protocolConfigs, 'protocol-service', projectId, subjectId);

    const questionnaireConfigs: AppConfig[] = [];
    qs.forEach(q => {
      const name = q.name;
      Object.keys(q.questions).forEach(lang => {
        questionnaireConfigs.push({search: '', name: `${name}_${lang}`, value: JSON.stringify(q.questions[lang])});
      })
    });

    const radarQuestionnaireConfigBundleObservable = this.radarbaseAppConfigService.postConfig(questionnaireConfigs, 'questionnaire-service', projectId, subjectId);
    return forkJoin({
      protocols: radarProtocolConfigBundleObservable,
      questionnaires: radarQuestionnaireConfigBundleObservable
    }).pipe(
      map(() => {
        return questionnaires;
      })
    );
  }

  splitProtocolsAndQuestionnaires(questionnaires: AppQuestionnaire[]): {protocols: RadarProtocol[], questionnaires: RadarQuestionnaire[]} {
    console.log('Class: QuestionnaireService, Function: splitProtocolsAndQuestionnaires, Line 319 questionnaires' , questionnaires);
    const result: {protocols: RadarProtocol[]; questionnaires: RadarQuestionnaire[]} = {protocols: [], questionnaires: []};
    questionnaires.forEach(q => {
      result.protocols.push({
        name: q.name,
        title: q.title,
        description: q.description,
        defaultLanguage: q.defaultLanguage,
        languages: q.languages,
        isDemo: q.isDemo ? 'true' : 'false',
        order: q.order,
        showInCalendar: q.showInCalendar ? 'true' : 'false',
        showIntroduction: q.showIntroduction,
        startText: q.startText ?? {},
        endText: q.endText ?? {},
        warningEnabled: !!q.warningEnabled,
        warn: q.warn ?? {},
        estimatedCompletionTime: q.estimatedCompletionTime,
        protocol: this.toRadarSubProtocol(q.schedule),
        type: q.schedule?.onDemand ? 'on_demand' : undefined,
        isValid: !!q.isValid,
        isActive: !!q.isActive
      });
      result.questionnaires.push({
        name: q.name,
        languages: q.languages.map(l => l.code.toString()),
        questions: this.toRadarQuestionsWrapper(q.questions ?? [], q.languages),
      });
    })
    return result;
  }

  toRadarQuestionsWrapper(appQuestions: AppQuestion[], languages: AppQuestionnaireLanguage[]): Record<string, RadarQuestion[]> {
    const result: Record<string, RadarQuestion[]> = {};
    for (const language of languages) {
      result[language.code] = this.toRadarQuestions(appQuestions, language);
    }
    return result;
  }

  toRadarQuestions(appQuestions: AppQuestion[], language: AppQuestionnaireLanguage): RadarQuestion[] {
    return appQuestions.map(q => {
      // const branchingLogic = q.conditionalLogic?.map((conditionalLogicItems) =>
      //   conditionalLogicItems.map(i => `[${i.operand}]${i.operator}'${i.value}'`).join(' and ')
      // ).join(' or ');
      return {
        field_name: q.field_name,
        field_type: q.field_type,
        required_field: q.required_field,
        field_label: q.field_label[language.code],
        section_header: q.section_header?.[language.code],
        select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
          return {
            code: c.code,
            label: c.label[language.code]
          }
        }),
        text_validation_type_or_show_slider_number: q.text_validation_type_or_show_slider_number,
        text_validation_min: q.text_validation_min,
        text_validation_max: q.text_validation_max,
        field_annotation: q.field_annotation ? {
          image: q.field_annotation.image,
          timer: {
            start: q.field_annotation.timer.start.toString(),
            end: q.field_annotation.timer.end.toString()
          },
          unit: q.field_annotation.unit
        } : undefined,
        field_note: q.field_note?.[language.code],
        multi_line: q.multi_line,
        show_selected_label: q.show_selected_label,
        date_type: q.date_type,
        range: q.range ? {
          min: q.range?.min?.toString() ?? "",
          max: q.range?.max?.toString() ?? "",
          step: q.range?.step?.toString() ?? "",
          labelLeft: q.range?.labelLeft?.[language.code],
          labelRight: q.range?.labelRight?.[language.code]
        } : undefined,
        matrix_group_name: q.matrix_group_name,
        //matrix_ranking?:
        branching_logic: q.branching_logic,//branchingLogic,
        conditionalLogic: q.conditionalLogic,
        calculation_fn: q.calculation_fn,
        calculation_args: q.calculation_args,
        isValid: q.isValid
      }
    });
  }

  toRadarSubProtocol(schedule: AppQuestionnaire['schedule']):  RadarSubProtocol | undefined {
    if (schedule && schedule.onDemand) {
      return undefined;
    }

    const {relativeToReferenceTime, referenceTimestamp, repeatedProtocol, repeatProtocol, repeatQuestionnaire, completionWindow, notification, reminders} = schedule!;
    return {
      referenceTimestamp: relativeToReferenceTime ? {timestamp: referenceTimestamp!, format: ''} : undefined,
      repeatProtocol: repeatedProtocol ? {
        unit: repeatProtocol!.unit!,
        amount: repeatProtocol!.amount!
      } : {
        unit: 'year',
        amount: '999'
      },
      repeatQuestionnaire: {
        unit: 'min',
        unitsFromZero: repeatQuestionnaire?.unitsFromZero ?? []
      },
      reminders: reminders && reminders.enabled ? {
        enabled: reminders.enabled,
        unit: reminders.unit!,
        amount: reminders.amount!,
        repeat: reminders.repeat!,
        title: {},
        text: {}
      } : undefined,
      // clinicalProtocol?: {
      //   requiresInClinicCompletion: boolean;
      //   repeatAfterClinicVisit?: {
      //     unit: string;
      //     unitsFromZero: number[];
      //   };
      // };
      notification: {
        title: notification?.title,
        text: notification?.text
      },
      completionWindow: {
        unit: completionWindow!.unit!,
        amount: completionWindow!.amount!
      },
      relativeToReferenceTime: relativeToReferenceTime ?? false,
      repeatedProtocol: repeatedProtocol ?? false,

    };
  }

  override toRadarModel(entity: AppQuestionnaire): AppQuestionnaire {
    const { _name, _search, ...rest } = entity;

    const schedule = entity.schedule ?? {};

    const onDemand = schedule?.onDemand ?? false;

    const updatedSchedule: Partial<AppQuestionnaire['schedule']> = {onDemand};

    if (!onDemand) {
      const {
        completionWindow,
        repeatQuestionnaire,
        repeatedProtocol,
        repeatProtocol,
        relativeToReferenceTime,
        referenceTimestamp,
        notification,
        reminders
      } = schedule;

      updatedSchedule.completionWindow = completionWindow ?? {};
      updatedSchedule.repeatQuestionnaire = repeatQuestionnaire ?? {};
      updatedSchedule.repeatedProtocol = repeatedProtocol ?? false;
      if (repeatedProtocol) {
        updatedSchedule.repeatProtocol = repeatProtocol ?? {};
      }
      updatedSchedule.relativeToReferenceTime = relativeToReferenceTime ?? false;
      if (relativeToReferenceTime) {
        updatedSchedule.referenceTimestamp = `${new Date(referenceTimestamp ?? 0).getTime() ?? ''}`;
      }

      if (notification) {
        updatedSchedule.notification = notification;
      }

      if (reminders) {
        const {enabled} = reminders;
        if (enabled) {
          updatedSchedule.reminders = {...reminders, enabled: true};
        } else {
          updatedSchedule.reminders = {enabled: false}
        }
      }
    }

    // return {_name: '', _search: '', ...rest}

    return {
      ...rest,
      _name: '',
      _search: '',
      schedule: updatedSchedule,
      questions: entity.questions ?? [],
    }
  }
}

function parseName(name: string): { base: string; lang: string } {
  const m = name.match(/^(.*)_(.+)$/);
  return m ? {base: m[1], lang: m[2]} : {base: name, lang: 'en'};
}

