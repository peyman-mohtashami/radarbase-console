import {ProjectDto} from '../../../project/models/project';

export interface ConfigBundleDto {
  clientId: string;
  scope: string;
  config: ConfigDto[];
  defaults?: ConfigDto[];
}

export interface ConfigDto {
  name: string;
  value: string;
  default?: string;
  scope?: string;
}

export type CreateProjectDto = Partial<Omit<ProjectDto, 'id' | 'persistentTokenTimeout' | 'groups'>>;

export type UpdateProjectDto = Partial<Omit<ProjectDto, 'persistentTokenTimeout' | 'groups'>>;

export type AppConfig = ConfigDto & {id: string; name: string; search: string};
