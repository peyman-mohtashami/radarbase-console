// import { BaseDef } from './base.model';
import { RadarSourceType } from './radar-source-type.model';
// import { RadarProject } from './radar-project.model';

export interface RadarSourceData {
  dataClass?: string;
  enabled?: boolean;
  frequency?: string;
  id: number | string;
  keySchema?: string;
  processingState?: ProcessingState;
  provider?: string;
  sourceDataName: string;
  sourceDataType?: string;
  sourceType?: RadarSourceType;
  topic?: string;
  unit?: string;
  valueSchema?: string;
}

//
// export interface RadarSourceDataDTO
//   extends Record<
//     string,
//     number | string | boolean | RadarSourceTypeDTO | RadarProjectDTO | undefined
//   > {
//   dataClass?: string;
//   enabled?: boolean;
//   frequency?: string;
//   id: number | string;
//   keySchema?: string;
//   processingState?: ProcessingState;
//   provider?: string;
//   sourceDataName: string;
//   sourceDataType?: string;
//   sourceType?: RadarSourceTypeDTO;
//   topic?: string;
//   unit?: string;
//   valueSchema?: string;
// }
//
// export interface RadarSourceDataDef extends BaseDef, RadarSourceDataDTO {}

export enum ProcessingState {
  RAW = 'RAW',
  DERIVED = 'DERIVED',
  VENDOR = 'VENDOR',
  RADAR = 'RADAR',
  UNKNOWN = 'UNKNOWN',
}
