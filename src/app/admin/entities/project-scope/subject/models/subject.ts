import {RadarProject} from '../../../main-scope/project/models/project';
import {RadarSource} from '../../source/models/source';
import {RadarRole} from '../../../main-scope/user/models/user';

export interface RadarSubject {
  id: number | string;
  login: string;
  externalLink?: string;
  externalId?: string;
  createdBy?: string;
  createdDate?: Date;
  dateOfBirth?: Date;
  enrollmentDate?: Date;
  lastModifiedBy?: string;
  lastModifiedDate?: Date;
  group?: string;
  password?: string;
  personName?: string;
  project?: RadarProject;
  sources?: RadarSource[];
  attributes?: Record<string, string>;
  status?: SubjectStatus;
  roles?: RadarRole[];
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

export interface AppSubject extends RadarSubject {
  _name: string;
}


export enum SubjectStatus {
  DEACTIVATED = 'DEACTIVATED',
  ACTIVATED = 'ACTIVATED',
  DISCONTINUED = 'DISCONTINUED',
  INVALID = 'INVALID',
}
