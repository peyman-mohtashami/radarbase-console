// import { RadarConfigBundle } from './mock-configs';
// import { MOCK_PROTOCOLS } from '../../protocol/mock/data';
// import { WORKSHOP_TEST } from '../../protocol/mock/WORKSHOP-TEST/protocol';
// import { RADAR_PILOT_TEST } from '../../protocol/mock/RADAR-Pilot-Test/protocol';
// import { MOCK_GLOBAL_CONFIGS } from "./mock-global-configs";
import {getGlobalConfiguration, getProjectConfiguration} from "./mock-configs";
import {RadarConfigBundle} from "../models/config";

export const MOCK_SUBJECT_CONFIGS: Record<
  string,
  Record<string, Record<string,RadarConfigBundle>>
> = {
  radar: {
    "sub-1": {
      radar_restapi: {
        clientId: 'radar_restapi',
        scope: `user:sub-1`,
        config: [
          {name: 'timeout', value: '501'},
          {name: 'token', value: 'user-token'},
          {name: 'temp', value: 'user-temp'},
          {name: 'url', value: 'https://google.com'},
        ],
        defaults: [...getGlobalConfiguration('radar_restapi').config.map((config: any) => {
          return {...config, scope: getGlobalConfiguration('radar_restapi').scope} //config.scope}
        }), ...getProjectConfiguration('radar_restapi', 'radar').config.map((config: any) => {
          return {...config, scope: getProjectConfiguration('radar_restapi', 'radar').scope} //config.scope}
        })]
      },
    }
  },
};
