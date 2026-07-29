// export interface RadarRestSourceSubjectDTO
//   extends Record<string, string | number | boolean | undefined> {
//   id?: string;
//   userId: string;
//   projectId: string;
//   externalId?: string;
//   serviceUserId?: string;
//   sourceId?: string;
//   startDate?: string;
//   endDate?: string;
//   sourceType: string;
//   isAuthorized?: boolean;
//   registrationCreatedAt?: string;
//   hasValidToken?: boolean;
//   timesReset?: number;
//   version?: string;
// }
//
// export interface RadarRestSourceSubjects {
//   users: RadarRestSourceSubjectDTO[];
//   metadata: Page;
// }
//
// export interface Page {
//   pageNumber: number;
//   pageSize: number;
//   totalElements: number;
// }
//
// export interface RadarRestSourceSubjectRequest {
//   projectId: string;
//   userId: string;
//   sourceId?: string;
//   startDate: string;
//   endDate?: string;
//   sourceType: string;
// }
//
// export interface RadarRestSourceSubjectResponse {
//   id: string;
//   projectId: string;
//   userId: string;
//   sourceId: string;
//   startDate: string;
//   endDate?: string;
//   sourceType: string;
//   createdAt: string;
//   humanReadableUserId: string;
//   externalId: string;
//   serviceUserId?: string;
//   isAuthorized: boolean;
//   timesReset: number;
//   version: string;
// }
//
// export interface RadarRegistrationCreateRequest {
//   userId: string; // matches RestSourceUserResponse.id
//   persistent?: boolean; // set to true to get a long-living token
// }
//
// export interface RadarRegistrationResponse {
//   token: string;
//   secret?: string; // only defined if the registration is persistent
//   userId: string;
//   authEndpointUrl?: string; // only defined if the registration is not persistent
//   expiresAt: string;
//   persistent: boolean;
//   project?: any;
//   sourceType?: string;
// }
//
// export interface RadarRegistrationRequest {
//   secret: string;
// }
//
// export interface RadarAuthorizeRequest {
//   code?: string;
//   oauth_token?: string;
//   oauth_verifier?: string;
//   oauth_token_secret?: string;
// }
