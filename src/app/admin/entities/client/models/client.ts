export interface RadarClient {
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

export interface AppClient extends RadarClient {
  id: string;
  _name: string;
  _authorizedGrantTypes: Record<string, boolean | null>;
  _search: string;
  _dynamic_registration: boolean | null;
}
