// import { BaseDef } from './base.model';

export interface RadarRevision {
  id: number | string;
  author: string;
  timestamp: Date;
  revisionType: string;
  entity: any;
  changes: any;
}

// export interface RadarRevisionDTO
//   extends Record<string, string | number | Date | any | undefined> {
//   id: number | string;
//   author: string;
//   timestamp: Date;
//   revisionType: string;
//   entity: any;
//   changes: any;
// }
//
// export interface RadarRevisionDef extends BaseDef, RadarRevisionDTO {}
