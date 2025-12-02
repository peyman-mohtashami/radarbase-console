import {RadarProject} from '../../project/models/project';

export interface RadarOrganization extends Record<string, any> {
  id: number | string;
  name: string;
  description: string | null;
  location: string | null;
  projects?: RadarProject[];
}

export interface AppOrganization extends RadarOrganization {
  _name: string;
  _search: string;
}
