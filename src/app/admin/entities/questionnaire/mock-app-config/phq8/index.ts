import { PHQ8_ARMT_DA } from "./phq8_armt_da";
import { PHQ8_ARMT_DE } from "./phq8_armt_de";
import {PHQ8_ARMT_EN} from "./phq8_armt_en";
import {PHQ8_ARMT_IT} from "./phq8_armt_it";
import {PHQ8_ARMT_ES} from "./phq8_armt_es";
import {PHQ8_ARMT_NL} from "./phq8_armt_nl";

export const phq8 = [
  {name: "phq8_def", value: {
    defaultLanguage: 'en',
    languages: ['en', 'da', 'es', 'it', 'nl'],
  }},
  {name: "phq8_en", value: PHQ8_ARMT_EN},
  {name: "phq8_da", value: PHQ8_ARMT_DA},
  {name: "phq8_de", value: PHQ8_ARMT_DE},
  {name: "phq8_it", value: PHQ8_ARMT_IT},
  {name: "phq8_es", value: PHQ8_ARMT_ES},
  {name: "phq8_nl", value: PHQ8_ARMT_NL},
];

export const app_phq8 = {
  id: "1",
  name: "phq8",
  defaultLanguage: "nl",
  languages: ['en', 'da', 'es', 'it', 'nl'],
  questions: PHQ8_ARMT_EN,
  translations: {
    en: PHQ8_ARMT_EN,
    da: PHQ8_ARMT_DA,
    de: PHQ8_ARMT_DE,
    it: PHQ8_ARMT_IT,
    es: PHQ8_ARMT_ES,
    nl: PHQ8_ARMT_NL,
  },
};
