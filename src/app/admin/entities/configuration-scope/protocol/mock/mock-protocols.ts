import {AppConfig} from '../../config/models/config';
import {MockConfig} from '../../config/mock/mock-configs';
import {NSHD} from './protocols/NSHD/protocol';
import {DynaMORE} from './protocols/DynaMORE/protocol';
import {STAGING_PROJECT} from './protocols/STAGING_PROJECT/protocol';

export function getProtocols(clientId: string, projectId?: string, subjectId?: string) {
  if (clientId && projectId && subjectId) return getSubjectProtocols(clientId, projectId, subjectId);
  if (clientId && projectId) return getProjectProtocols(clientId, projectId);
  return getGlobalProtocols(clientId);
}

export function getGlobalProtocols(clientId: string){
  const globalConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `global`,
    config: globalConfigs,
  }
}

export function getProjectProtocols(clientId: string, projectId: string){
  const globalConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const defaultConfigs = globalConfigs.map(c => ({name: c.name, scope: `global`, value: c.value}));

  const projectConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `project.${projectId}`,
    config: projectConfigs,
    defaults: defaultConfigs,
  }
}

export function getSubjectProtocols(clientId: string, projectId: string, subjectId: string){
  const globalConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === undefined && c.subject === undefined);
  const projectConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === projectId && c.subject === undefined);
  const projectDefaultConfigs = projectConfigs.map(c => ({name: c.name, scope: `project.${projectId}`, value: c.value}));
  const globalDefaultConfigs = globalConfigs.filter(c => {
    return projectDefaultConfigs.find(d => d.name === c.name) === undefined;
  }).map(c => ({name: c.name, scope: `global`, value: c.value}));
  const defaultConfigs = [...projectDefaultConfigs, ...globalDefaultConfigs];
  const subjectConfigs = PROTOCOLS.filter(c => c.client === clientId && c.project === projectId && c.subject === subjectId).map(c => ({name: c.name, value: c.value}));
  return {
    clientId,
    scope: `user.${projectId}`,
    config: subjectConfigs,
    defaults: defaultConfigs,
  }
}

export function postAppProtocols(configs: AppConfig[], clientId: string, projectId?: string, subjectId?: string) {
  PROTOCOLS.splice(
    0,
    PROTOCOLS.length,
    ...PROTOCOLS.filter(
      c => !(c.client === clientId && c.project === projectId && c.subject === subjectId)
    )
  );
  configs.forEach(c => {
    PROTOCOLS.push({id: PROTOCOLS[PROTOCOLS.length-1].id + 1, name: c.name, value: c.value, client: clientId, project: projectId, subject: subjectId});
  });
  return getProtocols(clientId, projectId, subjectId);
}



export const globalProtocols = NSHD;
export const radarProtocols = DynaMORE;
export const sub29Protocols = STAGING_PROJECT;

export const PROTOCOLS: MockConfig[] = [
  {id: 1, name: 'main', value: JSON.stringify(globalProtocols), client: 'protocol-service', project: undefined, subject: undefined},
  {id: 2, name: 'main', value: JSON.stringify(radarProtocols), client: 'protocol-service', project: 'radar', subject: undefined},
  {id: 3, name: 'main', value: JSON.stringify(sub29Protocols), client: 'protocol-service', project: 'radar', subject: 'sub-29'},
]
