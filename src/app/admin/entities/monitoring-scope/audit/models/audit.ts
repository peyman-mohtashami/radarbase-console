export interface AuditDto {
  data: Map<string, string>;
  principal: string;
  timestamp: string;
  type: string;
}

export type AppAudit = AuditDto & {name: string; search: string};
