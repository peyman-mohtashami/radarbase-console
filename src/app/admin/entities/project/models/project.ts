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

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  PLANNING: 'Planning',
  ONGOING: 'Ongoing',
  ENDED: 'Ended',
};

export function toProjectStatus(value: string): ProjectStatus | undefined {
  return (PROJECT_STATUSES as readonly string[]).includes(value)
    ? value as ProjectStatus
    : undefined;
}
