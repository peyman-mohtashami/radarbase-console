import { MOCK_GLOBAL_CONFIGS } from './mock-global-configs';
import { MOCK_PROJECT_CONFIGS } from './mock-project-configs';
import {AppConfig} from "../models/config";
import {RadarConfigBundle} from '../../../../shared/models/radar-config.model';
// import { RadarConfigBundleDTO, RadarConfigDTO } from "@rb/models";

export function getGlobalConfiguration(clientId: string): RadarConfigBundle {
  console.log('Class: getGlobalConfiguration, Function: getGlobalConfiguration, Line 8 ' , );
  return JSON.parse(JSON.stringify(
    MOCK_GLOBAL_CONFIGS[clientId] || {
      clientId: clientId,
      scope: 'global',
      config: [],
    }
  ));
}

export function getProjectConfiguration(clientId: string, project: string): RadarConfigBundle {
  console.log(project, clientId);
  return JSON.parse(JSON.stringify(
    MOCK_PROJECT_CONFIGS[project][clientId] || {
      clientId: clientId,
      scope: `project.${project}`,
      config: [],
    }
  ));
}

// https://radar-k3s-test.thehyve.net/appconfig/api/global/config/pRMT {POST}
// {"config":[{"name":"test_name","value":"test_value"},{"name":"test_name_2","value":"test_value_2"}]}
// {"clientId":"pRMT","scope":"global","config":[{"name":"test_name_2","value":"test_value_2"},{"name":"test_name","value":"test_value"}]}
export function postGlobalConfiguration(clientId: string, payload: AppConfig[]): RadarConfigBundle {
  MOCK_GLOBAL_CONFIGS[clientId].config = payload;
  return getGlobalConfiguration(clientId);
}

// https://radar-k3s-test.thehyve.net/appconfig/api/projects/radar/config/pRMT {POST}
// {"config":[{"name":"test","value":"something"},{"name":"else","value":"changed"},{"name":"test_value_3","value":"test_value_3"}]}
// {"clientId":"pRMT","scope":"project.radar","config":[{"name":"test_value_3","value":"test_value_3"},{"name":"else","value":"changed"},{"name":"test","value":"something"}],"defaults":[{"name":"test_name_2","value":"test_value_2","scope":"global"},{"name":"test_name","value":"test_value","scope":"global"}]}
export function postProjectConfiguration(clientId: string, project: string, payload: AppConfig[]): RadarConfigBundle {
  MOCK_PROJECT_CONFIGS[project][clientId].config = payload;
  return getProjectConfiguration(clientId, project);
}

/*
Publish configuration

You are going to publish new configurations. Are you sure?

  All configuration will be overwritten permanently. This operation cannot be undone.

 */
/*
const clients = '/api/ceilnst';
const global = '/api/global/config/{ appconfig_frontend }';
const project = '/api/projects/{ radar }/config/{ appconfig_frontend }';
const subject =
  '/api/projects/{test_demo}/users/{d7e7199b-8f30-460a-95ef-e49e0456271b}/config/{pRMT}';
//
const publishGlobal = '/api/global/config/pRMT Request Method: POST';
const payload1 = {
  config: [
    { name: 'empatica_api_key', value: 'bb789f33e5254682a6280e1ff89acabd' },
    { name: 'measurements.FW.title', value: 'Free walking Number 002' },
    { name: 'measurements.FW.order', value: '1' },
    { name: 'measurements.FW.enabled', value: 'true' },
    { name: 'measurements.FW.sensor_locations.0', value: 'LFT,RFT' },
    {
      name: 'measurements.FW.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    { name: 'measurements.10MWT.title', value: '10m walk' },
    { name: 'measurements.10MWT.order', value: '2' },
    { name: 'measurements.10MWT.enabled', value: 'true' },
    { name: 'measurements.10MWT.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.FM.title', value: 'Free Measurement' },
    { name: 'measurements.FM.order', value: '3' },
    { name: 'measurements.FM.enabled', value: 'true' },
    { name: 'measurements.FM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FM.sensor_locations.1', value: 'Any,Any' },
    { name: 'measurements.FM.sensor_locations.2', value: 'Any,Any,Any' },
    { name: 'measurements.FM.sensor_locations.3', value: 'Any,Any,Any,Any' },
    { name: 'measurements.AR.title', value: 'ARAT' },
    { name: 'measurements.AR.order', value: '4' },
    { name: 'measurements.AR.enabled', value: 'true' },
    { name: 'measurements.AR.sensor_locations.0', value: 'CHE,LWT,RWT' },
    { name: 'measurements.JP.title', value: 'Jumping' },
    { name: 'measurements.JP.order', value: '5' },
    { name: 'measurements.JP.enabled', value: 'true' },
    { name: 'measurements.JP.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.JP.sensor_locations.1', value: 'Any' },
    { name: 'measurements.STR.title', value: 'Stairs' },
    { name: 'measurements.STR.order', value: '6' },
    { name: 'measurements.STR.enabled', value: 'true' },
    { name: 'measurements.STR.sensor_locations.0', value: 'Any' },
    { name: 'measurements.TUG.title', value: 'Time Up-and-Go' },
    { name: 'measurements.TUG.order', value: '7' },
    { name: 'measurements.TUG.enabled', value: 'true' },
    { name: 'measurements.TUG.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FLM.title', value: 'Fugl-Meyer' },
    { name: 'measurements.FLM.order', value: '8' },
    { name: 'measurements.FLM.enabled', value: 'true' },
    { name: 'measurements.FLM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.SLP.title', value: 'Sleep' },
    { name: 'measurements.SLP.order', value: '9' },
    { name: 'measurements.SLP.enabled', value: 'true' },
    { name: 'measurements.SLP.sensor_locations.0', value: 'Any' },
    {
      name: 'measurements.SLP.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    {
      name: 'feedbackConfig',
      value:
        '[{         label: "Quality of Measurement",         type: "select",         options: ["Good","More or less","Poor"]     },     {         label: "Walking Aids",         type: "select",         options: ["None – No Walking Aids",         "LWS – Left Walking Stick",         "RWS – Right Walking Stick",         "TWS – Two Walking Sticks",         "WKR – Walker",         "BWS – Body Weight Support",         "HH – Human Help"]     },     {         label: "Ankle Foot Orthoses",         type: "select",         options: ["None – No AFOs",         "LP – Left Passive",         "RP – Right Passive",         "LPRP – Left and Right Passive",         "LA – Left Active",         "RA – Right Active",         "LARA – Left and Right Active",         "LARP – Left Active, Right Passive",         "LPRA – Left Passive, Right Active"]     },     {         label: "Fatigue",         type: "slider",         step: 1,         valueFrom: 0,         valueTo: 10     },     {         label: "Pain",         type: "select",         options: ["0 - Nothing at all", "0.3", "0.5 - Extremely weak", "0.7", "1 - Very weak",         "1.5", "2 - Weak", "2.5", "3 - Moderate", "4", "5 - Strong", "6", "7 - Very strong",         "8", "9", "10 - Extremely strong", "11", "12 - Absolute maximum"]     },     {         label: "Note",         type: "text_input"     }  ]',
    },
  ],
};
const resp = {
  clientId: 'pRMT',
  scope: 'global',
  config: [
    { name: 'empatica_api_key', value: 'bb789f33e5254682a6280e1ff89acabd' },
    { name: 'measurements.FW.title', value: 'Free walking Number 001' },
    { name: 'measurements.FW.order', value: '1' },
    { name: 'measurements.FW.enabled', value: 'true' },
    { name: 'measurements.FW.sensor_locations.0', value: 'LFT,RFT' },
    {
      name: 'measurements.FW.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    { name: 'measurements.10MWT.title', value: '10m walk' },
    { name: 'measurements.10MWT.order', value: '2' },
    { name: 'measurements.10MWT.enabled', value: 'true' },
    { name: 'measurements.10MWT.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.FM.title', value: 'Free Measurement' },
    { name: 'measurements.FM.order', value: '3' },
    { name: 'measurements.FM.enabled', value: 'true' },
    { name: 'measurements.FM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FM.sensor_locations.1', value: 'Any,Any' },
    { name: 'measurements.FM.sensor_locations.2', value: 'Any,Any,Any' },
    { name: 'measurements.FM.sensor_locations.3', value: 'Any,Any,Any,Any' },
    { name: 'measurements.AR.title', value: 'ARAT' },
    { name: 'measurements.AR.order', value: '4' },
    { name: 'measurements.AR.enabled', value: 'true' },
    { name: 'measurements.AR.sensor_locations.0', value: 'CHE,LWT,RWT' },
    { name: 'measurements.JP.title', value: 'Jumping' },
    { name: 'measurements.JP.order', value: '5' },
    { name: 'measurements.JP.enabled', value: 'true' },
    { name: 'measurements.JP.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.JP.sensor_locations.1', value: 'Any' },
    { name: 'measurements.STR.title', value: 'Stairs' },
    { name: 'measurements.STR.order', value: '6' },
    { name: 'measurements.STR.enabled', value: 'true' },
    { name: 'measurements.STR.sensor_locations.0', value: 'Any' },
    { name: 'measurements.TUG.title', value: 'Time Up-and-Go' },
    { name: 'measurements.TUG.order', value: '7' },
    { name: 'measurements.TUG.enabled', value: 'true' },
    { name: 'measurements.TUG.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FLM.title', value: 'Fugl-Meyer' },
    { name: 'measurements.FLM.order', value: '8' },
    { name: 'measurements.FLM.enabled', value: 'true' },
    { name: 'measurements.FLM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.SLP.title', value: 'Sleep' },
    { name: 'measurements.SLP.order', value: '9' },
    { name: 'measurements.SLP.enabled', value: 'true' },
    { name: 'measurements.SLP.sensor_locations.0', value: 'Any' },
    {
      name: 'measurements.SLP.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    {
      name: 'feedbackConfig',
      value:
        '[{         label: "Quality of Measurement",         type: "select",         options: ["Good","More or less","Poor"]     },     {         label: "Walking Aids",         type: "select",         options: ["None – No Walking Aids",         "LWS – Left Walking Stick",         "RWS – Right Walking Stick",         "TWS – Two Walking Sticks",         "WKR – Walker",         "BWS – Body Weight Support",         "HH – Human Help"]     },     {         label: "Ankle Foot Orthoses",         type: "select",         options: ["None – No AFOs",         "LP – Left Passive",         "RP – Right Passive",         "LPRP – Left and Right Passive",         "LA – Left Active",         "RA – Right Active",         "LARA – Left and Right Active",         "LARP – Left Active, Right Passive",         "LPRA – Left Passive, Right Active"]     },     {         label: "Fatigue",         type: "slider",         step: 1,         valueFrom: 0,         valueTo: 10     },     {         label: "Pain",         type: "select",         options: ["0 - Nothing at all", "0.3", "0.5 - Extremely weak", "0.7", "1 - Very weak",         "1.5", "2 - Weak", "2.5", "3 - Moderate", "4", "5 - Strong", "6", "7 - Very strong",         "8", "9", "10 - Extremely strong", "11", "12 - Absolute maximum"]     },     {         label: "Note",         type: "text_input"     }  ]',
    },
  ],
};
//

const test = {
  clientId: 'pRMT',
  scope: 'global',
  config: [
    { name: 'empatica_api_key', value: 'bb789f33e5254682a6280e1ff89acabd' },
    { name: 'measurements.FW.title', value: 'Free walking Number 001' },
    { name: 'measurements.FW.order', value: '1' },
    { name: 'measurements.FW.enabled', value: 'true' },
    { name: 'measurements.FW.sensor_locations.0', value: 'LFT,RFT' },
    {
      name: 'measurements.FW.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    { name: 'measurements.10MWT.title', value: '10m walk' },
    { name: 'measurements.10MWT.order', value: '2' },
    { name: 'measurements.10MWT.enabled', value: 'true' },
    { name: 'measurements.10MWT.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.FM.title', value: 'Free Measurement' },
    { name: 'measurements.FM.order', value: '3' },
    { name: 'measurements.FM.enabled', value: 'true' },
    { name: 'measurements.FM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FM.sensor_locations.1', value: 'Any,Any' },
    { name: 'measurements.FM.sensor_locations.2', value: 'Any,Any,Any' },
    { name: 'measurements.FM.sensor_locations.3', value: 'Any,Any,Any,Any' },
    { name: 'measurements.AR.title', value: 'ARAT' },
    { name: 'measurements.AR.order', value: '4' },
    { name: 'measurements.AR.enabled', value: 'true' },
    { name: 'measurements.AR.sensor_locations.0', value: 'CHE,LWT,RWT' },
    { name: 'measurements.JP.title', value: 'Jumping' },
    { name: 'measurements.JP.order', value: '5' },
    { name: 'measurements.JP.enabled', value: 'true' },
    { name: 'measurements.JP.sensor_locations.0', value: 'LFT,RFT' },
    { name: 'measurements.JP.sensor_locations.1', value: 'Any' },
    { name: 'measurements.STR.title', value: 'Stairs' },
    { name: 'measurements.STR.order', value: '6' },
    { name: 'measurements.STR.enabled', value: 'true' },
    { name: 'measurements.STR.sensor_locations.0', value: 'Any' },
    { name: 'measurements.TUG.title', value: 'Time Up-and-Go' },
    { name: 'measurements.TUG.order', value: '7' },
    { name: 'measurements.TUG.enabled', value: 'true' },
    { name: 'measurements.TUG.sensor_locations.0', value: 'Any' },
    { name: 'measurements.FLM.title', value: 'Fugl-Meyer' },
    { name: 'measurements.FLM.order', value: '8' },
    { name: 'measurements.FLM.enabled', value: 'true' },
    { name: 'measurements.FLM.sensor_locations.0', value: 'Any' },
    { name: 'measurements.SLP.title', value: 'Sleep' },
    { name: 'measurements.SLP.order', value: '9' },
    { name: 'measurements.SLP.enabled', value: 'true' },
    { name: 'measurements.SLP.sensor_locations.0', value: 'Any' },
    {
      name: 'measurements.SLP.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
    },
    {
      name: 'feedbackConfig',
      value:
        '[{         label: "Quality of Measurement",         type: "select",         options: ["Good","More or less","Poor"]     },     {         label: "Walking Aids",         type: "select",         options: ["None – No Walking Aids",         "LWS – Left Walking Stick",         "RWS – Right Walking Stick",         "TWS – Two Walking Sticks",         "WKR – Walker",         "BWS – Body Weight Support",         "HH – Human Help"]     },     {         label: "Ankle Foot Orthoses",         type: "select",         options: ["None – No AFOs",         "LP – Left Passive",         "RP – Right Passive",         "LPRP – Left and Right Passive",         "LA – Left Active",         "RA – Right Active",         "LARA – Left and Right Active",         "LARP – Left Active, Right Passive",         "LPRA – Left Passive, Right Active"]     },     {         label: "Fatigue",         type: "slider",         step: 1,         valueFrom: 0,         valueTo: 10     },     {         label: "Pain",         type: "select",         options: ["0 - Nothing at all", "0.3", "0.5 - Extremely weak", "0.7", "1 - Very weak",         "1.5", "2 - Weak", "2.5", "3 - Moderate", "4", "5 - Strong", "6", "7 - Very strong",         "8", "9", "10 - Extremely strong", "11", "12 - Absolute maximum"]     },     {         label: "Note",         type: "text_input"     }  ]',
    },
  ],
};

const test1 = {
  clientId: 'pRMT',
  scope: 'project.test_demo',
  config: [
    { name: 'measurements.FW.title', value: 'Free walking Number 10' },
    { name: 'measurements.FW.sensor_locations.0', value: 'LFT' },
  ],
  defaults: [
    {
      name: 'empatica_api_key',
      value: 'bb789f33e5254682a6280e1ff89acabd',
      scope: 'global',
    },
    {
      name: 'measurements.FW.title',
      value: 'Free walking Number 001',
      scope: 'global',
    },
    { name: 'measurements.FW.order', value: '1', scope: 'global' },
    { name: 'measurements.FW.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.FW.sensor_locations.0',
      value: 'LFT,RFT',
      scope: 'global',
    },
    {
      name: 'measurements.FW.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
      scope: 'global',
    },
    { name: 'measurements.10MWT.title', value: '10m walk', scope: 'global' },
    { name: 'measurements.10MWT.order', value: '2', scope: 'global' },
    { name: 'measurements.10MWT.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.10MWT.sensor_locations.0',
      value: 'LFT,RFT',
      scope: 'global',
    },
    {
      name: 'measurements.FM.title',
      value: 'Free Measurement',
      scope: 'global',
    },
    { name: 'measurements.FM.order', value: '3', scope: 'global' },
    { name: 'measurements.FM.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.FM.sensor_locations.0',
      value: 'Any',
      scope: 'global',
    },
    {
      name: 'measurements.FM.sensor_locations.1',
      value: 'Any,Any',
      scope: 'global',
    },
    {
      name: 'measurements.FM.sensor_locations.2',
      value: 'Any,Any,Any',
      scope: 'global',
    },
    {
      name: 'measurements.FM.sensor_locations.3',
      value: 'Any,Any,Any,Any',
      scope: 'global',
    },
    { name: 'measurements.AR.title', value: 'ARAT', scope: 'global' },
    { name: 'measurements.AR.order', value: '4', scope: 'global' },
    { name: 'measurements.AR.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.AR.sensor_locations.0',
      value: 'CHE,LWT,RWT',
      scope: 'global',
    },
    { name: 'measurements.JP.title', value: 'Jumping', scope: 'global' },
    { name: 'measurements.JP.order', value: '5', scope: 'global' },
    { name: 'measurements.JP.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.JP.sensor_locations.0',
      value: 'LFT,RFT',
      scope: 'global',
    },
    {
      name: 'measurements.JP.sensor_locations.1',
      value: 'Any',
      scope: 'global',
    },
    { name: 'measurements.STR.title', value: 'Stairs', scope: 'global' },
    { name: 'measurements.STR.order', value: '6', scope: 'global' },
    { name: 'measurements.STR.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.STR.sensor_locations.0',
      value: 'Any',
      scope: 'global',
    },
    {
      name: 'measurements.TUG.title',
      value: 'Time Up-and-Go',
      scope: 'global',
    },
    { name: 'measurements.TUG.order', value: '7', scope: 'global' },
    { name: 'measurements.TUG.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.TUG.sensor_locations.0',
      value: 'Any',
      scope: 'global',
    },
    { name: 'measurements.FLM.title', value: 'Fugl-Meyer', scope: 'global' },
    { name: 'measurements.FLM.order', value: '8', scope: 'global' },
    { name: 'measurements.FLM.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.FLM.sensor_locations.0',
      value: 'Any',
      scope: 'global',
    },
    { name: 'measurements.SLP.title', value: 'Sleep', scope: 'global' },
    { name: 'measurements.SLP.order', value: '9', scope: 'global' },
    { name: 'measurements.SLP.enabled', value: 'true', scope: 'global' },
    {
      name: 'measurements.SLP.sensor_locations.0',
      value: 'Any',
      scope: 'global',
    },
    {
      name: 'measurements.SLP.instructions',
      value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
      scope: 'global',
    },
    {
      name: 'feedbackConfig',
      value:
        '[{         label: "Quality of Measurement",         type: "select",         options: ["Good","More or less","Poor"]     },     {         label: "Walking Aids",         type: "select",         options: ["None – No Walking Aids",         "LWS – Left Walking Stick",         "RWS – Right Walking Stick",         "TWS – Two Walking Sticks",         "WKR – Walker",         "BWS – Body Weight Support",         "HH – Human Help"]     },     {         label: "Ankle Foot Orthoses",         type: "select",         options: ["None – No AFOs",         "LP – Left Passive",         "RP – Right Passive",         "LPRP – Left and Right Passive",         "LA – Left Active",         "RA – Right Active",         "LARA – Left and Right Active",         "LARP – Left Active, Right Passive",         "LPRA – Left Passive, Right Active"]     },     {         label: "Fatigue",         type: "slider",         step: 1,         valueFrom: 0,         valueTo: 10     },     {         label: "Pain",         type: "select",         options: ["0 - Nothing at all", "0.3", "0.5 - Extremely weak", "0.7", "1 - Very weak",         "1.5", "2 - Weak", "2.5", "3 - Moderate", "4", "5 - Strong", "6", "7 - Very strong",         "8", "9", "10 - Extremely strong", "11", "12 - Absolute maximum"]     },     {         label: "Note",         type: "text_input"     }  ]',
      scope: 'global',
    },
  ],
};
*/
