import {AppConfig} from '../models/config';

export function getAppConfiguration(clientId: string, projectId?: string, subjectId?: string) {
  if (clientId && projectId && subjectId) return getSubjectConfiguration(clientId, projectId, subjectId);
  if (clientId && projectId) return getProjectConfiguration(clientId, projectId);
  return getGlobalConfiguration(clientId);
}

export function getGlobalConfiguration(clientId: string){
  const globalConfigs = CONFIGS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `global`,
    config: globalConfigs,
  }
}

export function getProjectConfiguration(clientId: string, projectId: string){
  const globalConfigs = CONFIGS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const defaultConfigs = globalConfigs.map(c => ({name: c.name, scope: `global`, value: c.value}));

  const projectConfigs = CONFIGS.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `project.${projectId}`,
    config: projectConfigs,
    defaults: defaultConfigs,
  }
}

export function getSubjectConfiguration(clientId: string, projectId: string, subjectId: string){
  const globalConfigs = CONFIGS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const projectConfigs = CONFIGS.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined);
  const projectDefaultConfigs = projectConfigs.map(c => ({name: c.name, scope: `project.${projectId}`, value: c.value}));
  const globalDefaultConfigs = globalConfigs.filter(c => {
    return projectDefaultConfigs.find(d => d.name === c.name) === undefined;
  }).map(c => ({name: c.name, scope: `global`, value: c.value}));
  const defaultConfigs = [...projectDefaultConfigs, ...globalDefaultConfigs];
  const subjectConfigs = CONFIGS.filter(c => c.client === clientId && c.project === projectId && c.subject === subjectId).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `user.${projectId}`,
    config: subjectConfigs,
    defaults: defaultConfigs,
  }
}

export function postAppConfiguration(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
  CONFIGS.splice(
    0,
    CONFIGS.length,
    ...CONFIGS.filter(
      c => !(c.client === clientId && c.project === projectId && c.subject === subjectId)
    )
  );
  configs.forEach(c => {
    CONFIGS.push({id: CONFIGS[CONFIGS.length-1].id + 1, name: c.name, value: c.value, client: clientId, project: projectId, subject: subjectId});
  });
  return getAppConfiguration(clientId, projectId, subjectId);
}

export const CONFIGS: MockConfig[] = [
  {id: 1, name: 'timeout', value: 'G100', client: 'ManagementPortalapp', project: undefined, subject: undefined},
  {id: 2, name: 'timeout', value: 'P200', client: 'ManagementPortalapp', project: 'radar', subject: undefined},
  {id: 3, name: 'timeout', value: 'S300', client: 'ManagementPortalapp', project: 'radar', subject: 'sub-29'},
  {id: 4, name: 'freq', value: 'G1', client: 'ManagementPortalapp', project: undefined, subject: undefined},
  {id: 5, name: 'freq', value: 'S3', client: 'ManagementPortalapp', project: undefined, subject: 'sub-29'},
  {id: 6, name: 'url', value: 'Ggoogle', client: 'ManagementPortalapp', project: undefined, subject: undefined},
]

export interface MockConfig {
  id: number; name: string; value: string; client: string; project: string | undefined; subject: string | undefined;
}
