import {AppConfig, RadarConfig} from '../../config/models/config';
import {MockConfig} from '../../config/mock/mock-configs';
import {PHQ8} from './questionnaires/phq8/main';
import {adhd_medication_use} from './questionnaires/adhd_medication_use/main';
import {adhd_medication_side_effects} from './questionnaires/adhd_medication_side_effects/main';
import {audio} from './questionnaires/audio/main';
import {cns_covid19_baseline} from './questionnaires/cns_covid19_baseline/main';
import {sample_field_types} from './questionnaires/sample-field-types/main';

export function getQuestionnaires(clientId: string, projectId?: string, subjectId?: string) {
  if (clientId && projectId && subjectId) return getSubjectQuestionnaires(clientId, projectId, subjectId);
  if (clientId && projectId) return getProjectQuestionnaires(clientId, projectId);
  return getGlobalQuestionnaires(clientId);
}

export function getGlobalQuestionnaires(clientId: string){
  const globalConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `global`,
    config: globalConfigs,
  }
}

export function getProjectQuestionnaires(clientId: string, projectId: string){
  const globalConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const defaultConfigs = globalConfigs.map(c => ({name: c.name, scope: `global`, value: c.value}));

  const projectConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `project.${projectId}`,
    config: projectConfigs,
    defaults: defaultConfigs,
  }
}

export function getSubjectQuestionnaires(clientId: string, projectId: string, subjectId: string){
  const globalConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const projectConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined);
  const projectDefaultConfigs = projectConfigs.map(c => ({name: c.name, scope: `project.${projectId}`, value: c.value}));
  const globalDefaultConfigs = globalConfigs.filter(c => {
    return projectDefaultConfigs.find(d => d.name === c.name) === undefined;
  }).map(c => ({name: c.name, scope: `global`, value: c.value}));
  const defaultConfigs = [...projectDefaultConfigs, ...globalDefaultConfigs];
  const subjectConfigs = QUESTIONNAIRES.filter(c => c.client === clientId && c.project === projectId && c.subject === subjectId).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `user.${projectId}`,
    config: subjectConfigs,
    defaults: defaultConfigs,
  }
}

export function postAppQuestionnaires(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
  QUESTIONNAIRES.splice(
    0,
    QUESTIONNAIRES.length,
    ...QUESTIONNAIRES.filter(
      c => !(c.client === clientId && c.project === projectId && c.subject === subjectId)
    )
  );
  configs.forEach(c => {
    QUESTIONNAIRES.push({id: QUESTIONNAIRES[QUESTIONNAIRES.length-1].id + 1, name: c.name, value: c.value, client: clientId, project: projectId, subject: subjectId});
  });
  return getQuestionnaires(clientId, projectId, subjectId);
}

const globalQuestionnairesRadarConfigs: RadarConfig[] = [...PHQ8, ...adhd_medication_use, ...adhd_medication_side_effects, ...cns_covid19_baseline, ...sample_field_types];
const radarQuestionnairesRadarConfigs: RadarConfig[] = [...PHQ8, ...adhd_medication_use, ...adhd_medication_side_effects, ...cns_covid19_baseline, ...sample_field_types];
export const sub29QuestionnairesRadarConfigs = [...audio];

const globalQuestionnaires = globalQuestionnairesRadarConfigs.map((c, i) => ({id: i, name: c.name, value: c.value, client: 'questionnaire-service', project: undefined, subject: undefined}));
const radarQuestionnaires = radarQuestionnairesRadarConfigs.map((c, i) => ({id: i, name: c.name, value: c.value, client: 'questionnaire-service', project: 'radar', subject: undefined}));
const sub29Questionnaires = sub29QuestionnairesRadarConfigs.map((c, i) => ({id: i, name: c.name, value: c.value, client: 'questionnaire-service', project: 'radar', subject: 'sub-29'}));

export const QUESTIONNAIRES: MockConfig[] = [...globalQuestionnaires, ...radarQuestionnaires, ...sub29Questionnaires];
