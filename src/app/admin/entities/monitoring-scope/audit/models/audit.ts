export interface AuditDto {
  data: Map<string, string>;
  principal: string;
  timestamp: string;
  type: string;
}

export type AppAudit = AuditDto & {
  search: string
};
