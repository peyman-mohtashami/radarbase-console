import {RadarSourceType} from '../../../main-scope/source-type/models/source-type';
import {RadarProject} from '../../../main-scope/project/models/project';

export interface RadarSource {
  id: number | string;
  sourceId: string;
  sourceName: string;
  expectedSourceName?: string;
  assigned?: boolean;
  sourceType?: RadarSourceType;
  project?: RadarProject;
  attributes?: Record<string, string>;
  sourceTypeProducer?: string;
  sourceTypeModel?: string;
  sourceTypeCatalogVersion?: string;
}

export interface AppSource extends RadarSource {
  _name: string;
  _search: string;
}
