import {RadarSourceData} from '../../source-data/models/source-data';

export interface RadarSourceType extends Record<string, number | string | boolean | SourceTypeScope | RadarSourceData[] | undefined> {
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
  _name: string;
  _search?: string;
}

export enum SourceTypeScope {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
}
