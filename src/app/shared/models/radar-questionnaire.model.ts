export interface RadarQuestionnaireBundle {
  id: number | string;
  name: string;
  description?: string;
  dateCreated?: string;
  dateModified?: string;
  createdBy?: string;
  modifiedBy?: string;
  attributes?: Record<string, string>;
  defaultLanguage: string;
  translations: Record<string, RadarQuestionnaire>
}

export interface RadarQuestionnaire {
  id: number | string;
  name: string;
  language: string;
  description?: string;
  dateCreated?: string;
  dateModified?: string;
  createdBy?: string;
  modifiedBy?: string;
  attributes?: Record<string, string>;
  questions?: RadarQuestion[];
}

export interface RadarQuestion {
  field_name: string;
  form_name?: string;
  section_header?: string;
  field_type: string;
  field_label: string;
  select_choices_or_calculations?: {code: string; label: string;}[];
  field_annotation?:
    | string
    | {
    image: string;
    timer: {
      start: number;
      end: number;
    };
    unit: string;
  };
  text_validation_type_or_show_slider_number: string;
  range?: {
    min: string;
    max: string;
    step: string;
  };
  branching_logic?: string | any[];
  field_note?: string;
  text_validation_min?: string;
  text_validation_max?: string;
  identifier?: string;
  required_field?: boolean | string;
  custom_alignment?: string;
  question_number?: string;
  matrix_group_name?: string;
  matrix_ranking?: string;
  evaluated_logic?: string;
}

//
// export interface RadarQuestionnaire
//   extends Record<
//     string,
//     | number
//     | string
//     | boolean
//     | Record<string, RadarQuestion[]>
//     | RadarQuestion[]
//     | string[]
//     | Record<string, string>
//     | undefined
//   > {
//   id: number | string;
//   name: string;
//   language: string;
//   description?: string;
//   dateCreated?: string;
//   dateModified?: string;
//   createdBy?: string;
//   modifiedBy?: string;
//   // defaultLanguage: string;
//   // questions?: Record<string, RadarQuestion[]>;
//   questions?: RadarQuestion[];
//   attributes?: Record<string, string>;
// }
// export interface RadarQuestion extends Record<string, number | string | {code: string; label: string;}[]> {
//   field_name: string;
//   section_header?: string;
//   field_type: string;
//   field_label: string;
//   select_choices_or_calculations?: {code: string; label: string;}[];
//   field_annotation?:
//     | string
//     | {
//     image: string;
//     timer: {
//       start: number;
//       end: number;
//     };
//     unit: string;
//   };
//   text_validation_type_or_show_slider_number: string; //"date_dmy",
//   range?: {
//     min: string;
//     max: string;
//     step: string;
//   };
//   branching_logic?: string | any[];
// }

// export interface RadarARMTLanguage {
//   name: string;
//   default: boolean;
//   valid: boolean;
// }
