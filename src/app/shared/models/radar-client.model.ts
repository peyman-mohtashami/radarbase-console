// export interface RadarClient {
//   clientId: string;
//   clientSecret?: string;
//   scope?: string[];
//   resourceIds: string[];
//   authorizedGrantTypes: string[];
//   autoApproveScopes?: string[];
//   accessTokenValiditySeconds?: number;
//   refreshTokenValiditySeconds?: number;
//   authorities?: string[];
//   additionalInformation: Record<string, string | boolean>;
//   registeredRedirectUri?: string[];
// }

export interface RadarPairInfo {
  tokenName: string;
  tokenUrl: string;
  baseUrl: string;
  timeout: number;
  timesOutAt: string;
  timeOutDate?: string;
  timeoutString?: string;
}
