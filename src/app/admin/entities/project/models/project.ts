import {OrganizationDto} from '../../organization/models/organization';
import {SourceTypeDto} from '../../source-type/models/source-type';
import {GroupDto} from '../../project-group/models/group';

export interface ProjectDto {
  id: number;
  projectName: string;
  description?: string;
  organizationName?: string;
  organization: OrganizationDto;
  location?: string;
  startDate?: string;
  projectStatus?: ProjectStatus;
  endDate?: string;
  attributes?: Record<string, string>;
  sourceTypes?: SourceTypeDto[];
  groups?: GroupDto[];
  humanReadableProjectName?: string;
  persistentTokenTimeout?: number;
}

export type CreateProjectDto = Partial<Omit<ProjectDto, 'id' | 'persistentTokenTimeout' | 'groups'>>;

export type UpdateProjectDto = Partial<Omit<ProjectDto, 'persistentTokenTimeout' | 'groups'>>;

export type AppProject = ProjectDto & {name: string; search: string};

export const PROJECT_STATUSES = ['PLANNING', 'ONGOING', 'ENDED'] as const;
export type ProjectStatus = typeof PROJECT_STATUSES[number];

export const PROJECT_STATUS_LABELS = {
  PLANNING: 'Planning',
  ONGOING: 'Ongoing',
  ENDED: 'Ended',
} satisfies Record<ProjectStatus, string>;

const PROJECT_STATUS_SET: ReadonlySet<string> = new Set(PROJECT_STATUSES);

export function isProjectStatus(value: string): value is ProjectStatus {
  return PROJECT_STATUS_SET.has(value);
}

export function toProjectStatus(value: string): ProjectStatus | undefined {
  return isProjectStatus(value) ? value : undefined;
}
