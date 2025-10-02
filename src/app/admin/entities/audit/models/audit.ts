export interface RadarAudit extends Record<string, any> {
  data: Map<string, string>;
  principal: string;
  timestamp: string;
  type: string;
}

export interface AppAudit extends RadarAudit {
  _name: string;
  _search: string;
}
