// import { AppBaseModel } from './base.model';

export interface RadarConfigBundle {
  clientId: string;
  scope: string;
  config: RadarConfig[];
  defaults?: RadarConfig[];
}

export interface RadarConfig {
  name: string;
  value: string;
  default?: string;
  scope?: string;
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
