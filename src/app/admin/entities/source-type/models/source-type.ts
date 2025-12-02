import {RadarSourceData} from '../../source-data/models/source-data';

export interface RadarSourceType extends Record<string, any> {
  id: number | string;
  producer: string;
  model: string;
  catalogVersion: string;
  sourceTypeScope: SourceTypeScope | null;
  sourceDataId?: number;
  sourceData?: RadarSourceData[];
  projectId?: number;
  canRegisterDynamically?: boolean;
  name?: string | null;
  description?: string | null;
  assessmentType?: string | null;
  appProvider?: string | null;
}

export interface AppSourceType extends RadarSourceType {
  _name: string;
  _search: string;
}

export enum SourceTypeScope {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
}
