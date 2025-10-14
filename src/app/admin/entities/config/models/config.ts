// import {RadarConfig, RadarConfigBundle} from '../../../../shared/models/radar-config.model';
// import {AppBaseModel} from '../../../../shared/models/base.model';

// export type AppConfigBundle =  RadarConfigBundle & Record<string, string | number | RadarConfig[] | undefined>;
// export type AppConfig =  RadarConfig & AppBaseModel & {changed?: boolean;} & Record<string, string | number | boolean | undefined>;


export interface RadarConfigBundle {
  clientId: string;
  scope: string;
  config: RadarConfig[];
  defaults?: RadarConfig[];
}

export interface RadarConfig extends Record<string, any> {
  name: string;
  value: string;
  default?: string;
  scope?: string;
}

export interface AppConfig extends RadarConfig {
  id: string;
  _name: string;
  // _changed?: boolean;
  _search?: string;
}
// export interface RadarConfigDTO
//   extends Record<string, string | number | boolean | undefined> {
//   name: string;
//   value: string;
//   default?: string;
//   scope?: string;
// }

// export interface RadarConfigDef extends AppBaseModel, RadarConfigDTO {
//   changed?: boolean;
// }

// export interface RadarConfigBundleDTO {
//   clientId: string;
//   scope: string;
//   config: RadarConfigDTO[];
//   defaults?: RadarConfigDTO[];
// }

// export interface RadarRawConfig {
//   name: string;
//   value: string;
//   scope?: string;
// }
