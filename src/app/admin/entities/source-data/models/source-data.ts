import {RadarSourceType} from '../../source-type/models/source-type';

export interface RadarSourceData extends Record<string, string | number | ProcessingState | RadarSourceType | undefined> {
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

export interface AppSourceData extends RadarSourceData {
  _name: string;
}

export enum ProcessingState {
  RAW = 'RAW',
  DERIVED = 'DERIVED',
  VENDOR = 'VENDOR',
  RADAR = 'RADAR',
  UNKNOWN = 'UNKNOWN',
}

