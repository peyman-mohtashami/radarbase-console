export interface GroupDto {
  id: number;
  name: string;
  projectId: number;
  projectName: string;
}

export type CreateGroupDto = Partial<Omit<GroupDto, 'id'>>;

export type UpdateGroupDto = GroupDto

export type AppGroup = GroupDto & {search: string};
