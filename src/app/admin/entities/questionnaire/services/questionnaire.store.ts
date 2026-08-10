import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {AppQuestion, AppQuestionnaire, AppQuestionnaireLanguage} from "../models/questionnaire";
import {firstValueFrom} from "rxjs";
import {AppConfig} from "../../config/models/config";
import {Params} from '@angular/router';
import {
  ProtocolDto,
  ProtocolWrapperDto,
  QuestionDto,
  QuestionnaireDto,
  SubProtocolDto
} from '../models/protocol';
import {ProjectStore} from '../../project/services/project.store';
import {SubjectStore} from '../../project-subject/services/subject.store';
import {PageEvent} from '@angular/material/paginator';
import {RbSort, TableElement} from '../../../shared/models/table.model';
import {
  FilterEvent
} from '../../../shared/components/data-table-filter/data-table-filter.component';
import {filterItems, paginateItems, sortItems} from '../../../shared/utils/store-helpers';
import {QuestionnaireService} from './questionnaire.service';
import {QuestionnaireConfigService} from './questionnaire-config.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireStore {
  private api = inject(QuestionnaireService);
  private configService = inject(QuestionnaireConfigService);
  private errorHandler = inject(ErrorHandler);

  private projectStore = inject(ProjectStore);
  private subjectStore = inject(SubjectStore);

  readonly allItems = signal<AppQuestionnaire[]>([]);
  readonly selected = signal<AppQuestionnaire | null>(null);
  readonly total = signal<number>(0);
  readonly loading = signal(false);
  readonly error = signal<Error | null>(null);

  readonly page = signal<PageEvent>({
    pageIndex: 0,
    pageSize: this.configService.getStoredPageSize(),
    length: 0,
  });
  readonly sort = signal<RbSort>({sortField: 'id', sortOrder: 'desc'});
  readonly filter = signal<FilterEvent>({});

  readonly items = computed<AppQuestionnaire[]>(() => {
    const filtered = filterItems(this.allItems(), this.filter() as Record<string, string | undefined>);
    const sorted = sortItems(filtered, this.sort());
    const {pageIndex, pageSize} = this.page();
    return paginateItems(sorted, {pageIndex, pageSize});
  });

  setPage(page: PageEvent) {
    this.configService.setStoredPageSize(page.pageSize);
    this.page.set(page);
  }

  toggleSort({name, sortable}: TableElement) {
    if (!sortable) return;
    this.sort.update(({sortOrder}) => ({
      sortField: name,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    }));
  }

  setFilter(filter: FilterEvent) {
    this.filter.set(filter);
  }

  applyQueryParams(queryParams: Params = {}) {
    this.page.set({
      pageIndex: +(queryParams['pageIndex'] ?? 0),
      pageSize: +(queryParams['pageSize'] ?? this.configService.getStoredPageSize()),
      length: 0,
    });
    this.sort.set({
      sortField: queryParams['sortField'] ?? 'id',
      sortOrder: queryParams['sortOrder'] ?? 'desc',
    });
    this.filter.set(this.buildFilter(queryParams));
  }

  private buildFilter(queryParams: Params): FilterEvent {
    return this.configService.getTableFilters().reduce<FilterEvent>((filter, {name}) => {
      filter[name] = queryParams[name];
      return filter;
    }, {});
  }

  async getAll(): Promise<boolean> {
    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    this.loading.set(true);
    try {
      const protocolConfigDtos = await firstValueFrom(this.api.getWithQuery('protocol-service', project?.projectName, subject?.login));
      const superProtocolString = protocolConfigDtos.find(config => config.name === 'main');
      const superProtocol = superProtocolString ? JSON.parse(superProtocolString.value) : [];
      const protocolDtos = (superProtocol?.['protocols'] || []) as ProtocolDto[];

      const questionnaireConfigDtos = await firstValueFrom(this.api.getWithQuery('questionnaire-service', project?.projectName, subject?.login));
      const t = questionnaireConfigDtos.reduce((acc: Record<string, Record<string, QuestionDto[]>>, cur) => {
        const name = cur.name;
        const {base, lang} = parseName(name);
        acc[base] = {...acc[base], [lang]: JSON.parse(cur.value)};
        return acc;
      }, {});

      const q = protocolDtos.map(p => {
        return this.toAppQuestionnaire(p, t[p.name])
      })

      this.allItems.set(q);
      this.total.set(q.length);
      return true;
    } catch (e) {
      this.errorHandler.handleError(e);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  async add(entity: AppQuestionnaire): Promise<boolean> {
    this.allItems.update((value) => ([...value, entity]));
    return true;
  }

  async update(entity: AppQuestionnaire): Promise<boolean> {
    this.allItems.update((items) =>
      ([...items.map(item => item.name === entity.name ? entity : item)])
    );
    return true;
  }

  async delete(entity: AppQuestionnaire): Promise<boolean> {
    this.allItems.update((items) =>
      [...items.filter(item => item.name !== entity.name)]
    );
    return true;
  }

  async publish(): Promise<boolean>{
    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    const {protocols: ps, questionnaires: qs} = this.splitProtocolsAndQuestionnaires(this.allItems());
    const radarProtocolWrapper: ProtocolWrapperDto = {
      name: null,
      healthIssues: [],
      schemaVersion: null,
      version: null,
      protocols: ps
    };
    const protocolConfigs: AppConfig[] = [{
      name: 'main', value: JSON.stringify(radarProtocolWrapper),
      search: ''
    }];

    const questionnaireConfigs: AppConfig[] = [];
    qs.forEach(q => {
      const name = q.name;
      Object.keys(q.questions).forEach(lang => {
        questionnaireConfigs.push({search: '', name: `${name}_${lang}`, value: JSON.stringify(q.questions[lang])});
      })
    });

    this.loading.set(true);
    this.error.set(null);
    try {
      await firstValueFrom(this.api.publish(protocolConfigs, 'protocol-service', project?.projectName, subject?.login));
      await firstValueFrom(this.api.publish(questionnaireConfigs, 'questionnaire-service', project?.projectName, subject?.login));
      await this.getAll();
      return true;
    } catch
      (e) {
      this.error.set(e as Error);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  toAppQuestionnaire(protocol: ProtocolDto, questionnaire?: Record<string, QuestionDto[]>): AppQuestionnaire {
    const schedule: AppQuestionnaire['schedule'] = protocol.type === 'on_demand' ?
      undefined :
      {
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

      // _name: protocol.name,
      search: protocol.name,
    }
  }

  toAppQuestions(
    radarQuestionsWrapper: Record<string, QuestionDto[]> | undefined
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
            dragId: crypto.randomUUID()
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

  splitProtocolsAndQuestionnaires(questionnaires: AppQuestionnaire[]): {protocols: ProtocolDto[], questionnaires: QuestionnaireDto[]} {
    console.log('Class: QuestionnaireService, Function: splitProtocolsAndQuestionnaires, Line 319 questionnaires' , questionnaires);
    const result: {protocols: ProtocolDto[]; questionnaires: QuestionnaireDto[]} = {protocols: [], questionnaires: []};
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
        type: q.onDemand ? 'on_demand' : undefined,
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

  toRadarQuestionsWrapper(appQuestions: AppQuestion[], languages: AppQuestionnaireLanguage[]): Record<string, QuestionDto[]> {
    const result: Record<string, QuestionDto[]> = {};
    for (const language of languages) {
      result[language.code] = this.toRadarQuestions(appQuestions, language);
    }
    return result;
  }

  toRadarQuestions(appQuestions: AppQuestion[], language: AppQuestionnaireLanguage): QuestionDto[] {
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

  toRadarSubProtocol(schedule: AppQuestionnaire['schedule']):  SubProtocolDto | undefined {
    if (!schedule) return undefined;

    // if (schedule && schedule.onDemand) {
    //   return undefined;
    // }

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
}

function parseName(name: string): { base: string; lang: string } {
  const m = name.match(/^(.*)_(.+)$/);
  return m ? {base: m[1], lang: m[2]} : {base: name, lang: 'en'};
}

