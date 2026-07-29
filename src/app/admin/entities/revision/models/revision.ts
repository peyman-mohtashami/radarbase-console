export interface RevisionDto {
  id: number;
  author: string;
  timestamp: string;
  revisionType: string;
  entity: unknown;
  changes: unknown;
}

export type AppRevision = RevisionDto & {name: string; search: string};
