import {inject, Injectable, signal} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import tinycolor from "tinycolor2";

import {ThemeConfig} from "../models/theme.model";
import {AppCustomizationService} from "../../app-customization/services/app-customization.service";
import {DEFAULT_APP_CUSTOMIZATION} from "../../app-customization/consts/default-app-customization.const";

@Injectable({providedIn: 'root'})
export class ThemeService {
  private readonly appCustomizationService  = inject(AppCustomizationService);
  private readonly document = inject(DOCUMENT);

  private readonly _isLightTheme = signal<boolean>(true);
  readonly isLightTheme = this._isLightTheme.asReadonly();

  init(): void {
    const isLight = localStorage.getItem('theme') !== 'dark';
    this._isLightTheme.set(isLight);
    this.document.documentElement.classList.toggle('dark', !this.isLightTheme());

    const themeCustomization = this.appCustomizationService.themeCustomization();
    const validatedThemeCustomization = validateTheme(themeCustomization);
    setTheme(validatedThemeCustomization);
  }

  toggleTheme(): void {
    this._isLightTheme.set(!this.isLightTheme());
    localStorage.setItem('theme', this.isLightTheme() ? 'light' : 'dark');
    this.document.documentElement.classList.toggle('dark', !this.isLightTheme());
  }
}

export function setTheme(themeConfig: ThemeConfig): void {
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


export function validateTheme(themeConfig: ThemeConfig, defaultTheme: ThemeConfig = DEFAULT_APP_CUSTOMIZATION.theme): ThemeConfig {
  const {light, dark} = themeConfig;
  const {light: defaultLight, dark: defaultDark} = defaultTheme;

  return {
    light: {
      "primary": getValidateColor(light.primary, defaultLight.primary),
      "on-primary": getValidateColor(light["on-primary"], defaultLight["on-primary"]),
      "accent": getValidateColor(light.accent, defaultLight.accent),
      "on-accent": getValidateColor(light["on-accent"], defaultLight["on-accent"]),
      "tertiary": getValidateColor(light.tertiary, defaultLight.tertiary),
      "on-tertiary": getValidateColor(light["on-tertiary"], defaultLight["on-tertiary"]),
    },
    dark: {
      "primary": getValidateColor(dark.primary, defaultDark.primary),
      "on-primary": getValidateColor(dark["on-primary"], defaultDark["on-primary"]),
      "accent": getValidateColor(dark.accent, defaultDark.accent),
      "on-accent": getValidateColor(dark["on-accent"], defaultDark["on-accent"]),
      "tertiary": getValidateColor(dark.tertiary, defaultDark.tertiary),
      "on-tertiary": getValidateColor(dark["on-tertiary"], defaultDark["on-tertiary"]),
    }
  };
}

export function getValidateColor(color: string | undefined, defaultColor: string | undefined = '#000000') {
  return color && tinycolor(color).isValid() ? color : defaultColor;
}
