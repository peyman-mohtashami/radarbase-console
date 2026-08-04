// import { getGlobalConfiguration } from "./mock-configs";
// import {RadarConfigBundle} from "../models/config";
//
// export const MOCK_PROJECT_CONFIGS: Record<
//   string,
//   Record<string, RadarConfigBundle>
// > = {
//   radar: {
//     ManagementPortalapp: {
//       clientId: 'ManagementPortalapp',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('TManagementPortalapp').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//     'THINC-IT': {
//       clientId: 'THINC-IT',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('THINC-IT').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//     // aRMT: {
//     //   clientId: 'aRMT',
//     //   scope: 'project.radar',
//     //   config: [{ name: 'protocols', value: JSON.stringify(WORKSHOP_TEST) }],
//     //   defaults: getGlobalConfiguration('aRMT').config.map((config: any) => {
//     //     return {...config, scope: config.scope}
//     //   })
//     //   //   [
//     //   //   {
//     //   //     name: 'protocols',
//     //   //     value: JSON.stringify(RADAR_PILOT_TEST),
//     //   //     scope: 'global',
//     //   //   },
//     //   //   { name: 'questionnaires', value: 'Questionnaires', scope: 'global' },
//     //   //   { name: 'oauth_client_secret', value: 'secret', scope: 'global' },
//     //   // ],
//     // },
//     pRMT: {
//       clientId: 'pRMT',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('pRMT').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//     radar_dashboard: {
//       clientId: 'radar_dashboard',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('radar_dashboard').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//     radar_redcap_integrator: {
//       clientId: 'radar_redcap_integrator',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('THINC-IT').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//     radar_restapi: {
//       clientId: 'radar_restapi',
//       scope: 'project.radar',
//       config: [
//         { name: 'url', value: 'https://radarbase.io' },
//         { name: 'timeout', value: '500' },
//       ],
//       defaults: getGlobalConfiguration('radar_restapi').config.map((config) => {
//         return {...config, scope: getGlobalConfiguration('radar_restapi').scope} //config.scope}
//       })
//     },
//     radar_upload_backend: {
//       clientId: 'radar_upload_backend',
//       scope: 'project.radar',
//       config: [],
//       defaults: getGlobalConfiguration('radar_upload_backend').config.map((config) => {
//         return {...config, scope: config.scope}
//       })
//     },
//   },
// };
