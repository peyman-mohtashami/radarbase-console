export interface LogDto {
  name: string;
  level: string;
}

export type AppLog = LogDto & {name: string; search: string};
