import {RadarOrganization} from '../../organization/models/organization';
import {RadarSourceType} from '../../source-type/models/source-type';
import {RadarGroup} from '../../group/models/group';

export interface RadarProject extends Record<string, string | number | RadarOrganization | ProjectStatus | RadarSourceType[] | RadarGroup[] | Record<string, string> | undefined>{
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

export interface AppProject extends RadarProject {
  _name: string;
  _search: string;
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  ONGOING = 'ONGOING',
  ENDED = 'ENDED',
}
