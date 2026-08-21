import {computed, ErrorHandler, inject, Injectable, signal} from '@angular/core';
import {
  AppQuestion,
  AppQuestionnaire,
  AppQuestionnaireLanguage,
  AppQuestionnaireSchedule
} from "../models/questionnaire";
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
  readonly sort = signal<RbSort>({sortField: 'name', sortOrder: 'desc'});
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
      sortField: queryParams['sortField'] ?? 'name',
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
    console.log('Class: QuestionnaireStore, Function: add, Line 131 entity' , entity);
    this.allItems.update((value) => ([...value, entity]));
    return true;
  }

  async update(entity: AppQuestionnaire): Promise<boolean> {
    this.allItems.update((items) =>
      ([...items.map(item => item.id === entity.id ? entity : item)])
    );
    return true;
  }

  async delete(entity: AppQuestionnaire): Promise<boolean> {
    this.allItems.update((items) =>
      [...items.filter(item => item.id !== entity.id)]
    );
    return true;
  }

  async publish(): Promise<boolean>{
    const project = this.projectStore.selected() ?? undefined;
    const subject = this.subjectStore.selected() ?? undefined;

    const {protocols: ps, questionnaires: qs} = this.splitProtocolsAndQuestionnaires(this.allItems());
    const radarProtocolWrapper: ProtocolWrapperDto = {
      name: undefined,
      healthIssues: [],
      schemaVersion: undefined,
      version: undefined,
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

    console.log('Class: QuestionnaireStore, Function: publish, Line 175 protocolConfigs, questionnaireConfigs' , protocolConfigs, questionnaireConfigs);

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
    return {
      ...protocol,
      version: "",
      modelVersion: "",
      questions: this.toAppQuestions(questionnaire),
      search: protocol.name,
    }
  }

  toAppQuestions(questionnaire: Record<string, QuestionDto[]> | undefined): AppQuestion[] {
    if (!questionnaire) return [];

    const result = new Map<string, AppQuestion>();

    for (const [lang, questions] of Object.entries(questionnaire)) {
      for (const question of questions) {
        // Use id if available, otherwise field_name
        const key = question.id ?? question.field_name;

        let appQuestion = result.get(key);

        if (!appQuestion) {
          appQuestion = {
            ...question,
            field_label: {},
            section_header: undefined,//{},
            field_note: undefined,//{},
            range: question.range ? {
              ...question.range,
              labelLeft: undefined,//{},
              labelRight: undefined,//{},
            }: undefined,
            select_choices_or_calculations: question.select_choices_or_calculations?.map(choice => ({
              code: choice.code,
              label: {},//undefined,//{},
            })),
            // variables: question.variables ?? {},
          };
          result.set(key, appQuestion);
        }

        // Localized fields
        appQuestion.field_label[lang] = question.field_label;

        if (question.section_header) {
          appQuestion.section_header ??= {};
          appQuestion.section_header[lang] = question.section_header;
        }

        if (question.field_note) {
          appQuestion.field_note ??= {};
          appQuestion.field_note[lang] = question.field_note;
        }

        if (appQuestion.range && question.range) {
          if (question.range.labelLeft) {
            appQuestion.range.labelLeft ??= {};
            appQuestion.range.labelLeft[lang] = question.range.labelLeft;
          }

          if (question.range.labelRight) {
            appQuestion.range.labelRight ??= {};
            appQuestion.range.labelRight[lang] = question.range.labelRight;
          }
        }

        if (appQuestion.select_choices_or_calculations && question.select_choices_or_calculations) {
          question.select_choices_or_calculations.forEach((choice, index) => {
            appQuestion.select_choices_or_calculations![index].label[lang] = choice.label;
          });
        }
      }
    }

    return [...result.values()];
  }

  splitProtocolsAndQuestionnaires(questionnaires: AppQuestionnaire[]): {protocols: ProtocolDto[], questionnaires: QuestionnaireDto[]} {
    const result: {protocols: ProtocolDto[]; questionnaires: QuestionnaireDto[]} = {protocols: [], questionnaires: []};

    questionnaires.forEach(q => {
      const isValid = q.isGeneralTabValid && q.isCustomMessagesTabValid !== false && q.isQuestionsTabValid !== false && ((!q.onDemand && q.isNotificationsTabValid !== false && q.isSchedulingTabValid) || q.onDemand)// && protocol.isTranslationsTabValid,
      result.protocols.push({
        ...q,
        id: q.id ?? crypto.randomUUID(),
        type: q.onDemand ? 'on_demand' : undefined,
        protocol: this.toRadarSubProtocol(q.schedule),
        isValid: isValid,
        isActive: isValid ? !!q.isActive : false,

        name: q.name,
        languages: q.languages,
        defaultLanguage: q.defaultLanguage,
        onDemand: q.onDemand,
        showInCalendar: q.showInCalendar,
        estimatedCompletionTime: q.estimatedCompletionTime,
        isDemo: q.isDemo,
        order: q.order,
        title: q.title,
        description: q.description,
        showIntroduction: q.showIntroduction,
        startText: q.startText,
        endText: q.endText,
        warningEnabled: q.warningEnabled,
        warn: q.warn,
        isGeneralTabValid: q.isGeneralTabValid,
        isSchedulingTabValid: q.isSchedulingTabValid,
        isCustomMessagesTabValid: q.isCustomMessagesTabValid,
        isNotificationsTabValid: q.isNotificationsTabValid,
        isQuestionsTabValid: q.isQuestionsTabValid,
        isTranslationsTabValid: q.isTranslationsTabValid,
        variables: q.variables,
      });
      result.questionnaires.push({
        id: q.id ?? crypto.randomUUID(),
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
      return {
        ...q,
        field_label: q.field_label[language.code],
        section_header: q.section_header?.[language.code],
        select_choices_or_calculations: q.select_choices_or_calculations?.map(c => {
          return {
            code: c.code,
            label: c.label[language.code]
          }
        }),
        field_note: q.field_note?.[language.code],
        range: q.range ? {
          ...q.range,
          labelLeft: q.range?.labelLeft?.[language.code],
          labelRight: q.range?.labelRight?.[language.code]
        } : undefined,
      }
    });
  }

  toRadarSubProtocol(schedule: AppQuestionnaireSchedule | undefined):  SubProtocolDto | undefined {
    if (!schedule) return undefined;

    return {
      ...schedule,
      referenceTimestamp: schedule.relativeToReferenceTime ? {timestamp: schedule.referenceTimestamp!, format: ''} : undefined,
      repeatProtocol: schedule.repeatedProtocol ? {...schedule.repeatProtocol!} : {unit: 'year', amount: '999'},
    };
  }
}

function parseName(name: string): { base: string; lang: string } {
  const m = name.match(/^(.*)_(.+)$/);
  return m ? {base: m[1], lang: m[2]} : {base: name, lang: 'en'};
}

