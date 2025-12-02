import {RadarSourceType} from '../../source-type/models/source-type';

export interface RadarSourceData extends Record<string, string | number | ProcessingState | RadarSourceType | null> {
  id: number | string;
  keySchema: string | null;
  processingState: ProcessingState | null;
  provider: string | null;
  sourceDataName: string;
  sourceDataType: string | null;
  sourceType: RadarSourceType | null;
  topic: string | null;
  unit: string | null;
  valueSchema: string | null;
  frequency: string | null;
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

