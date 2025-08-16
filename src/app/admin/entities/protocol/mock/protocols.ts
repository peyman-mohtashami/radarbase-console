// import { RadarConfigBundleDTO, RadarProtocolDTO } from "@rb/models";
import { STAGING_PROJECT } from './STAGING_PROJECT/protocol';
import {RadarProtocol} from '../../../../shared/models/radar-protocol.model';
// import { MOCK_GLOBAL_CONFIGS } from "../../config/mock/mock-global-configs";
// import { MOCK_PROJECT_CONFIGS } from "../../config/mock/mock-project-configs";
// import { MOCK_GLOBAL_CONFIGS } from "../../config/mock/mock-global-configs";
// import { MOCK_PROJECT_CONFIGS } from "../../config/mock/mock-project-configs";
// import { getGlobalConfiguration, getProjectConfiguration } from "../../config/mock/mock-configs";

export const MOCK_GLOBAL_PROTOCOLS: RadarProtocol[] = STAGING_PROJECT;
export const MOCK_PROJECT_PROTOCOLS: Record<string, RadarProtocol[]> = {
  radar: STAGING_PROJECT,
  'Radar-Pilot-01': STAGING_PROJECT,
};

export function getGlobalProtocols(): RadarProtocol[] {
  return JSON.parse(JSON.stringify(MOCK_GLOBAL_PROTOCOLS));
}

export function getProjectProtocols(project: string): RadarProtocol[] {
  return JSON.parse(JSON.stringify(MOCK_PROJECT_PROTOCOLS[project]));
}

export function postGlobalProtocol(entity: RadarProtocol): RadarProtocol {
  const newEntity = {...entity, id: entity.id || (MOCK_GLOBAL_PROTOCOLS.length + 1)};
  MOCK_GLOBAL_PROTOCOLS.push(newEntity);
  return newEntity;
}

// https://radar-k3s-test.thehyve.net/appconfig/api/projects/radar/config/pRMT {POST}
// {"config":[{"name":"test","value":"something"},{"name":"else","value":"changed"},{"name":"test_value_3","value":"test_value_3"}]}
// {"clientId":"pRMT","scope":"project.radar","config":[{"name":"test_value_3","value":"test_value_3"},{"name":"else","value":"changed"},{"name":"test","value":"something"}],"defaults":[{"name":"test_name_2","value":"test_value_2","scope":"global"},{"name":"test_name","value":"test_value","scope":"global"}]}
export function postProjectProtocol(project: string, payload: RadarProtocol): RadarProtocol {
  MOCK_PROJECT_PROTOCOLS[project].push(payload);
  return payload;
}

export function updateGlobalProtocol(entity: RadarProtocol): RadarProtocol {
  const objIndex = MOCK_GLOBAL_PROTOCOLS.findIndex((obj => obj.id === entity.id));
  MOCK_GLOBAL_PROTOCOLS[objIndex] = entity;
  return entity;
}

// https://radar-k3s-test.thehyve.net/appconfig/api/projects/radar/config/pRMT {POST}
// {"config":[{"name":"test","value":"something"},{"name":"else","value":"changed"},{"name":"test_value_3","value":"test_value_3"}]}
// {"clientId":"pRMT","scope":"project.radar","config":[{"name":"test_value_3","value":"test_value_3"},{"name":"else","value":"changed"},{"name":"test","value":"something"}],"defaults":[{"name":"test_name_2","value":"test_value_2","scope":"global"},{"name":"test_name","value":"test_value","scope":"global"}]}
export function updateProjectProtocol(project: string, payload: RadarProtocol): RadarProtocol {
  const objIndex = MOCK_PROJECT_PROTOCOLS[project].findIndex((obj => obj.id === payload.id));
  MOCK_PROJECT_PROTOCOLS[project][objIndex] = payload;
  return payload;
}

export function deleteGlobalProtocol(entityName: string | number): string {
  MOCK_GLOBAL_PROTOCOLS.splice(MOCK_GLOBAL_PROTOCOLS.findIndex(function(i){
    return i.id === entityName;
  }), 1);

  // const removeIndex = MOCK_GLOBAL_PROTOCOLS.map(item => item.id).indexOf("abc");
  //
  // ~removeIndex && array.splice(removeIndex, 1);
  // const newEntity = {...entity, id: entity.id || (MOCK_GLOBAL_PROTOCOLS.length + 1)};
  // MOCK_GLOBAL_PROTOCOLS.push(newEntity);
  return entityName.toString();
}

// https://radar-k3s-test.thehyve.net/appconfig/api/projects/radar/config/pRMT {POST}
// {"config":[{"name":"test","value":"something"},{"name":"else","value":"changed"},{"name":"test_value_3","value":"test_value_3"}]}
// {"clientId":"pRMT","scope":"project.radar","config":[{"name":"test_value_3","value":"test_value_3"},{"name":"else","value":"changed"},{"name":"test","value":"something"}],"defaults":[{"name":"test_name_2","value":"test_value_2","scope":"global"},{"name":"test_name","value":"test_value","scope":"global"}]}
export function deleteProjectProtocol(project: string, entityName: string | number): string {
  MOCK_PROJECT_PROTOCOLS[project].splice(MOCK_GLOBAL_PROTOCOLS.findIndex(function(i){
    return i.id === entityName;
  }), 1);

  return entityName.toString();
}


