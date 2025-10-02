import {RadarProject} from '../../project/models/project';

export interface RadarOrganization extends Record<string, number | string | RadarProject[] | undefined> {
  id: number | string;
  name: string;
  description?: string;
  location?: string;
  projects?: RadarProject[];
}

export interface AppOrganization extends RadarOrganization {
  _name: string;
  _search: string;
}
