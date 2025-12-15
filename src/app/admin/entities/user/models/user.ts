import {RadarProject} from '../../project/models/project';
import {RadarOption} from "../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";

export interface RadarUser {
  id: number | string;
  login: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  activated: boolean | null;
  langKey: string | null;
  authorities: string[] | { name: string }[] | null;
  createdBy: string | null;
  createdDate: string | null;
  lastModifiedBy: string | null;
  lastModifiedDate: string | null;
  password: string | null;
  roles: RadarRole[] | null;
}

export interface AppUser extends RadarUser {
  _name: string;
  _roles: AppRole,
  _search: string;
}

export interface RadarRole {
  id: number;
  authorityName: string;
  projectId: number;
  projectName: string;
  organizationName: string;
  organizationId: number;
  users: any;
  project: any;
  organization: any;
  authority: any;
  role: string;
}

export interface AppRole {
  _sysAdmin: boolean | null;
  _organizationAdmin: boolean | null;
  _projectAdmin: boolean | null;
  _organizations: RadarOption[] | null; //{ name: string | null; id: string | number | null; }[] | null;
  _projects: RadarOption[] | null; //{ id: string | number | null; name: string | null }[] | null;
}
