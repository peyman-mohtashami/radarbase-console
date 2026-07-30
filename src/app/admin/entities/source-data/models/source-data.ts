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


// export const ProcessingState = {
//   RAW: 'RAW',
//   DERIVED: 'DERIVED',
//   VENDOR: 'VENDOR',
//   RADAR: 'RADAR',
//   UNKNOWN: 'UNKNOWN',
// }

export const PROCESSING_STATE = ['RAW', 'DERIVED', 'VENDOR', 'RADAR', 'UNKNOWN'] as const;
export type ProcessingState = typeof PROCESSING_STATE[number];

// export const PROCESSING_STATE_LABELS = {
//   PLANNING: 'Planning',
//   ONGOING: 'Ongoing',
//   ENDED: 'Ended',
// } satisfies Record<ProjectStatus, string>;

const PROCESSING_STATE_SET: ReadonlySet<string> = new Set(PROCESSING_STATE);

export function isProcessingState(value: string): value is ProcessingState {
  return PROCESSING_STATE_SET.has(value);
}

export function toProcessingState(value: string): ProcessingState | undefined {
  return isProcessingState(value) ? value : undefined;
}
