import {RadarOrganization} from '../../organization/models/organization';
import {RadarSourceType} from '../../source-type/models/source-type';
import {RadarGroup} from '../../group/models/group';

export interface RadarProject extends Record<string, number | string | RadarOrganization | ProjectStatus | RadarSourceType[] | RadarGroup[] | Record<string, string | null | undefined> | null> {
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
