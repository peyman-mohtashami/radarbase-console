import {SourceTypeDto} from '../../source-type/models/source-type';

export interface SourceDataDto {
  id: number;
  keySchema?: string;
  processingState?: ProcessingState;
  provider?: string;
  sourceDataName: string;
  sourceDataType?: string;
  sourceType?: SourceTypeDto;
  topic?: string;
  unit?: string;
  valueSchema?: string;
  frequency?: string;
}

export type CreateSourceDataDto = Partial<Omit<SourceDataDto, 'id'>>;

export type UpdateSourceDataDto = SourceDataDto;

export type AppSourceData = SourceDataDto & {name: string; search: string};


export enum ProcessingState {
  RAW = 'RAW',
  DERIVED = 'DERIVED',
  VENDOR = 'VENDOR',
  RADAR = 'RADAR',
  UNKNOWN = 'UNKNOWN',
}
