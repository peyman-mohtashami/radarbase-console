export interface RadarConfigBundle {
  clientId: string;
  scope: string;
  config: RadarConfig[];
  defaults?: RadarConfig[];
}

export interface RadarConfig extends Record<string, any> {
  name: string;
  value: string;
  default?: string;
  scope?: string;
}

export interface AppConfig extends RadarConfig {
  id: string;
  _name: string;
  // _changed?: boolean;
  _search?: string;
}
