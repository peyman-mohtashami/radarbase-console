import {RadarOrganization} from '../../organization/models/organization';
import {RadarSourceType} from '../../source-type/models/source-type';
import {RadarGroup} from '../../../project-scope/group/models/group';

export interface RadarProject {
  id: number | string;
  projectName: string;
  description: string | null;
  organizationName: string | null;
  organization: RadarOrganization;
  location: string | null;
  startDate: string | null;
  projectStatus: ProjectStatus | null;
  endDate: string | null;
  attributes: Record<string, string | null | undefined> | null;
  sourceTypes: RadarSourceType[] | null;
  groups: RadarGroup[] | null;
  humanReadableProjectName: string | null;
  persistentTokenTimeout: number | null;
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
