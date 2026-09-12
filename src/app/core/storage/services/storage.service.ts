import { Injectable } from '@angular/core';
import {TokenDataDto} from '../../auth/models/auth.model';

export enum AuthStorageItem {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
}

@Injectable({ providedIn: 'root' })
export class StorageService {

  static setAuthTokenData(tokenData: TokenDataDto): void {
    this.setAccessToken(tokenData.access_token);
    this.setRefreshToken(tokenData.refresh_token);
  }

  static clearAuthTokenData() {
    this.clearAccessToken();
    this.clearRefreshToken();
  }

  static getAccessToken(): string {
    return localStorage.getItem(AuthStorageItem.ACCESS_TOKEN) as string;
  }

  static setAccessToken(token: string): void {
    localStorage.setItem(AuthStorageItem.ACCESS_TOKEN, token);
  }

  static clearAccessToken(): void {
    localStorage.removeItem(AuthStorageItem.ACCESS_TOKEN);
  }

  static setRefreshToken(token: string): void {
    localStorage.setItem(AuthStorageItem.REFRESH_TOKEN, token);
  }

  static clearRefreshToken(): void {
    localStorage.removeItem(AuthStorageItem.REFRESH_TOKEN);
  }
}
