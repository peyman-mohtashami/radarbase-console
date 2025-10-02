// // import { BaseDef } from './base.model';
// // import { RadarProject } from './radar-project.model';
// import { RadarRole } from './auth.model';
// import { RadarProject } from "./radar-project.model";
//
// export interface RadarUser {
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
//   project?: RadarProject;
//   roles?: RadarRole[];
// }
// // export interface RadarUserDTO
// //   extends Record<
// //     string,
// //     | number
// //     | string
// //     | boolean
// //     | string[]
// //     | { name: string }[]
// //     | Date
// //     | RadarProjectDTO
// //     | RadarRoleDTO[]
// //     | undefined
// //   > {
// //   id: number | string;
// //   login: string;
// //   firstName?: string;
// //   lastName?: string;
// //   email?: string;
// //   activated?: boolean;
// //   langKey?: string;
// //   authorities: string[] | { name: string }[];
// //   createdBy?: string;
// //   createdDate?: string;
// //   lastModifiedBy?: string;
// //   lastModifiedDate?: string;
// //   password?: string;
// //   project?: RadarProjectDTO;
// //   roles?: RadarRoleDTO[];
// // }
//
// // export interface RadarUserDef
// //   extends BaseDef,
// //     Record<
// //       string,
// //       | number
// //       | string
// //       | boolean
// //       | string[]
// //       | { name: string }[]
// //       | Date
// //       | RadarProjectDTO
// //       | RadarRoleDTO[]
// //       | undefined
// //       | any
// //     > {
// //   id: number | string;
// //   login: string;
// //   firstName?: string;
// //   lastName?: string;
// //   email?: string;
// //   activated?: boolean;
// //   langKey?: string;
// //   authorities: string[] | { name: string }[];
// //   createdBy?: string;
// //   createdDate?: string;
// //   lastModifiedBy?: string;
// //   lastModifiedDate?: string;
// //   password?: string;
// //   project?: RadarProjectDTO;
// //   roles?: RadarRoleDTO[];
// //   _roles?: {
// //     _sysAdmin: boolean;
// //     _organizationAdmin: boolean;
// //     _projectAdmin: boolean;
// //     _organizations: {
// //       // organizationName?: string | null;
// //       name?: string | null;
// //       // organizationId?: number | null;
// //       id?: string | number | null;
// //     }[];
// //     // _projects: { projectId?: number | null; projectName?: string | null }[];
// //     _projects: { id?: string | number | null; name?: string | null }[];
// //   };
// // }
//
// /*
// GET
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users/peyman_prj_admin
// Request Method: GET
// Payload X
// Response:
// {
// "id":87862,
// "login":"peyman_prj_admin",
// "firstName":null,
// "lastName":null,
// "email":"peyman+prjadmin@thehyve.nl",
// "activated":false,
// "langKey":"en",
// "createdBy":"system","createdDate":"2023-02-24T14:42:47.546Z","lastModifiedBy":"system","lastModifiedDate":"2023-02-24T14:42:47.546Z",
// "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
// "authorities":["ROLE_SYS_ADMIN"]}
// */
//
// /*
// GET
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users?page=0&size=20&sort=id,asc
// Request Method: GET
// Status Code: 200
// QueryParams: page:0 size:20 sort:id,asc
// Payload: X
// Response: [
//   {
//   "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
//   "authorities":["ROLE_SYS_ADMIN"]
//   },
//   {
//   "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
//   "authorities":["ROLE_SYS_ADMIN"]
//   },
//   {"roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],"authorities":["ROLE_SYS_ADMIN"]},
//   {"roles":[{"id":62607,"organizationId":62652,"organizationName":"OrgAdminA","authorityName":"ROLE_ORGANIZATION_ADMIN"},{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":76801,"projectId":62702,"projectName":"testproj1","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":76803,"projectId":73301,"projectName":"testme","authorityName":"ROLE_PROJECT_ADMIN"},{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":62607,"organizationId":62652,"organizationName":"OrgAdminA","authorityName":"ROLE_ORGANIZATION_ADMIN"},{"id":6,"organizationId":1,"organizationName":"main","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":80701,"projectId":62703,"projectName":"ProjOrgA","authorityName":"ROLE_PROJECT_ADMIN"},{"id":62602,"projectId":43101,"projectName":"test","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}]
//  */
//
// /*
// DELETE:
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users/peyman_prj_admin
// Request Method: DELETE
// P: X
// R: X
//  */
//
// /*
// UPDATE
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/authorities
// Request Method: GET
// [{"name":"ROLE_SYS_ADMIN","scope":"GLOBAL"},{"name":"ROLE_ORGANIZATION_ADMIN","scope":"ORGANIZATION"},{"name":"ROLE_PROJECT_ADMIN","scope":"PROJECT"},{"name":"ROLE_PROJECT_OWNER","scope":"PROJECT"},{"name":"ROLE_PROJECT_AFFILIATE","scope":"PROJECT"},{"name":"ROLE_PROJECT_ANALYST","scope":"PROJECT"}]
// */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: PUT
// P: {"roles":[{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}
// R: {"roles":[{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}
//  */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: PUT
// P: {"roles":[],"authorities":["ROLE_PROJECT_ADMIN"]}
// R: {"roles":[],"authorities":[]}
//  */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: PUT
// P: {"roles":[{"authorityName":"ROLE_SYS_ADMIN"}],"authorities":[]}
// R: {"roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],"authorities":["ROLE_SYS_ADMIN"]}
//  */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: PUT
// P: {"roles":[{"authorityName":"ROLE_ORGANIZATION_ADMIN","organizationId":76351,"organizationName":"new"}],"authorities":[]}
// R: {"roles":[{"id":80151,"organizationId":76351,"organizationName":"new","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]}
// */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: PUT
// P: {"roles":[{"authorityName":"ROLE_PROJECT_ADMIN","projectId":43101,"projectName":"test"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]}
// R: {"roles":[{"id":62602,"projectId":43101,"projectName":"test","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}
// */
//
// /*
// Request URL: https://radar-k3s-test.thehyve.net/managementportal/api/users
// Request Method: POST
// Status Code: 201
// P: {
//   "authorities":[],
//   "roles":[
//     {"authorityName":"ROLE_ORGANIZATION_ADMIN", "organizationId":1, "organizationName":"main"},
//     {"authorityName":"ROLE_SYS_ADMIN"},
//     {"authorityName":"ROLE_PROJECT_ADMIN","projectId":43101,"projectName":"test"}
//   ]
// }
//
// R:
// {
//   "roles":[
//     {"id":1,"users":null,"project":null,"organization":null,"authority":{"name":"ROLE_SYS_ADMIN"},"role":"SYS_ADMIN"},
//     {"id":6,"users":null,"project":null,
//       "organization":{"id":1,"name":"main","description":"The main organization","location":"-","projects":null},
//       "authority":{"name":"ROLE_ORGANIZATION_ADMIN"},"role":"ORGANIZATION_ADMIN"
//     },
//     {
//       "id":62602,"users":null,
//       "project":{"id":43101,"projectName":"test","description":"Test project","organizationName":null,
//       "organization":{"id":62652,"name":"OrgAdminA","description":"test","location":"test","projects":null},"location":"Utrecht","startDate":null,"projectStatus":null,"endDate":null,"roles":null,"sourceTypes":null,"attributes":{},"groups":null},
//       "organization":null,
//       "authority":{"name":"ROLE_PROJECT_ADMIN"},"role":"PROJECT_ADMIN"
//     }
//   ],
//   "authorities":[{"name":"ROLE_PROJECT_ADMIN"},{"name":"ROLE_ORGANIZATION_ADMIN"},{"name":"ROLE_SYS_ADMIN"}]
// }
//  */
//
// /*
// Create=R: {
//   "roles":[
//   {"id":1,"users":null,"project":null,"organization":null,"authority":{"name":"ROLE_SYS_ADMIN"},"role":"SYS_ADMIN"},
//   {"id":6,"users":null,"project":null,
//     "organization":{"id":1,"name":"main","description":"The main organization","location":"-","projects":null},
//     "authority":{"name":"ROLE_ORGANIZATION_ADMIN"},"role":"ORGANIZATION_ADMIN"
//   },
//   {
//     "id":62602,"users":null,
//     "project":{"id":43101,"projectName":"test","description":"Test project","organizationName":null,
//       "organization":{"id":62652,"name":"OrgAdminA","description":"test","location":"test","projects":null},"location":"Utrecht","startDate":null,"projectStatus":null,"endDate":null,"roles":null,"sourceTypes":null,"attributes":{},"groups":null},
//     "organization":null,
//     "authority":{"name":"ROLE_PROJECT_ADMIN"},"role":"PROJECT_ADMIN"
//   }
// ],
//   "authorities":[{"name":"ROLE_PROJECT_ADMIN"},{"name":"ROLE_ORGANIZATION_ADMIN"},{"name":"ROLE_SYS_ADMIN"}]
// }
//
// R: {"roles":[{"id":62602,"projectId":43101,"projectName":"test","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}
// R: {"roles":[{"id":80151,"organizationId":76351,"organizationName":"new","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]}
// R: {"roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],"authorities":["ROLE_SYS_ADMIN"]}
// R: {"roles":[],"authorities":[]}
// R: {"roles":[{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}
// Response:
// {
//   "id":87862,
//   "login":"peyman_prj_admin",
//   "firstName":null,
//   "lastName":null,
//   "email":"peyman+prjadmin@thehyve.nl",
//   "activated":false,
//   "langKey":"en",
//   "createdBy":"system","createdDate":"2023-02-24T14:42:47.546Z","lastModifiedBy":"system","lastModifiedDate":"2023-02-24T14:42:47.546Z",
//   "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
//   "authorities":["ROLE_SYS_ADMIN"]}
//
// Response: [
//   {
//     "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
//     "authorities":["ROLE_SYS_ADMIN"]
//   },
//   {
//     "roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],
//     "authorities":["ROLE_SYS_ADMIN"]
//   },
//   {"roles":[{"id":1,"authorityName":"ROLE_SYS_ADMIN"}],"authorities":["ROLE_SYS_ADMIN"]},
//   {"roles":[{"id":62607,"organizationId":62652,"organizationName":"OrgAdminA","authorityName":"ROLE_ORGANIZATION_ADMIN"},{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":76801,"projectId":62702,"projectName":"testproj1","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":76803,"projectId":73301,"projectName":"testme","authorityName":"ROLE_PROJECT_ADMIN"},{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":62603,"organizationId":62651,"organizationName":"test","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":62607,"organizationId":62652,"organizationName":"OrgAdminA","authorityName":"ROLE_ORGANIZATION_ADMIN"},{"id":6,"organizationId":1,"organizationName":"main","authorityName":"ROLE_ORGANIZATION_ADMIN"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]},
//   {"roles":[{"id":76802,"projectId":75851,"projectName":"STAGING_PROJECT","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]},
//   {"roles":[{"id":80701,"projectId":62703,"projectName":"ProjOrgA","authorityName":"ROLE_PROJECT_ADMIN"},{"id":62602,"projectId":43101,"projectName":"test","authorityName":"ROLE_PROJECT_ADMIN"}],"authorities":["ROLE_PROJECT_ADMIN"]}]
//
// */
//
// // const payload1 = {
// //   authorities: [],
// //   roles: [
// //     {
// //       authorityName: 'ROLE_ORGANIZATION_ADMIN',
// //       organizationId: 1,
// //       organizationName: 'main',
// //     },
// //     { authorityName: 'ROLE_SYS_ADMIN' },
// //     {
// //       authorityName: 'ROLE_PROJECT_ADMIN',
// //       projectId: 43101,
// //       projectName: 'test',
// //     },
// //   ],
// // };
// //
// // P: {"roles":[],"authorities":["ROLE_PROJECT_ADMIN"]}
// // P: {"roles":[{"authorityName":"ROLE_SYS_ADMIN"}],"authorities":[]}
// // P: {"roles":[{"authorityName":"ROLE_ORGANIZATION_ADMIN","organizationId":76351,"organizationName":"new"}],"authorities":[]}
// // P: {"roles":[{"authorityName":"ROLE_PROJECT_ADMIN","projectId":43101,"projectName":"test"}],"authorities":["ROLE_ORGANIZATION_ADMIN"]}
// //
