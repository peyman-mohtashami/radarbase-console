export interface RadarLog extends Record<string, string> {
  name: string;
  level: string;
}

export interface AppLog extends RadarLog {
  _name: string;
  _search: string;
}
