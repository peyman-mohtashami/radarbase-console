// import { MOCK_PROTOCOLS } from '../../protocol/mock/data';
// import { RadarConfigBundle } from './mock-configs';
// import { RADAR_PILOT_TEST } from '../../protocol/mock/RADAR-Pilot-Test/protocol';
import {RadarConfigBundle} from '../../../../shared/models/radar-config.model';

export const MOCK_GLOBAL_CONFIGS: Record<string, RadarConfigBundle> = {
  ManagementPortalapp: {
    clientId: 'ManagementPortalapp',
    scope: 'global',
    config: [],
  },
  'THINC-IT': {
    clientId: 'THINC-IT',
    scope: 'global',
    config: [],
  },
  // aRMT: {
  //   clientId: 'aRMT',
  //   scope: 'global',
  //   config: [
  //     { name: 'protocols', value: JSON.stringify(RADAR_PILOT_TEST) },
  //     // { name: 'questionnaires', value: JSON.stringify(MOCK_QUESTIONNAIRES) },
  //     { name: 'oauth_client_secret', value: 'secret' },
  //   ],
  // },
  pRMT: {
    clientId: 'pRMT',
    scope: 'global',
    config: [
      { name: 'FW.title', value: 'Free walking' },
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
      { name: 'measurements.FM.sensor_locations.3', value: 'Any,Any,Any,Any' },
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
  },
  radar_dashboard: {
    clientId: 'radar_dashboard',
    scope: 'global',
    config: [],
  },
  radar_redcap_integrator: {
    clientId: 'radar_redcap_integrator',
    scope: 'global',
    config: [],
  },
  radar_restapi: {
    clientId: 'radar_restapi',
    scope: 'global',
    config: [
      { name: 'timeout', value: '1000' },
      { name: 'frequency', value: '10' },
    ],
  },
  radar_upload_backend: {
    clientId: 'radar_upload_backend',
    scope: 'global',
    config: [],
  },
};
