import {
  RadarQuestion,
  RadarQuestionnaire,
  RadarQuestionnaireBundle
} from '../../../../shared/models/radar-questionnaire.model';
import {AppBaseModel} from '../../../../shared/models/base.model';

export type AppQuestionnaireBundle =  Pick<RadarQuestionnaireBundle, "id" | "name" | "description" | "dateCreated" |
"dateModified" | "createdBy" | "modifiedBy" | "attributes"> & AppBaseModel & {
  translations: Record<string, AppQuestionnaire>; defaultLanguage: string;
} & Record<string, any>

export type AppQuestionnaire = Pick<RadarQuestionnaire, "id" | "name" | "description" | "dateCreated" |
  "dateModified" | "createdBy" | "modifiedBy" | "attributes"> & {
  language?: string;
  questions?: AppQuestion[];
}

export type AppQuestion = Pick<RadarQuestion, "field_name" | "section_header" | "field_type" | "field_label" |
  "field_annotation" | "text_validation_type_or_show_slider_number" | "range" | "branching_logic"> &  {
  select_choices_or_calculations?: string;
}

export function toAppQuestionnaireBundle(entity: RadarQuestionnaireBundle): AppQuestionnaireBundle {
  console.log(entity);
  const translations: Record<string, AppQuestionnaire> = {}
  Object.keys(entity.translations).forEach(language => translations[language] = toAppQuestionnaire(entity.translations[language], language))
  return {
    ...entity,
    translations
  };
}

export function toAppQuestionnaire(entity: RadarQuestionnaire, language: string): AppQuestionnaire {
  console.log(entity);
  const questions = entity.questions?.map(q => toAppQuestion(q)) || [];
  return {
    ...entity,
    language,
    questions
  };
}

export function toAppQuestion(entity: RadarQuestion): AppQuestion {
  console.log(entity);
  return {
    ...entity,
    select_choices_or_calculations: entity.select_choices_or_calculations
      ?.map((c) => `${c.code}: ${c.label}`)
      .join('\n')
  };
}

export function toRadarQuestionnaireBundle(entity: AppQuestionnaireBundle): RadarQuestionnaireBundle {
  console.log(entity);
  // const translations: Record<string, AppQuestionnaire> = {}
  // Object.keys(entity.translations).forEach(k => translations[k] = toAppQuestionnaire(entity.translations[k]))
  return {
    ...entity,
    translations: {},
    defaultLanguage: 'en'
  };
}

// export function toRadarQuestionnaire(entity: AppQuestionnaire): RadarQuestionnaire {
//   console.log(entity);
//   // const questions = entity.questions?.map(q => toAppQuestion(q)) || [];
//   return {
//     ...entity,
//     questions: []
//   };
// }
// export function toRadarQuestion(entity: AppQuestion): RadarQuestion {
//   console.log(entity);
//   return {
//     ...entity,
//     select_choices_or_calculations: []
//   };
// }
//


