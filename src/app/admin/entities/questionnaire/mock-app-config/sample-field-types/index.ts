import {SAMPLE_FIELD_TYPES_ARMT_EN} from "./sample-field-types_armt_en";

export const sample_field_types = [
  {name: "sample_field_types_def",  value: {
    defaultLanguage: 'en',
    languages: ['en'],
  }},
  {name: "sample_field_types_en", value: SAMPLE_FIELD_TYPES_ARMT_EN},
];


export const app_sample_field_types = {
  id: "2",
  name: "sample_field_types",
  defaultLanguage: "en",
  languages: ['en'],
  questions: SAMPLE_FIELD_TYPES_ARMT_EN,
  translations: {
    en: SAMPLE_FIELD_TYPES_ARMT_EN,
  },
};
