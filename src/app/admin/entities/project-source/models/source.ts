import {SourceTypeDto} from '../../source-type/models/source-type';
import {ProjectDto} from '../../project/models/project';

export interface SourceDto {
  id: number;
  sourceId: string;
  sourceName: string;
  expectedSourceName?: string;
  assigned?: boolean;
  sourceType?: SourceTypeDto;
  project?: ProjectDto;
  attributes?: Record<string, string>;
  sourceTypeProducer?: string;
  sourceTypeModel?: string;
  sourceTypeCatalogVersion?: string;
}

export type CreateSourceDto = Partial<Omit<SourceDto, 'id' | 'sourceTypeProducer' | 'sourceTypeModel' | 'sourceTypeCatalogVersion'>>;

export type UpdateSourceDto = Partial<Omit<SourceDto, 'sourceTypeProducer' | 'sourceTypeModel' | 'sourceTypeCatalogVersion'>>;

export type AppSource = SourceDto & {name: string; search: string};
