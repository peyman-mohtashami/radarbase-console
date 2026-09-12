import {effect, inject, Injectable, signal} from "@angular/core";
import { DOCUMENT } from "@angular/common";

import {ConfigurationService} from '../../configuration/services/configuration.service';

type ThemeMode = 'light' | 'dark';

const THEME_STORAGE_KEY = 'theme';
const CSS_VAR_PREFIX = '--mat-sys';

@Injectable({providedIn: 'root'})
export class ThemeService {
  private readonly configurationService = inject(ConfigurationService);
  private readonly document = inject(DOCUMENT);

  private readonly _mode = signal<ThemeMode>(this.getStoredMode());
  readonly isLightTheme = () => this._mode() === 'light';

  constructor() {
    effect(() => {
      const mode = this._mode();
      this.document.documentElement.classList.toggle('dark', mode === 'dark');
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    });
  }

  init(): void {
    const { light, dark } = this.configurationService.customBranding().theme;
    this.applyThemeVariables(light, '');
    this.applyThemeVariables(dark, '-dark');
  }

  toggleTheme(): void {
    this._mode.update((mode) => (mode === 'light' ? 'dark' : 'light'));
  }

  private getStoredMode(): ThemeMode {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  }

  private applyThemeVariables(colors: Record<string, string>, suffix: string): void {
    const root = this.document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`${CSS_VAR_PREFIX}-${key}${suffix}`, value);
      root.style.setProperty(`${CSS_VAR_PREFIX}-${key}-rgb${suffix}`, hexToRgb(value));
    });
  }
}

export function hexToRgb(hex: string): string {
  const normalized = hex.replace(/^#/, '');
  const full = normalized.length === 3
    ? normalized.split('').map((c) => c + c).join('')
    : normalized;

  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `${r}, ${g}, ${b}`;
}
