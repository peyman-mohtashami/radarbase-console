// import {RadarProject} from '../../project/models/project';
//
// export interface RadarUser extends Record<string, string | number | boolean | string[] | {name: string}[] | RadarProject | RadarRole[] | AppRole | undefined>{
//   id: number | string;
//   login: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   activated?: boolean;
//   langKey?: string;
//   authorities: string[] | { name: string }[];
//   createdBy?: string;
//   createdDate?: string;
//   lastModifiedBy?: string;
//   lastModifiedDate?: string;
//   password?: string;
//   roles?: RadarRole[];
// }
//
// export interface AppUser extends RadarUser {
//   _name: string;
//   _roles?: AppRole,
//   _search?: string;
// }
//
// export interface RadarRole extends Record<string, string | number | undefined> {
//   id?: number;
//   authorityName?: string;
//   projectId?: number;
//   projectName?: string;
//   organizationName?: string;
//   organizationId?: number;
//   users?: any;
//   project?: any;
//   organization?: any;
//   authority?: any;
//   role?: string;
// }
//
// export interface AppRole {
//   _sysAdmin?: boolean;
//   _organizationAdmin?: boolean;
//   _projectAdmin?: boolean;
//   _organizations?: { name?: string | null; id?: string | number | null; }[];
//   _projects?: { id?: string | number | null; name?: string | null }[];
// }
