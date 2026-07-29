// import {RadarOption} from "../../../../../shared/components/mat-select-autocomplete/mat-select-autocomplete.component";
import {AppProject, ProjectDto} from '../../project/models/project';
import {AppOrganization, OrganizationDto} from '../../organization/models/organization';

export interface UserDto {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  activated?: boolean;
  langKey?: string;
  authorities?: string[] | { name: string }[];
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  password?: string;
  roles?: RoleDto[];
}

export interface CreateUserDto {
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  langKey?: string;
  authorities?: string[] | { name: string }[];
  roles?: RoleDto[];
}

export interface UpdateUserDto {
  id: number;
  login: string;
  firstName?: string;
  lastName?: string;
  email: string;
  langKey?: string;
  authorities?: string[] | { name: string }[];
  roles?: RoleDto[];
}

export type AppUser = UserDto & {name: string; search: string, _roles: AppRole};

export interface RoleDto {
  id?: number;
  authorityName?: string;
  projectId?: number;
  projectName?: string;
  organizationName?: string;
  organizationId?: number;
  users?: unknown;
  project?: ProjectDto;
  organization?: OrganizationDto;
  authority?: {name: string};
  role?: string;
}

export interface AppRole {
  _sysAdmin?: boolean;
  _organizationAdmin?: boolean;
  _projectAdmin?: boolean;
  _organizations?: Partial<AppOrganization>[];
  _projects?: Partial<AppProject>[];
}
