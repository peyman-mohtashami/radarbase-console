import {inject, Injectable, OnDestroy} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export const LAST_LOCATION = 'lastLocation'

@Injectable({ providedIn: 'root' })
export class LastUrlService implements OnDestroy {
  private router = inject(Router);
  private sub: Subscription;

  constructor() {
    this.sub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        if (e.urlAfterRedirects !== '/auth/login') {
          localStorage.setItem(LAST_LOCATION, e.urlAfterRedirects);
        }
      });
  }

  static getLastUrl(): string | null {
    return localStorage.getItem(LAST_LOCATION);
  }

  static clearLastUrl(): void {
    localStorage.removeItem(LAST_LOCATION);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
