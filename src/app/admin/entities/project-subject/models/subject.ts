import {ProjectDto} from '../../project/models/project';
import {RoleDto} from '../../user/models/user';
import {SourceDto} from '../../project-source/models/source';

export interface SubjectDto {
  id: number;
  login: string;
  externalLink?: string;
  externalId?: string;
  createdBy?: string;
  createdDate?: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  group?: string;
  password?: string;
  personName?: string;
  project?: ProjectDto;
  sources?: SourceDto[];
  attributes?: Record<string, string>;
  status?: SubjectStatus;
  roles?: RoleDto[];
  userId: string;
  serviceUserId?: string;
  sourceId?: string;
  startDate?: string;
  endDate?: string;
  sourceType: string;
  isAuthorized?: boolean;
  registrationCreatedAt?: string;
  hasValidToken?: boolean;
  timesReset?: number;
  version?: string;
}


export interface CreateSubjectDto {
  externalLink?: string;
  externalId?: string;
  dateOfBirth?: string;
  group: string | null;
  personName?: string;
  project: ProjectDto;
  sources: unknown[];
  status?: number;
  attributes?: Record<string, string>;
}

export interface UpdateSubjectDto {
  id: number;
  login: string;
  externalLink?: string;
  externalId?: string;
  dateOfBirth?: string;
  group: string | null;
  personName?: string;
  project: ProjectDto;
  sources: unknown[];
  status?: string;
  attributes?: Record<string, string>;
}

export type AppSubject = SubjectDto & {name: string; search: string};

export enum SubjectStatus {
  DEACTIVATED = 'DEACTIVATED',
  ACTIVATED = 'ACTIVATED',
  DISCONTINUED = 'DISCONTINUED',
  INVALID = 'INVALID',
}
