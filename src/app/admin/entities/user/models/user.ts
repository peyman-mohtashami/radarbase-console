// import {AppBaseModel, RadarProject, RadarRole, RadarUser} from "@rb/models";
import { ROLES } from "../../../enums/entities";
import {RadarUser} from '../../../../shared/models/radar-users.model';
import {AppBaseModel} from '../../../../shared/models/base.model';
import {RadarProject} from '../../../../shared/models/radar-project.model';
import {RadarRole} from '../../../../shared/models/auth.model';

export interface AppRole {
  _sysAdmin: boolean;
  _organizationAdmin: boolean;
  _projectAdmin: boolean;
  _organizations: {
    // organizationName?: string | null;
    name?: string | null;
    // organizationId?: number | null;
    id?: string | number | null;
  }[];
  // _projects: { projectId?: number | null; projectName?: string | null }[];
  _projects: { id?: string | number | null; name?: string | null }[];
}
export type AppUser = RadarUser  & AppBaseModel & { //Omit<RadarUser, "roles">
    _roles?: AppRole,
    selectedRoles?: ROLES; //(string | undefined)[]
  // removeMemberEnabled?: boolean;
  } & Record<string, null | number | string | boolean | string[] | { name: string }[] | RadarProject | RadarRole[] | ROLES | AppRole | undefined>;


// export interface RadarUserDef
//   extends BaseDef,
//     Record<
//       string,
//       | number
//       | string
//       | boolean
//       | string[]
//       | { name: string }[]
//       | Date
//       | RadarProjectDTO
//       | RadarRoleDTO[]
//       | undefined
//       | any
//     > {
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
//   project?: RadarProjectDTO;
//   roles?: RadarRoleDTO[];
//   _roles?: {
//     _sysAdmin: boolean;
//     _organizationAdmin: boolean;
//     _projectAdmin: boolean;
//     _organizations: {
//       // organizationName?: string | null;
//       name?: string | null;
//       // organizationId?: number | null;
//       id?: string | number | null;
//     }[];
//     // _projects: { projectId?: number | null; projectName?: string | null }[];
//     _projects: { id?: string | number | null; name?: string | null }[];
//   };
// }



// type UserFullname = Pick<User, 'firstname' | 'lastname'>;
//Omit<RadarOrganization, "isAdmin" | "isMaintainer"> & { role: Role };
