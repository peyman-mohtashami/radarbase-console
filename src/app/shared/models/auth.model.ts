// import { BaseDef } from './base.model';
import { RadarProject } from './radar-project.model';
import { RadarOrganization } from './radar-organization.model';

export interface AuthOptionsModel {
  backendBaseUrl?: string;
  authorizationGrantType: string;
  refreshToken?: boolean;
  cookies?: boolean;
  appClientId: string;
  appClientSecret: string;
  authCallbackUrl: string;
  authBaseUrl: string;
  authGuardRedirectUrl?: string;
  guestGuardRedirectUrl?: string;
}

// export interface Language {
//   language: string;
//   locale: string;
//   label: string;
//   shortLabel?: string;
//   dateFormat?: string;
//   direction?: 'ltr' | 'rtl';
// }

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
  roles: RadarRole[]; //[{id: 1, projectId: null, projectName: null, authorityName: "ROLE_SYS_ADMIN"}]
}

export interface RadarRolePayload {
  authorityName?: string;
  projectId?: number | null;
  projectName?: string | null;
  organizationName?: string | null;
  organizationId?: number | null;
}

export interface RadarRole {
  id?: number | string;
  authorityName?: string;
  projectId?: number | null;
  projectName?: string | null;
  organizationName?: string | null;
  organizationId?: number | null;
  project?: RadarProject;
  organization?: RadarOrganization;
  authority?: { name: string };
  role?: string;
}

// export interface RadarRoleDTO {
//   id?: number | string;
//   authorityName?: string;
//   projectId?: number | null;
//   projectName?: string | null;
//   organizationName?: string | null;
//   organizationId?: number | null;
//   project?: RadarProjectDTO;
//   organization?: RadarOrganizationDTO;
//   authority?: { name: string };
//   role?: string;
// }
//
// export interface RadarRoleDef extends BaseDef {
//   id: number | string;
//   authorityName?: string;
//   projectId?: number | null;
//   projectName?: string | null;
//   organizationName?: string | null;
//   organizationId?: number | null;
//   project?: RadarProjectDTO;
//   organization?: RadarOrganizationDTO;
//   authority?: { name: string };
//   role?: string;
// }

// export interface Role {
//   id: number; //1,
//   projectId?: string | null;
//   projectName?: string | null;
//   authorityName: string; // "ROLE_SYS_ADMIN"
// }

export enum RADAR_ROLES {
  SYS_ADMIN = 'ROLE_SYS_ADMIN',
  ORGANIZATION_ADMIN = 'ROLE_ORGANIZATION_ADMIN',
  PROJECT_ADMIN = 'ROLE_PROJECT_ADMIN',
}

export interface AuthResponse {
  access_token: string;
  expires_in: number;
  grant_type: string;
  iat: number;
  iss: string;
  jti: string;
  roles: any[];
  scope: string;
  sources: any[];
  sub: string;
  token_type: string;
  refresh_token: string;
}

// export interface User {
//   login: string;
//   // name: string;
//   roles: string[];
// }

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

// export interface ManagementPortalUser {
//   activated?: boolean; // true
//   authorities?: string[]; //["ROLE_SYS_ADMIN"]
//   createdBy?: string; //"system"
//   createdDate?: string; //"2021-11-09T09:01:44.068136+01:00"
//   email?: string; //"admin@localhost"
//   firstName?: string; //"Administrator"
//   id?: number; //1
//   langKey?: string; //"en"
//   lastModifiedBy?: string; //"system"
//   lastModifiedDate?: string; //"2021-11-09T09:01:48.286+01:00"
//   lastName?: string; //"Administrator"
//   login: string; //"admin"
//   roles: Role[]; //[{id: 1, projectId: null, projectName: null, authorityName: "ROLE_SYS_ADMIN"}]
// }
//
// export interface Role {
//   id: number; //1,
//   projectId?: string; //null,
//   projectName?: string; //null,
//   authorityName: string; // "ROLE_SYS_ADMIN"
// }



export interface CredentialAuthRequest {
  username: string;
  password: string;
  remember?: boolean;
}




