// import { RadarQuestionnaire, RadarQuestionnaireBundle } from "@rb/models";
// import { ESM_ARMT } from './esm/esm_armt';
// import { PHQ8_ARMT } from './phq8/phq8_armt';
// import { _2MW_TEST_ARMT } from './2MW_test/2MW_test_armt';
// import { AUDIO_ARMT } from './audio/audio_armt';
// import { CNS_COVID19_FOLLOWUP_ARMT } from './cns_covid19_followup/cns_covid19_followup_armt';
// import { SAMPLE_FILED_TYPES_ARMT } from './sample-field-types/sample-field-types_armt';
// import { ESM_ARMT_EN } from "./esm/esm_armt_en";
//
// // service.getWithQuery()
// // service.getWithQuery({organization: org1})
// // service.getWithQuery({project: prj1})
// // service.getWithQuery({group: grp1})
// // service.getWithQuery({subject: sub1})
//
// // appConfig: global:
// //   questionnaire.name1.en = json
// //   questionnaire.name1.it = json
// //   questionnaire.name1.de = json
// //   questionnaire.name1.es = json
// //     ...
// //
// // organization:
// //   questionnaire.name1.en = json / defaultValue: json
// //   questionnaire.name1.it = json / defaultValue: json
// //   questionnaire.name1.de = json / defaultValue: json
// //   questionnaire.name1.es = json / defaultValue: json
// //   ...
//
// export const MOCK_QUESTIONNAIRES: RadarQuestionnaireBundle[] = [
//   ESM_ARMT,
//   PHQ8_ARMT,
//   _2MW_TEST_ARMT,
//   AUDIO_ARMT,
//   CNS_COVID19_FOLLOWUP_ARMT,
//   SAMPLE_FILED_TYPES_ARMT,
// ];
//
// export const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
//
// export const convertQ2Q = (questionnaire: any, language: string) => {
//   const questions = JSON.parse(JSON.stringify(questionnaire));
//   const res = questions.map((q: any) => {
//     const newQ = {
//       field_id: genRanHex(6),
//       field_name: q.field_name,
//       field_type: q.field_type,
//       select_choices_or_calculations: q.select_choices_or_calculations.map((o: any) => ({code: o.code}))
//     }
//     return newQ;
//   })
//   return {
//     questions: res,
//     translations: {[language]: ""}
//   };
// }
