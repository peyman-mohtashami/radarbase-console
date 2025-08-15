// import { BaseDef } from './base.model';
// import { RadarProject } from './radar-project.model';

export interface RadarGroup {
  id: number | string;
  name: string;
  projectId: number;
  projectName: string;
}
//
// export interface RadarGroupDTO
//   extends Record<string, number | string | undefined | RadarProjectDTO> {
//   id: number | string;
//   name: string;
//   projectId: number;
//   projectName: string;
// }
//
// export interface RadarGroupDef extends BaseDef, RadarGroupDTO {
//   project?: RadarProjectDTO;
// }
