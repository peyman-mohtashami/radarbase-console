export interface RadarLog {
  name: string;
  level: string;
}

export interface AppLog extends RadarLog {
  _name: string;
  _search: string;
}
