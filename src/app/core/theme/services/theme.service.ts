import {inject, Injectable, signal} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import {ConfigurationService} from '../../configuration/services/configuration.service';
import {ThemesConfiguration} from '../../configuration/models/custom-configuration.model';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private readonly appCustomizationService  = inject(ConfigurationService);
  private readonly document = inject(DOCUMENT);

  private readonly _isLightTheme = signal<boolean>(true);
  readonly isLightTheme = this._isLightTheme.asReadonly();

  init(): void {
    const isLight = localStorage.getItem('theme') !== 'dark';
    this._isLightTheme.set(isLight);
    this.document.documentElement.classList.toggle('dark', !this.isLightTheme());

    const themeCustomization = this.appCustomizationService.themeCustomization();
    setTheme(themeCustomization);
  }

  toggleTheme(): void {
    this._isLightTheme.set(!this.isLightTheme());
    localStorage.setItem('theme', this.isLightTheme() ? 'light' : 'dark');
    this.document.documentElement.classList.toggle('dark', !this.isLightTheme());
  }
}

export function setTheme(themeConfig: ThemesConfiguration): void {
  const root = document.documentElement;

  Object.entries(themeConfig.light).forEach(([key, value]) => {
    root.style.setProperty(`--mat-sys-${key}`, value);
    root.style.setProperty(`--mat-sys-${key}-rgb`, hexToRgb(value));
  });

  Object.entries(themeConfig.dark).forEach(([key, value]) => {
    root.style.setProperty(`--mat-sys-${key}-dark`, value);
    root.style.setProperty(`--mat-sys-${key}-rgb-dark`, hexToRgb(value));
  });
}

export function hexToRgb(hex: string): string {
  hex = hex.replace(/^#/, '');

  // Expand short form (e.g., 'abc') to full form (e.g., 'aabbcc')
  if (hex.length === 3) {
    hex = hex.split('').map((c) => c + c).join('');
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `${r}, ${g}, ${b}`;
}
