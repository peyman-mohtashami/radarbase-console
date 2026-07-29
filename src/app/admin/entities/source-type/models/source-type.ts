import {SourceDataDto} from '../../source-data/models/source-data';

export interface SourceTypeDto {
  id: number;
  producer: string;
  model: string;
  catalogVersion: string;
  sourceTypeScope: SourceTypeScope;
  sourceDataId?: number;
  sourceData?: SourceDataDto[];
  projectId?: number;
  canRegisterDynamically?: boolean;
  name?: string;
  description?: string;
  assessmentType?: string;
  appProvider?: string;
}

export type CreateSourceTypeDto = Partial<Omit<SourceTypeDto, 'id' | 'sourceDataId' | 'projectId'>>;

export type UpdateSourceTypeDto = Partial<Omit<SourceTypeDto, 'sourceDataId' | 'projectId'>>;

export type AppSourceType = SourceTypeDto & {search: string};

export enum SourceTypeScope {
  ACTIVE = 'ACTIVE',
  PASSIVE = 'PASSIVE',
}

export function toSourceTypeScope(value: string): SourceTypeScope {
  switch (value) {
    case SourceTypeScope.ACTIVE:
      return SourceTypeScope.ACTIVE;
    case SourceTypeScope.PASSIVE:
      return SourceTypeScope.PASSIVE;
    default:
      return SourceTypeScope.PASSIVE;
  }

}
