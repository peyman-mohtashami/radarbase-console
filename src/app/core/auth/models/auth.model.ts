import {RoleDto} from '../../../admin/entities/user/models/user';

export interface ManagementPortalUser {
  activated?: boolean; // true
  authorities?: string[]; //["ROLE_SYS_ADMIN"]
  createdBy?: string; //"system"
  createdDate?: string; //"2021-11-09T09:01:44.068136+01:00"
  email?: string; //"admin@localhost"
  firstName?: string; //"Administrator"
  id?: number; //1
  langKey?: string; //"en"
  lastModifiedBy?: string; //"system"
  lastModifiedDate?: string; //"2021-11-09T09:01:48.286+01:00"
  lastName?: string; //"Administrator"
  login: string; //"admin"
  roles: RoleDto[]; //[{id: 1, projectId: null, projectName: null, authorityName: "ROLE_SYS_ADMIN"}]
}

export enum RADAR_ROLES {
  SYS_ADMIN = 'ROLE_SYS_ADMIN',
  ORGANIZATION_ADMIN = 'ROLE_ORGANIZATION_ADMIN',
  PROJECT_ADMIN = 'ROLE_PROJECT_ADMIN',
}

export interface TokenData {
  access_token: string;
  expires_in?: number;
  grant_type?: string; //string[];
  iat?: number;
  iss?: string; //string[];
  jti?: string;
  refresh_token: string;
  scope?: string[];
  token_type?: string;
  // sub?: string;
  // sources?: string[];
  // roles?: string[];
  // expires_at?: number;
}

export interface CredentialAuthRequest {
  username: string;
  password: string;
  remember?: boolean;
}




