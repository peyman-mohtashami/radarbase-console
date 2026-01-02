export interface RadarRevision {
  id: number | string;
  author: string;
  timestamp: Date;
  revisionType: string;
  entity: unknown;
  changes: unknown;
}

export interface AppRevision extends RadarRevision {
  _name: string;
  _search: string;
}
