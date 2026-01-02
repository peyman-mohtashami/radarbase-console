import {Injectable} from '@angular/core';
import {
  AppQuestion,
  AppQuestionnaire,
  ISO_LANGUAGES_MAP,
  RadarQuestion,
  RadarQuestionnaire,
} from "../models/questionnaire";
import {Observable, of} from "rxjs";
import {map, tap} from "rxjs/operators";
import {environment} from "../../../../../../environments/environment";
import {AppConfig, RadarConfigBundle} from "../../config/models/config";
import {
  getAppConfigBaseUrl,
  getConfigsFromConfigBundle,
  getHeaders,
  getUrlSegment
} from '../../config/services/config.service';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {Params} from '@angular/router';
import {getQuestionnaires, postAppQuestionnaires} from '../mock/mock-questionnaire';

@Injectable({providedIn: 'root'})
export class QuestionnaireService extends BaseEntityService<AppQuestionnaire, RadarQuestionnaire> {
  updatedList: AppQuestionnaire[] = [];

  private readonly CLIENT_ID = 'questionnaire-service';

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

    const headers = getHeaders();
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${this.CLIENT_ID}`;

    let radarConfigBundleObservable = this.http.get<RadarConfigBundle>(url, {headers});
    if (environment.localDeployment) {
      radarConfigBundleObservable = of(getQuestionnaires(this.CLIENT_ID, projectId, subjectId));
    }

    return radarConfigBundleObservable.pipe(
      map(configBundle => {
          const radarConfigs = getConfigsFromConfigBundle(configBundle);
          const groupedQuestionnaires = radarConfigs.reduce((acc: Record<string, Record<string, RadarQuestion[]>>, cur) => {
            const name = cur.name;
            const {base, lang} = parseName(name);
            acc[base] = {...acc[base], [lang]: JSON.parse(JSON.parse(cur.value))};
            return acc;
          }, {});
          const questionnaireArray: RadarQuestionnaire[] = Object.keys(groupedQuestionnaires).map(key => {
            return {
              name: key,
              languages: Object.keys(groupedQuestionnaires[key]),
              questions: groupedQuestionnaires[key]
            }
          });
          return questionnaireArray.map(q => this.radarToAppModel(q));
        }
      ),
      tap((entities) => {
        this.cache = [...entities];
        this.updatedList = [...entities];
        this.cacheLoaded = true;
        this.total.set(entities.length);
      }),
      map((entities) => queryParams ? process(entities) : entities)
    );
  }

  override getEntity(key: number | string): AppQuestionnaire {
    const entity = this.updatedList.find(item => item._name === key);
    if (!entity) throw new Error(`Entity with id ${key} not found`);
    return entity;
  }

  override add(entity: AppQuestionnaire): Observable<AppQuestionnaire> {
    return of(entity)
      .pipe(
        tap(_entity => {
          this.total.set(this.total() + 1);
          this.updatedList.push(_entity);
        })
      );
  }

  override update(update: AppQuestionnaire): Observable<AppQuestionnaire> {
    return of(update)
      .pipe(
        tap(() => {
          this.updatedList = this.updatedList.map((e) => (e._name === update._name ? update : e));
        })
      );
  }

  override delete(entity: AppQuestionnaire): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.updatedList = this.updatedList.filter((e) => e._name !== entity._name);
      })
    );
  }

  publish(questionnaires: AppQuestionnaire[], projectId?: string, subjectId?: string): Observable<AppQuestionnaire[]> {
    const headers = getHeaders();
    const appConfigBaseUrl = getAppConfigBaseUrl();
    const urlSegment = getUrlSegment(projectId, subjectId);
    const url = `${appConfigBaseUrl}/${urlSegment}/config/${this.CLIENT_ID}`;

    const radarQuestionnaires: RadarQuestionnaire[] = questionnaires.map(q => (
      {
        name: q.name,
        languages: q.languages.map(l => l.id.toString()),
        questions: this.toQuestionRadarModel(q.questions)
      }
    ));

    const configs: AppConfig[] = [];
    radarQuestionnaires.forEach(q => {
      const name = q.name;
      Object.keys(q.questions).forEach(lang => {
        configs.push({_name: '', id: '', name: `${name}_${lang}`, value: JSON.stringify(q.questions[lang])});
      })
    });

    let radarConfigBundleObservable = this.http.post<RadarConfigBundle>(url, {config: configs}, {headers});
    if (environment.localDeployment) {
      radarConfigBundleObservable = of(postAppQuestionnaires(configs, this.CLIENT_ID, projectId, subjectId));
    }
    return radarConfigBundleObservable.pipe(
      map(() => {
        return questionnaires;
      })
    );
  }

  private toQuestionAppModel(source: Record<string, RadarQuestion[]>): AppQuestion[] {
    const languages = Object.keys(source);
    const firstLang = languages[0];
    return source[firstLang].map((item) => {
      return {
        field_name: item.field_name,
        field_type: this.getFieldType(item),
        section_header: this.customReducer('section_header', source, item),
        field_label: this.customReducer('field_label', source, item),
        select_choices_or_calculations: item.select_choices_or_calculations ? item.select_choices_or_calculations?.map(c => {
          return {code: c.code, label: this.customReducer2(source, item, c)}
        }) : undefined,
        // field_note: item.field_note || undefined,
        text_validation_type_or_show_slider_number: item.text_validation_type_or_show_slider_number || undefined,
        text_validation_min: item.text_validation_min || undefined,
        text_validation_max: item.text_validation_max || undefined,
        branching_logic: item.branching_logic || undefined,
        required_field: item.required_field || undefined,
        matrix_group_name: item.field_type === 'matrix_radio' ? item.matrix_group_name || undefined : undefined,
        // matrix_ranking: item.matrix_ranking || undefined,
        field_annotation: item.field_type === 'timed' ? item.field_annotation ? {
          image: item.field_annotation.image,
          timer: {
            start: item.field_annotation.timer?.start,
            end: item.field_annotation.timer?.end,
          },
          unit: item.field_annotation.unit
        } : undefined : undefined,
        range: item.field_type === 'slider' ? item.range || undefined : undefined,
      }
    });
  }

  customReducer2(source: Record<string, RadarQuestion[]>, item: RadarQuestion, choice: {
    code: string;
    label: string;
  }): Record<string, string> {
    const languages = Object.keys(source);
    return languages.reduce((acc, lang) => {
      const matchingItem = source[lang].find(x => x.field_name === item.field_name);
      const matchingChoice: {
        code: string;
        label: string;
      } | undefined = matchingItem?.select_choices_or_calculations?.find(c => c.code === choice.code);
      acc[lang] = matchingChoice?.label || "";//matchingItem?.select_choices_or_calculations?.[key] || '';
      return acc;
    }, {} as Record<string, string>);
  }

  customReducer(key: string, source: Record<string, RadarQuestion[]>, item: RadarQuestion) {
    const languages = Object.keys(source);
    return languages.reduce((acc, lang) => {
      const matchingItem = source[lang].find(x => x.field_name === item.field_name);
      acc[lang] = (matchingItem as unknown as Record<string, string>)?.[key] || '';
      return acc;
    }, {} as Record<string, string>);
  }

  radarToAppModel(entity: RadarQuestionnaire): AppQuestionnaire {
    return {
      name: entity.name,
      languages: entity.languages.map(l => ISO_LANGUAGES_MAP[l]),
      questions: this.toQuestionAppModel(entity.questions),
      _name: entity.name,
      _search: entity.name,
    };
  }

  // appToRadarModel(entity: AppQuestionnaire): RadarQuestionnaire {
  //   return {
  //     name: entity.name,
  //     languages: entity.languages.map(l => l.id.toString()),
  //     questions: this.toQuestionRadarModel(entity.questions)
  //   };
  // }

  private toQuestionRadarModel(appQuestions: AppQuestion[]): Record<string, RadarQuestion[]> {
    const languages = Object.keys(appQuestions[0].field_label!);

    return languages.reduce((acc: Record<string, RadarQuestion[]>, lang) => {
      acc[lang] = appQuestions.map(q => ({
        field_name: q.field_name,
        field_type: q.field_type,
        section_header: q.section_header?.[lang],
        field_label: q.field_label?.[lang],
        // select_choices_or_calculations: q.select_choices_or_calculations.map(c => {
        //   return {code: c.code, label: this.customReducer2(source, item, c)}
        // }),
        // field_note: item.field_note || undefined,
        text_validation_type_or_show_slider_number: q.text_validation_type_or_show_slider_number,
        text_validation_min: q.text_validation_min,
        text_validation_max: q.text_validation_max,
        branching_logic: q.branching_logic,
        required_field: q.required_field,
        matrix_group_name: q.matrix_group_name,
        field_annotation: q.field_annotation,
        range: q.range,
      } as RadarQuestion));
      return acc;
    }, {});
  }

  private getFieldType(field: RadarQuestion): string {
    if (field.field_type === 'text') {
      const validation = field.text_validation_type_or_show_slider_number;
      if (validation?.includes('date') || validation?.includes('time') || validation?.includes('duration')) {
        return 'datetime';
      }
    }
    return field.field_type;
  }
}


function parseName(name: string): { base: string; lang: string } {
  const m = name.match(/^(.*)_(.+)$/);
  return m ? {base: m[1], lang: m[2]} : {base: name, lang: 'en'};
}
