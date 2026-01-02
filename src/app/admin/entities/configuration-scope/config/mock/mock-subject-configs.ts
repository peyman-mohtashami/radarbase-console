// import {getGlobalConfiguration, getProjectConfiguration} from "./mock-configs";
// import {RadarConfigBundle} from "../models/config";
//
// export const MOCK_SUBJECT_CONFIGS: Record<
//   string,
//   Record<string, Record<string,RadarConfigBundle>>
// > = {
//   radar: {
//     "sub-1": {
//       radar_restapi: {
//         clientId: 'radar_restapi',
//         scope: `user:sub-1`,
//         config: [
//           {name: 'timeout', value: '501'},
//           {name: 'token', value: 'user-token'},
//           {name: 'temp', value: 'user-temp'},
//           {name: 'url', value: 'https://google.com'},
//         ],
//         defaults: [...getGlobalConfiguration('radar_restapi').config.map((config) => {
//           return {...config, scope: getGlobalConfiguration('radar_restapi').scope}
//         }), ...getProjectConfiguration('radar_restapi', 'radar').config.map((config) => {
//           return {...config, scope: getProjectConfiguration('radar_restapi', 'radar').scope}
//         })]
//       },
//     }
//   },
// };

