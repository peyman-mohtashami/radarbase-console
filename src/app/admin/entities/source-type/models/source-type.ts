import {RadarSourceData} from '../../../../shared/models/radar-source-data.model';

export interface RadarSourceType extends Record<string, any> {
  id: number | string;
  producer: string;
  model: string;
  catalogVersion: string;
  sourceTypeScope?: SourceTypeScope;
  sourceDataId?: number;
  sourceData?: RadarSourceData[];
  projectId?: number;
  canRegisterDynamically: boolean;
  name: string;
  description?: string;
  assessmentType?: string;
  appProvider?: string;
}

export interface AppSourceType extends RadarSourceType {
  name: string;
}

export enum SourceTypeScope {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
}
