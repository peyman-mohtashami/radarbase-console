import {inject, Injectable} from '@angular/core';
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
import {AppConfig} from "../../config/models/config";
import {
  getConfigsFromConfigBundle,
} from '../../config/services/config.service';
import {BaseEntityService} from '../../../../base-entities/services/base-entity.service';
import {Params} from '@angular/router';
import {getQuestionnaires, postAppQuestionnaires} from '../mock/mock-questionnaire';
import {RadarbaseAppConfigService} from '../../../../../core/configuration/services/radarbase-app-config.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireService extends BaseEntityService<AppQuestionnaire, RadarQuestionnaire> {
  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);

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

    let radarConfigBundleObservable = this.radarbaseAppConfigService.getRadarConfigBundle(this.CLIENT_ID, projectId, subjectId);// this.http.get<RadarConfigBundle>(url, {headers});
    if (environment.localDeployment) {
      radarConfigBundleObservable = of(getQuestionnaires(this.CLIENT_ID, projectId, subjectId));
    }

    return radarConfigBundleObservable.pipe(
      map(configBundle => {
        console.log('Class: QuestionnaireService, Function: , Line 65 configBundle' , configBundle);
          const radarConfigs = getConfigsFromConfigBundle(configBundle);
          const groupedQuestionnaires = radarConfigs.reduce((acc: Record<string, Record<string, RadarQuestion[]>>, cur) => {
            const name = cur.name;
            const {base, lang} = parseName(name);
            acc[base] = {...acc[base], [lang]: JSON.parse(cur.value)};
            return acc;
          }, {});
          const questionnaireArray: RadarQuestionnaire[] = Object.keys(groupedQuestionnaires).map(key => {
            return {
              name: key,
              languages: Object.keys(groupedQuestionnaires[key]),
              questions: groupedQuestionnaires[key]
            }
          });
          console.log('Class: QuestionnaireService, Function: , Line 80 questionnaireArray' , questionnaireArray);
          return questionnaireArray.map(q => this.radarToAppModel(q));
        }
      ),
      tap((entities) => {
        console.log('Class: QuestionnaireService, Function: , Line 82 entities' , entities);
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
        // configs.push({_name: '', id: '', name: `${name}_${lang}`, value: JSON.stringify(JSON.stringify(q.questions[lang]))});
        configs.push({_name: '', id: '', name: `${name}_${lang}`, value: JSON.stringify(q.questions[lang])});
      })
    });

    let radarConfigBundleObservable = this.radarbaseAppConfigService.postConfig(configs, this.CLIENT_ID, projectId, subjectId);
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
    console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 151 source' , source);
    const languages = Object.keys(source);
    console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 153 languages' , languages);
    const firstLang = languages[0];
    console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 155 firstLang' , firstLang);
    // console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 156 source[firstLang]' , source[firstLang]);
    // console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 156 source[firstLang].toString()' , source[firstLang].toString());
    // console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 157 JSON.parse(source[firstLang].toString()' , JSON.parse(source[firstLang].toString()));
    console.log('Class: QuestionnaireService, Function: toQuestionAppModel, Line 159 source[firstLang]' , source[firstLang]);
    // return (JSON.parse(source[firstLang].toString()) as RadarQuestion[]).map((item) => {
    return (source[firstLang] as RadarQuestion[]).map((item) => {
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
      // const matchingItem = (JSON.parse(source[lang].toString()) as RadarQuestion[]).find(x => x.field_name === item.field_name);
      const matchingItem = (source[lang] as RadarQuestion[]).find(x => x.field_name === item.field_name);
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
      // const matchingItem = (JSON.parse(source[lang].toString()) as RadarQuestion[]).find(x => x.field_name === item.field_name);
      const matchingItem = (source[lang] as RadarQuestion[]).find(x => x.field_name === item.field_name);
      acc[lang] = (matchingItem as unknown as Record<string, string>)?.[key] || '';
      return acc;
    }, {} as Record<string, string>);
  }

  radarToAppModel(entity: RadarQuestionnaire): AppQuestionnaire {
    console.log('Class: QuestionnaireService, Function: radarToAppModel, Line 209 entity' , entity);
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

const v = "\"[{\\\"field_name\\\":\\\"test_1\\\",\\\"field_type\\\":\\\"radio\\\",\\\"field_label\\\":\\\"Test 1\\\",\\\"branching_logic\\\":\\\"\\\"},{\\\"field_name\\\":\\\"test_2\\\",\\\"field_type\\\":\\\"text\\\",\\\"field_label\\\":\\\"Test 2\\\",\\\"text_validation_min\\\":\\\"\\\",\\\"text_validation_max\\\":\\\"\\\",\\\"branching_logic\\\":\\\"\\\"}]\""


const t1 = {
  "clientId": "questionnaire-service",
  "scope": "global",
  "config": [
    {
      "name": "phq8_en",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"Over the past two weeks, how often have you been bothered by any of the following problems \",\"field_type\":\"radio\",\"field_label\":\"1. Little interest or pleasure in doing things?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Feeling down, depressed, or hopeless?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"[phq8_1] = 1\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Trouble falling asleep or staying asleep, or sleeping too much?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"[phq8_1] = 1 and [phq8_2] = 3\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Feeling tired or having little energy?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Poor appetite or over eating\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Feeling bad about yourself, or that you are a failure or have let yourself or your family down?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Trouble concentrating on things such as reading the newspaper or watching television?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Moving or speaking so slowly that other people have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Not at all \"},{\"code\":\"1\",\"label\":\"Several days \"},{\"code\":\"2\",\"label\":\"More than half the days \"},{\"code\":\"3\",\"label\":\"Nearly every day\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    },
    {
      "name": "phq8_it",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"Nelle ultime due settimane, quanto spesso sei stato disturbato da uno dei seguenti problemi\",\"field_type\":\"radio\",\"field_label\":\"1. Scarso interesse o piacere nel fare le cose.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Sentirsi giù, triste o disperato/a.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Problemi ad addormentarsi o a dormire tutta la notte senza svegliarsi, o a dormire troppo.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Sentirsi stanco/a o avere poca energia. \",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Scarso appetito o mangiare troppo.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Avere una scarsa opinione di sé, o sentirsi un/una fallito/a o aver deluso se stesso/a o i propri familiari.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Difficoltà a concentrarsi su qualcosa, per esempio leggere il giornale o guardare la televisione.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Muoversi o parlare così lentamente da poter essere notato/a da altre persone. O, al contrario, essere così irrequieto/a da muoversi molto più del solito.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Mai \"},{\"code\":\"1\",\"label\":\"Alcuni giorni \"},{\"code\":\"2\",\"label\":\"Per più della metà dei giorni \"},{\"code\":\"3\",\"label\":\"Quasi tutti i giorni\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    },
    {
      "name": "phq8_de",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"Wie oft fühlten Sie sich im Verlauf der letzten zwei Wochen durch die folgenden Beschwerden beeinträchtigt?\",\"field_type\":\"radio\",\"field_label\":\"1. Wenig Interesse oder Freude an Ihren Tätigkeiten\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Niedergeschlagenheit, Schwermut oder Hoffnungslosigkeit\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Schwierigkeiten ein- oder durchzuschlafen oder vermehrter Schlaf\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Müdigkeit oder Gefühl, keine Energie zu haben\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Verminderter Appetit oder übermäßiges Bedürfnis zu essen\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Schlechte Meinung von sich selbst; Gefühl ein Versager zu sein oder die Familie enttäuscht zu haben\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Schwierigkeiten, sich auf etwas zu konzentrieren, z.B. beim Zeitungslesen oder Fernsehen\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Waren Ihre Bewegungen oder Ihre Sprache so verlangsamt, dass es auch anderen auffallen würde? Oder waren Sie im Gegenteil \\\"zappelig\\\" oder ruhelos und hatten dadurch einen stärkeren Bewegungsdrang als sonst?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Überhaupt nicht\"},{\"code\":\"1\",\"label\":\"An einzelnen Tagen\"},{\"code\":\"2\",\"label\":\"An mehr als der Hälfte der Tage\"},{\"code\":\"3\",\"label\":\"Beinahe jeden Tag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    },
    {
      "name": "phq8_es",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"¿Con qué frecuencia, en las últimas dos semanas, ha tenido cualquiera de los siguientes problemas?\",\"field_type\":\"radio\",\"field_label\":\"1. Tener poco interés o disfrutar poco haciendo cosas\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Sentirse desanimado/a, deprimido/a o sin esperanza\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Tener problemas para dormir (coger el sueño o mantenerlo), o tener más sueño de la cuenta\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Sentirse cansado/a o con poca energía\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Tener poco apetito o comer demasiado\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Sentirse mal consigo mismo/a o sentirse fracasado/a o decepcionado/a de sí mismo/a, o pensar que ha decepcionado a los que le rodean\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Tener problemas para concentrarse, como por ejemplo para leer el periódico o ver la televisión\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Moverse o hablar tan lentamente que los demás lo han notado. O bien lo contrario, estar tan inquieto/a e intranquilo/a que ha estado moviéndose de arriba para abajo mucho más de lo habitual\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Nunca \"},{\"code\":\"1\",\"label\":\"Unos cuantos días \"},{\"code\":\"2\",\"label\":\"Más de la mitad de los días \"},{\"code\":\"3\",\"label\":\"Todos o casi todos los días\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    },
    {
      "name": "phq8_nl",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"Hoe vaak hebt u in de afgelopen 2 weken last gehad van één of meer van de volgende problemen?\",\"field_type\":\"radio\",\"field_label\":\"1. Weinig interesse of plezier in activiteiten\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Zich neerslachtig, depressief of hopeloos voelen\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Moeilijk inslapen, moeilijk doorslapen of te veel slapen\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Zich moe voelen of gebrek aan energie hebben\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Weinig eetlust of overmatig eten\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Een slecht gevoel hebben over uzelf - of het gevoel hebben dat u een mislukkeling bent of het gevoel dat u zichzelf of uw familie teleurgesteld hebt.\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Problemen om u te concentreren, bijvoorbeeld om de krant te lezen of om tv te kijken\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Zo traag bewegen of zo langzaam spreken dat andere mensen dit opgemerkt kunnen hebben? Of het tegenovergestelde, zo zenuwachtig of rusteloos zijn dat u veel meer bewoog dan gebruikelijk\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Helemaal niet \"},{\"code\":\"1\",\"label\":\"Verscheidene dagen \"},{\"code\":\"2\",\"label\":\"Meer dan de helft van de dagen \"},{\"code\":\"3\",\"label\":\"Bijna elke dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    },
    {
      "name": "phq8_da",
      "value": "[{\"field_name\":\"phq8_1\",\"form_name\":\"phq8\",\"section_header\":\"Inden for de seneste 2 uger, hvor ofte har du været generet af følgende problemer?\",\"field_type\":\"radio\",\"field_label\":\"1. Lille interesse i eller glæde ved at gøre ting?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_2\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"2. Følt dig nedtrykt, håbløs eller været deprimeret?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_3\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"3. Problemer med at falde i søvn eller sove, eller med at sove for meget?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_4\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"4. Følt dig træt eller har kun haft lidt energi?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_5\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"5. Ringe appetit eller spist for meget\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_6\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"6. Haft det dårligt med dig selv - eller følt, at du er en fiasko eller har skuffet dig selv eller din familie?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_7\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"7. Problemer med at koncentrere dig om ting, såsom at læse avisen eller se TV?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"},{\"field_name\":\"phq8_8\",\"form_name\":\"phq8\",\"section_header\":\"\",\"field_type\":\"radio\",\"field_label\":\"8. Har bevæget dig eller talt så langsomt, at andre kunne have bemærket det? Eller det modsatte - været så rastløs eller hvileløs, at du har bevæget dig mere omkring end sædvanligt?\",\"select_choices_or_calculations\":[{\"code\":\"0\",\"label\":\"Slet ikke \"},{\"code\":\"1\",\"label\":\"Flere dage \"},{\"code\":\"2\",\"label\":\"Mere end halvdelen af dagene \"},{\"code\":\"3\",\"label\":\"Næsten hver dag\"}],\"field_note\":\"\",\"text_validation_type_or_show_slider_number\":\"\",\"text_validation_min\":\"\",\"text_validation_max\":\"\",\"identifier\":\"\",\"branching_logic\":\"\",\"required_field\":\"\",\"custom_alignment\":\"\",\"question_number\":\"\",\"matrix_group_name\":\"phq8\",\"matrix_ranking\":\"\",\"field_annotation\":\"\",\"evaluated_logic\":\"\"}]"
    }
  ]
};

const j1 = [
  {
    "name": "phq8",
    "languages": [
      {
        "id": "en",
        "_name": "English",
        "nativeName": "English"
      },
      {
        "id": "it",
        "_name": "Italian",
        "nativeName": "Italiano"
      },
      {
        "id": "de",
        "_name": "German",
        "nativeName": "Deutsch"
      },
      {
        "id": "es",
        "_name": "Spanish; Castilian",
        "nativeName": "español, castellano"
      },
      {
        "id": "nl",
        "_name": "Dutch",
        "nativeName": "Nederlands, Vlaams"
      },
      {
        "id": "da",
        "_name": "Danish",
        "nativeName": "dansk"
      }
    ],
    "questions": [
      {
        "field_name": "phq8_1",
        "field_type": "radio",
        "section_header": {
          "en": "Over the past two weeks, how often have you been bothered by any of the following problems ",
          "it": "Nelle ultime due settimane, quanto spesso sei stato disturbato da uno dei seguenti problemi",
          "de": "Wie oft fühlten Sie sich im Verlauf der letzten zwei Wochen durch die folgenden Beschwerden beeinträchtigt?",
          "es": "¿Con qué frecuencia, en las últimas dos semanas, ha tenido cualquiera de los siguientes problemas?",
          "nl": "Hoe vaak hebt u in de afgelopen 2 weken last gehad van één of meer van de volgende problemen?",
          "da": "Inden for de seneste 2 uger, hvor ofte har du været generet af følgende problemer?"
        },
        "field_label": {
          "en": "1. Little interest or pleasure in doing things?",
          "it": "1. Scarso interesse o piacere nel fare le cose.",
          "de": "1. Wenig Interesse oder Freude an Ihren Tätigkeiten",
          "es": "1. Tener poco interés o disfrutar poco haciendo cosas",
          "nl": "1. Weinig interesse of plezier in activiteiten",
          "da": "1. Lille interesse i eller glæde ved at gøre ting?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      },
      {
        "field_name": "phq8_2",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "2. Feeling down, depressed, or hopeless?",
          "it": "2. Sentirsi giù, triste o disperato/a.",
          "de": "2. Niedergeschlagenheit, Schwermut oder Hoffnungslosigkeit",
          "es": "2. Sentirse desanimado/a, deprimido/a o sin esperanza",
          "nl": "2. Zich neerslachtig, depressief of hopeloos voelen",
          "da": "2. Følt dig nedtrykt, håbløs eller været deprimeret?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ],
        "branching_logic": "[phq8_1] = 1"
      },
      {
        "field_name": "phq8_3",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "3. Trouble falling asleep or staying asleep, or sleeping too much?",
          "it": "3. Problemi ad addormentarsi o a dormire tutta la notte senza svegliarsi, o a dormire troppo.",
          "de": "3. Schwierigkeiten ein- oder durchzuschlafen oder vermehrter Schlaf",
          "es": "3. Tener problemas para dormir (coger el sueño o mantenerlo), o tener más sueño de la cuenta",
          "nl": "3. Moeilijk inslapen, moeilijk doorslapen of te veel slapen",
          "da": "3. Problemer med at falde i søvn eller sove, eller med at sove for meget?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ],
        "branching_logic": "[phq8_1] = 1 and [phq8_2] = 3"
      },
      {
        "field_name": "phq8_4",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "4. Feeling tired or having little energy?",
          "it": "4. Sentirsi stanco/a o avere poca energia. ",
          "de": "4. Müdigkeit oder Gefühl, keine Energie zu haben",
          "es": "4. Sentirse cansado/a o con poca energía",
          "nl": "4. Zich moe voelen of gebrek aan energie hebben",
          "da": "4. Følt dig træt eller har kun haft lidt energi?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      },
      {
        "field_name": "phq8_5",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "5. Poor appetite or over eating",
          "it": "5. Scarso appetito o mangiare troppo.",
          "de": "5. Verminderter Appetit oder übermäßiges Bedürfnis zu essen",
          "es": "5. Tener poco apetito o comer demasiado",
          "nl": "5. Weinig eetlust of overmatig eten",
          "da": "5. Ringe appetit eller spist for meget"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      },
      {
        "field_name": "phq8_6",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "6. Feeling bad about yourself, or that you are a failure or have let yourself or your family down?",
          "it": "6. Avere una scarsa opinione di sé, o sentirsi un/una fallito/a o aver deluso se stesso/a o i propri familiari.",
          "de": "6. Schlechte Meinung von sich selbst; Gefühl ein Versager zu sein oder die Familie enttäuscht zu haben",
          "es": "6. Sentirse mal consigo mismo/a o sentirse fracasado/a o decepcionado/a de sí mismo/a, o pensar que ha decepcionado a los que le rodean",
          "nl": "6. Een slecht gevoel hebben over uzelf - of het gevoel hebben dat u een mislukkeling bent of het gevoel dat u zichzelf of uw familie teleurgesteld hebt.",
          "da": "6. Haft det dårligt med dig selv - eller følt, at du er en fiasko eller har skuffet dig selv eller din familie?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      },
      {
        "field_name": "phq8_7",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "7. Trouble concentrating on things such as reading the newspaper or watching television?",
          "it": "7. Difficoltà a concentrarsi su qualcosa, per esempio leggere il giornale o guardare la televisione.",
          "de": "7. Schwierigkeiten, sich auf etwas zu konzentrieren, z.B. beim Zeitungslesen oder Fernsehen",
          "es": "7. Tener problemas para concentrarse, como por ejemplo para leer el periódico o ver la televisión",
          "nl": "7. Problemen om u te concentreren, bijvoorbeeld om de krant te lezen of om tv te kijken",
          "da": "7. Problemer med at koncentrere dig om ting, såsom at læse avisen eller se TV?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      },
      {
        "field_name": "phq8_8",
        "field_type": "radio",
        "section_header": {
          "en": "",
          "it": "",
          "de": "",
          "es": "",
          "nl": "",
          "da": ""
        },
        "field_label": {
          "en": "8. Moving or speaking so slowly that other people have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
          "it": "8. Muoversi o parlare così lentamente da poter essere notato/a da altre persone. O, al contrario, essere così irrequieto/a da muoversi molto più del solito.",
          "de": "8. Waren Ihre Bewegungen oder Ihre Sprache so verlangsamt, dass es auch anderen auffallen würde? Oder waren Sie im Gegenteil \"zappelig\" oder ruhelos und hatten dadurch einen stärkeren Bewegungsdrang als sonst?",
          "es": "8. Moverse o hablar tan lentamente que los demás lo han notado. O bien lo contrario, estar tan inquieto/a e intranquilo/a que ha estado moviéndose de arriba para abajo mucho más de lo habitual",
          "nl": "8. Zo traag bewegen of zo langzaam spreken dat andere mensen dit opgemerkt kunnen hebben? Of het tegenovergestelde, zo zenuwachtig of rusteloos zijn dat u veel meer bewoog dan gebruikelijk",
          "da": "8. Har bevæget dig eller talt så langsomt, at andre kunne have bemærket det? Eller det modsatte - været så rastløs eller hvileløs, at du har bevæget dig mere omkring end sædvanligt?"
        },
        "select_choices_or_calculations": [
          {
            "code": "0",
            "label": {
              "en": "Not at all ",
              "it": "Mai ",
              "de": "Überhaupt nicht",
              "es": "Nunca ",
              "nl": "Helemaal niet ",
              "da": "Slet ikke "
            }
          },
          {
            "code": "1",
            "label": {
              "en": "Several days ",
              "it": "Alcuni giorni ",
              "de": "An einzelnen Tagen",
              "es": "Unos cuantos días ",
              "nl": "Verscheidene dagen ",
              "da": "Flere dage "
            }
          },
          {
            "code": "2",
            "label": {
              "en": "More than half the days ",
              "it": "Per più della metà dei giorni ",
              "de": "An mehr als der Hälfte der Tage",
              "es": "Más de la mitad de los días ",
              "nl": "Meer dan de helft van de dagen ",
              "da": "Mere end halvdelen af dagene "
            }
          },
          {
            "code": "3",
            "label": {
              "en": "Nearly every day",
              "it": "Quasi tutti i giorni",
              "de": "Beinahe jeden Tag",
              "es": "Todos o casi todos los días",
              "nl": "Bijna elke dag",
              "da": "Næsten hver dag"
            }
          }
        ]
      }
    ],
    "_name": "phq8",
    "_search": "phq8"
  }
];
