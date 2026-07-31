import {GroupDto} from '../../../project-group/models/group';

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

export type CreateConfigDto = ConfigDto;

export type UpdateConfigDto = ConfigDto;

export type AppConfig = ConfigDto & {search: string};
