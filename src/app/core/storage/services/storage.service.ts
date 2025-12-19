import { Injectable } from '@angular/core';
import {TokenData} from '../../auth/models/auth.model';

export enum AuthStorageItem {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken',
  USER = 'user',
  LAST_LOCATION = 'lastLocation',
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  // static setAuthResponse(authResponse: AuthResponse): void {
  //   this.setAccessToken(authResponse.access_token);
  //   this.setRefreshToken(authResponse.refresh_token);
  // }

  static setAuthTokenData(tokenData: TokenData): void {
    this.setAccessToken(tokenData.access_token);
    this.setRefreshToken(tokenData.refresh_token);
  }

  // static clearAuth(): void {
  //   this.clearAccessToken();
  //   this.clearRefreshToken();
  // }

  static getAccessToken(): string {
    return <string>localStorage.getItem(AuthStorageItem.ACCESS_TOKEN);
  }

  static setAccessToken(token: string): void {
    localStorage.setItem(AuthStorageItem.ACCESS_TOKEN, token);
  }

  static clearAccessToken(): void {
    localStorage.removeItem(AuthStorageItem.ACCESS_TOKEN);
  }

  // static getRefreshToken(): string {
  //   return <string>localStorage.getItem(AuthStorageItem.REFRESH_TOKEN);
  // }

  static setRefreshToken(token: string): void {
    localStorage.setItem(AuthStorageItem.REFRESH_TOKEN, token);
  }

  static clearRefreshToken(): void {
    localStorage.removeItem(AuthStorageItem.REFRESH_TOKEN);
  }

  // static getUser(): Observable<ManagementPortalUser | null> {
  //   const user = localStorage.getItem(AuthStorageItem.USER);
  //   return user ? of(JSON.parse(user)) : of(null);
  // }

  // static setUser(user: ManagementPortalUser): void {
  //   localStorage.setItem(AuthStorageItem.USER, JSON.stringify(user));
  // }

  // static clearUser(): void {
  //   localStorage.removeItem(AuthStorageItem.USER);
  // }

  static getLastLocation(): string {
    return <string>localStorage.getItem(AuthStorageItem.LAST_LOCATION);
  }

  // static setLastLocation(location: Location): void {
  //   const lastLocation = location.href.replace(location.origin, '');
  //   if (lastLocation !== '/login') {
  //     localStorage.setItem(AuthStorageItem.LAST_LOCATION, lastLocation);
  //   }
  // }

  static setLastLocation(location: string): void {
    // const lastLocation = location.href.replace(location.origin, '');
    if (location !== '/login') {
      localStorage.setItem(AuthStorageItem.LAST_LOCATION, location);
    }
  }

  static clearLastLocation(): void {
    localStorage.removeItem(AuthStorageItem.LAST_LOCATION);
  }
}
