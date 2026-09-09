export interface LogDto {
  name: string;
  level: string;
}

export type AppLog = LogDto & {
  search: string
};
