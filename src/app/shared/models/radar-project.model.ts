// import { BaseDef } from './base.model';
import { RadarGroup } from './radar-group.model';
// import { RadarOrganizationDTO } from './radar-organization.model';
import { RadarSourceType } from './radar-source-type.model';
import { RadarOrganization } from "./radar-organization.model";

// export interface RadarProjectDTO
//   extends Record<
//     string,
//     | number
//     | string
//     | RadarOrganizationDTO
//     | ProjectStatus
//     | RadarSourceTypeDTO[]
//     | RadarGroupDTO[]
//     | Record<string, string>
//     | undefined
//   > {
//   id: number | string;
//   projectName: string;
//   description?: string;
//   organizationName?: string;
//   organization: RadarOrganizationDTO;
//   location: string;
//   startDate?: string;
//   projectStatus?: ProjectStatus;
//   endDate?: string;
//   attributes?: Record<string, string>;
//   sourceTypes?: RadarSourceTypeDTO[];
//   groups?: RadarGroupDTO[];
//   humanReadableProjectName?: string;
//   persistentTokenTimeout?: number;
// }

export interface RadarProject {
  id: number | string;
  projectName: string;
  description?: string;
  organizationName?: string;
  organization: RadarOrganization;
  location: string;
  startDate?: string;
  projectStatus?: ProjectStatus;
  endDate?: string;
  attributes?: Record<string, string>;
  sourceTypes?: RadarSourceType[];
  groups?: RadarGroup[];
  humanReadableProjectName?: string;
  persistentTokenTimeout?: number;
}

// export interface RadarProjectDef extends BaseDef, RadarProjectDTO {}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}
