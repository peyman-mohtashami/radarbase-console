// import { RadarConfigBundle } from './mock-configs';
// import { MOCK_PROTOCOLS } from '../../protocol/mock/data';
// import { WORKSHOP_TEST } from '../../protocol/mock/WORKSHOP-TEST/protocol';
// import { RADAR_PILOT_TEST } from '../../protocol/mock/RADAR-Pilot-Test/protocol';
// import { MOCK_GLOBAL_CONFIGS } from "./mock-global-configs";
import { getGlobalConfiguration } from "./mock-configs";
import {RadarConfigBundle} from "../models/config";

export const MOCK_PROJECT_CONFIGS: Record<
  string,
  Record<string, RadarConfigBundle>
> = {
  radar: {
    ManagementPortalapp: {
      clientId: 'ManagementPortalapp',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('TManagementPortalapp').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    'THINC-IT': {
      clientId: 'THINC-IT',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('THINC-IT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    // aRMT: {
    //   clientId: 'aRMT',
    //   scope: 'project.radar',
    //   config: [{ name: 'protocols', value: JSON.stringify(WORKSHOP_TEST) }],
    //   defaults: getGlobalConfiguration('aRMT').config.map((config: any) => {
    //     return {...config, scope: config.scope}
    //   })
    //   //   [
    //   //   {
    //   //     name: 'protocols',
    //   //     value: JSON.stringify(RADAR_PILOT_TEST),
    //   //     scope: 'global',
    //   //   },
    //   //   { name: 'questionnaires', value: 'Questionnaires', scope: 'global' },
    //   //   { name: 'oauth_client_secret', value: 'secret', scope: 'global' },
    //   // ],
    // },
    pRMT: {
      clientId: 'pRMT',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('pRMT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_dashboard: {
      clientId: 'radar_dashboard',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('radar_dashboard').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_redcap_integrator: {
      clientId: 'radar_redcap_integrator',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('THINC-IT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_restapi: {
      clientId: 'radar_restapi',
      scope: 'project.radar',
      config: [
        { name: 'url', value: 'https://radarbase.io' },
        { name: 'timeout', value: '500' },
      ],
      defaults: getGlobalConfiguration('radar_restapi').config.map((config: any) => {
        return {...config, scope: getGlobalConfiguration('radar_restapi').scope} //config.scope}
      })
    },
    radar_upload_backend: {
      clientId: 'radar_upload_backend',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('radar_upload_backend').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
  },
  'Radar-Pilot-01': {
    ManagementPortalapp: {
      clientId: 'ManagementPortalapp',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('ManagementPortalapp').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    'THINC-IT': {
      clientId: 'THINC-IT',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('THINC-IT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    aRMT: {
      clientId: 'aRMT',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('aRMT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    pRMT: {
      clientId: 'pRMT',
      scope: 'project.radar',
      config: [
        { name: 'measurements.FW.title', value: 'Free walking' },
        {
          name: 'measurements.FW.order',
          value: '1',
        },
        { name: 'measurements.FW.enabled', value: 'true' },
        {
          name: 'measurements.FW.sensor_locations.0',
          value: 'LFT,RFT',
        },
        {
          name: 'measurements.FW.instructions',
          value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
        },
        { name: 'measurements.10MWT.title', value: '10m walk' },
        {
          name: 'measurements.10MWT.order',
          value: '2',
        },
        { name: 'measurements.10MWT.enabled', value: 'true' },
        {
          name: 'measurements.10MWT.sensor_locations.0',
          value: 'LFT,RFT',
        },
        { name: 'measurements.FM.title', value: 'Free Measurement' },
        {
          name: 'measurements.FM.order',
          value: '3',
        },
        { name: 'measurements.FM.enabled', value: 'true' },
        {
          name: 'measurements.FM.sensor_locations.0',
          value: 'Any',
        },
        {
          name: 'measurements.FM.sensor_locations.1',
          value: 'Any,Any',
        },
        {
          name: 'measurements.FM.sensor_locations.2',
          value: 'Any,Any,Any',
        },
        {
          name: 'measurements.FM.sensor_locations.3',
          value: 'Any,Any,Any,Any',
        },
        {
          name: 'measurements.AR.title',
          value: 'ARAT',
        },
        { name: 'measurements.AR.order', value: '4' },
        {
          name: 'measurements.AR.enabled',
          value: 'true',
        },
        { name: 'measurements.AR.sensor_locations.0', value: 'CHE,LWT,RWT' },
        {
          name: 'measurements.JP.title',
          value: 'Jumping',
        },
        { name: 'measurements.JP.order', value: '5' },
        {
          name: 'measurements.JP.enabled',
          value: 'true',
        },
        {
          name: 'measurements.JP.sensor_locations.0',
          value: 'LFT,RFT',
        },
        { name: 'measurements.JP.sensor_locations.1', value: 'Any' },
        {
          name: 'measurements.STR.title',
          value: 'Stairs',
        },
        { name: 'measurements.STR.order', value: '6' },
        {
          name: 'measurements.STR.enabled',
          value: 'true',
        },
        { name: 'measurements.STR.sensor_locations.0', value: 'Any' },
        {
          name: 'measurements.TUG.title',
          value: 'Time Up-and-Go',
        },
        { name: 'measurements.TUG.order', value: '7' },
        {
          name: 'measurements.TUG.enabled',
          value: 'true',
        },
        { name: 'measurements.TUG.sensor_locations.0', value: 'Any' },
        {
          name: 'measurements.FLM.title',
          value: 'Fugl-Meyer',
        },
        { name: 'measurements.FLM.order', value: '8' },
        {
          name: 'measurements.FLM.enabled',
          value: 'true',
        },
        { name: 'measurements.FLM.sensor_locations.0', value: 'Any' },
        {
          name: 'measurements.SLP.title',
          value: 'Sleep',
        },
        { name: 'measurements.SLP.order', value: '9' },
        {
          name: 'measurements.SLP.enabled',
          value: 'true',
        },
        { name: 'measurements.SLP.sensor_locations.0', value: 'Any' },
        {
          name: 'measurements.SLP.instructions',
          value: 'i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet...',
        },
        {
          name: 'measurements',
          value:
            '{     "measurements": {         "imu": {             "title": "IMU Measurement",              "icon": "imu",             "sensors": [],              "tests": {                 "FW": {                     "title": "Free walking",                     "enabled": "false",                     "sensor_locations": ["LFT,RFT"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "10MWT": {                     "title": "10m walk",                     "enabled": "true",                     "sensor_locations": ["LFT,RFT"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "FM": {                     "title": "Free Measurement",                     "enabled": "true",                     "sensor_locations": [                     "Any",                     "Any,Any",                     "Any,Any,Any",                     "Any,Any,Any,Any"                     ],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "AR": {                     "title": "ARAT",                     "enabled": "true",                     "sensor_locations": ["CHE,LWT,RWT"],                     "instructions": ""                 },                 "JP": {                     "title": "Jumping",                     "enabled": "true",                     "sensor_locations": [                     "LFT,RFT",                     "Any"                     ],                     "instructions": ""                 },                 "STR": {                     "title": "Stairs",                     "enabled": "true",                     "sensor_locations": ["Any"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "TUG": {                     "title": "Time Up-and-Go",                     "enabled": "true",                     "sensor_locations": ["Any"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "FLM": {                     "title": "Fugl-Meyer",                     "enabled": "true",                     "sensor_locations": ["Any"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 },                 "SLP": {                     "title": "Sleep",                     "enabled": "true",                     "sensor_locations": ["Any"],                     "instructions": "i) Step one<br>ii) Step two<br>Lorem ipsum dolor sit amet..."                 }             }         }     } }',
        },
        {
          name: 'feedbackConfig',
          value:
            '[{         label: "Quality of Measurement",         type: "select",         options: ["Good","More or less","Poor"]     },     {         label: "Walking Aids",         type: "select",         options: ["None – No Walking Aids",         "LWS – Left Walking Stick",         "RWS – Right Walking Stick",         "TWS – Two Walking Sticks",         "WKR – Walker",         "BWS – Body Weight Support",         "HH – Human Help"]     },     {         label: "Ankle Foot Orthoses",         type: "select",         options: ["None – No AFOs",         "LP – Left Passive",         "RP – Right Passive",         "LPRP – Left and Right Passive",         "LA – Left Active",         "RA – Right Active",         "LARA – Left and Right Active",         "LARP – Left Active, Right Passive",         "LPRA – Left Passive, Right Active"]     },     {         label: "Fatigue",         type: "slider",         step: 1,         valueFrom: 0,         valueTo: 10     },     {         label: "Pain",         type: "select",         options: ["0 - Nothing at all", "0.3", "0.5 - Extremely weak", "0.7", "1 - Very weak",         "1.5", "2 - Weak", "2.5", "3 - Moderate", "4", "5 - Strong", "6", "7 - Very strong",         "8", "9", "10 - Extremely strong", "11", "12 - Absolute maximum"]     },     {         label: "Note",         type: "text_input"     }  ]',
        },
      ],
      defaults: getGlobalConfiguration('pRMT').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_dashboard: {
      clientId: 'radar_dashboard',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('radar_dashboard').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_redcap_integrator: {
      clientId: 'radar_redcap_integrator',
      scope: 'project.radar',
      config: [],
      defaults: getGlobalConfiguration('radar_redcap_integrator').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_restapi: {
      clientId: 'radar_restapi',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('radar_restapi').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
    radar_upload_backend: {
      clientId: 'radar_upload_backend',
      scope: 'project.Radar-Pilot-01',
      config: [],
      defaults: getGlobalConfiguration('radar_upload_backend').config.map((config: any) => {
        return {...config, scope: config.scope}
      })
    },
  },
};
