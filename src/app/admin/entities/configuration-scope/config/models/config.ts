export interface ConfigBundleDto {
  clientId: string;
  scope: string;
  config: ConfigDto[];
  defaults?: ConfigDto[];
}

export interface ConfigDto {
  name: string;
  value: string;
  default?: string;
  scope?: string;
}

export interface AppConfig extends ConfigDto {
  id: string;
  _name: string;
  _search?: string;
}
