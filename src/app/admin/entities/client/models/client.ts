export interface RadarClient extends Record<string, string| boolean | number | string[] | Record<string, string | boolean> | undefined>{
  clientId: string;
  clientSecret?: string;
  scope?: string[];
  resourceIds: string[];
  authorizedGrantTypes: string[];
  autoApproveScopes?: string[];
  accessTokenValiditySeconds?: number;
  refreshTokenValiditySeconds?: number;
  authorities?: string[];
  additionalInformation: Record<string, string | boolean>;
  registeredRedirectUri?: string[];
}

export interface AppClient extends RadarClient, Record<string, boolean | string | number | string[] | Record<string, string | boolean> | undefined> {
  _name: string;
  _authorizedGrantTypes: Record<string, boolean>;
  _dynamic_registration?: boolean;
  _search: string;
}
