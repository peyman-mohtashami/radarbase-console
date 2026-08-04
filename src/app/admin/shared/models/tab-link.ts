export interface TabLink {
  path: string;
  label: string;
  permissions?: {role: string, entityName?: string}[];
}
