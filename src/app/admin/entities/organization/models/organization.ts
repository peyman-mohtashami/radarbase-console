import {ProjectDto} from '../../project/models/project';

export interface OrganizationDto {
  id: number;
  name: string;
  description?: string;
  location?: string;
  projects?: ProjectDto[];
}

export type CreateOrganizationDto = Partial<Omit<OrganizationDto, 'id' | 'projects'>>;

export type UpdateOrganizationDto = Partial<Omit<OrganizationDto, 'projects'>>;

export type AppOrganization = OrganizationDto & {search: string};
