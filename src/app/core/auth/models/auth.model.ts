export enum RADAR_ROLES {
  SYS_ADMIN = 'ROLE_SYS_ADMIN',
  ORGANIZATION_ADMIN = 'ROLE_ORGANIZATION_ADMIN',
  PROJECT_ADMIN = 'ROLE_PROJECT_ADMIN',
}

export interface TokenDataDto {
  access_token: string;
  expires_in: number;
  grant_type: string;
  iat: number;
  iss: string;
  jti: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  sub: string;
  sources: string[];
  roles: string[];
}

export interface AppAuthCredential {
  username: string;
  password: string;
  remember?: boolean;
}
