export interface RadarClient extends Record<string, string | boolean | number | string[] | Record<string, string | boolean | null> | null>{
  clientId: string;
  clientSecret: string | null;
  scope: string[] | null;
  resourceIds: string[];
  authorizedGrantTypes: string[];
  autoApproveScopes: string[] | null;
  accessTokenValiditySeconds: number | null;
  refreshTokenValiditySeconds: number | null;
  authorities: string[] | null;
  additionalInformation: Record<string, string | boolean | null>;
  registeredRedirectUri: string[] | null;
}

export interface RadarClient2 extends Record<string, string | boolean | number | string[] | Record<string, string | boolean | null> | undefined>{
  clientId: string;
  clientSecret?: string;
  scope?: string[];
  resourceIds: string[];
  authorizedGrantTypes: string[];
  autoApproveScopes?: string[];
  accessTokenValiditySeconds?: number;
  refreshTokenValiditySeconds?: number;
  authorities?: string[];
  additionalInformation: Record<string, string | boolean | null>;
  registeredRedirectUri?: string[];
}

export interface AppClient extends RadarClient {
  _name: string;
  _authorizedGrantTypes: Record<string, boolean | null>;
  _search: string;
  _dynamic_registration: boolean | null;
}
