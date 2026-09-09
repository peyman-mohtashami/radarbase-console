export interface ClientDto {
  clientId: string;
  clientSecret: string;
  scope?: string[];
  resourceIds: string[];
  authorizedGrantTypes: string[];
  autoApproveScopes?: string[];
  accessTokenValiditySeconds: number;
  refreshTokenValiditySeconds: number;
  authorities?: string[];
  additionalInformation: Record<string, string | boolean>;
  registeredRedirectUri?: string[];
}

export type CreateClientDto = ClientDto;

export type UpdateClientDto = ClientDto;

export type AppClient = ClientDto & {
  search: string;
  uiAuthorizedGrantTypes: Record<string, boolean>;
  uiDynamicRegistration: boolean
};

export interface RadarPairInfo {
  tokenName: string;
  tokenUrl: string;
  baseUrl: string;
  timeout: number;
  timesOutAt: string;
  timeOutDate?: string;
  timeoutString?: string;
}
