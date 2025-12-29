export interface RadarAudit {
  data: Map<string, string>;
  principal: string;
  timestamp: string;
  type: string;
}

export interface AppAudit extends RadarAudit {
  _name: string;
  _search: string;
}
