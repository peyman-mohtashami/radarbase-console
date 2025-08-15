// import { BaseDef } from './base.model';
import { RadarSourceType } from './radar-source-type.model';
import { RadarProject } from './radar-project.model';

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

// export interface RadarSourceDTO
//   extends Record<
//     string,
//     | number
//     | string
//     | boolean
//     | RadarSourceTypeDTO
//     | RadarProjectDTO
//     | Record<string, string>
//     | undefined
//   > {
//   id: number | string;
//   sourceId: string;
//   sourceName: string;
//   expectedSourceName?: string;
//   assigned?: boolean;
//   sourceType?: RadarSourceTypeDTO;
//   project?: RadarProjectDTO;
//   attributes?: Record<string, string>;
//   sourceTypeProducer?: string;
//   sourceTypeModel?: string;
//   sourceTypeCatalogVersion?: string;
// }
//
// export interface RadarSourceDef extends BaseDef, RadarSourceDTO {}
