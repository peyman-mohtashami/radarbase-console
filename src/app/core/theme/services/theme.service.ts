import {inject, Injectable} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import {Observable, of, tap} from "rxjs";
import {catchError, map, take} from "rxjs/operators";
import tinycolor from "tinycolor2";

import {ThemeConfig} from "../models/theme.model";
import { DEFAULT_THEME } from "../consts/default-theme.const";
import {Store} from "@ngrx/store";
import {isLightTheme} from "../../store/ui.selectors";
import {themeConfig} from "../../config/store/config.selectors";

@Injectable({providedIn: 'root'})
export class ThemeService {
  private readonly store = inject(Store);
  private readonly document = inject(DOCUMENT);

  /**
   * Initializes the theme on application startup.
   * Sets light/dark class and CSS variables.
   */
  init(): Observable<ThemeConfig> {
    this.store.select(isLightTheme).pipe(take(1)).subscribe(isLight => {
      this.document.documentElement.classList.toggle('dark', !isLight);
    });

    return this.store.select(themeConfig).pipe(
      take(1),
      map(themeConfig => this.validateTheme(themeConfig)),
      catchError(() => of(DEFAULT_THEME)),
      tap((theme) => setTheme(theme)),
    )
  }

  /**
   * Validates the given theme configuration, falling back to defaults for invalid colors.
   * @returns Validated theme configuration
   * @param themeConfig
   */
  protected validateTheme(themeConfig: ThemeConfig): ThemeConfig {
    const lightPrimary = tinycolor(themeConfig?.light?.["primary"]).isValid() ? themeConfig?.light?.["primary"] : DEFAULT_THEME.light["primary"]
    const lightOnPrimary = tinycolor(themeConfig?.light?.["on-primary"]).isValid() ? themeConfig?.light?.["on-primary"] : DEFAULT_THEME.light["on-primary"]
    const lightAccent = tinycolor(themeConfig?.light?.["accent"]).isValid() ? themeConfig?.light?.["accent"] : DEFAULT_THEME.light["accent"];
    const lightOnAccent = tinycolor(themeConfig?.light?.["on-accent"]).isValid() ? themeConfig?.light?.["on-accent"] : DEFAULT_THEME.light["on-accent"];
    const lightTertiary = tinycolor(themeConfig?.light?.["tertiary"]).isValid() ? themeConfig?.light?.["tertiary"] : DEFAULT_THEME.light["tertiary"];
    const lightOnTertiary = tinycolor(themeConfig?.light?.["on-tertiary"]).isValid() ? themeConfig?.light?.["on-tertiary"] : DEFAULT_THEME.light["on-tertiary"];

    const darkPrimary = tinycolor(themeConfig?.dark?.["primary"]).isValid() ? themeConfig?.dark?.["primary"] : DEFAULT_THEME.dark["primary"];
    const darkOnPrimary = tinycolor(themeConfig?.dark?.["on-primary"]).isValid() ? themeConfig?.dark?.["on-primary"] : DEFAULT_THEME.dark["on-primary"];
    const darkAccent = tinycolor(themeConfig?.dark?.["accent"]).isValid() ? themeConfig?.dark?.["accent"] : DEFAULT_THEME.dark["accent"];
    const darkOnAccent = tinycolor(themeConfig?.dark?.["on-accent"]).isValid() ? themeConfig?.dark?.["on-accent"] : DEFAULT_THEME.dark["on-accent"];
    const darkTertiary = tinycolor(themeConfig?.dark?.["tertiary"]).isValid() ? themeConfig?.dark?.["tertiary"] : DEFAULT_THEME.dark["tertiary"];
    const darkOnTertiary = tinycolor(themeConfig?.dark?.["on-tertiary"]).isValid() ? themeConfig?.dark?.["on-tertiary"] : DEFAULT_THEME.dark["on-tertiary"];

    return {
      light: {
        "primary": lightPrimary,
        "on-primary": lightOnPrimary,
        "accent": lightAccent,
        "on-accent": lightOnAccent,
        "tertiary": lightTertiary,
        "on-tertiary": lightOnTertiary,
      },
      dark: {
        "primary": darkPrimary,
        "on-primary": darkOnPrimary,
        "accent": darkAccent,
        "on-accent": darkOnAccent,
        "tertiary": darkTertiary,
        "on-tertiary": darkOnTertiary,
      }
    };
  }
}

/**
 * Applies a theme configuration to the root document element
 * via CSS custom properties.
 * @param themeConfig The validated theme config
 */
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

/**
 * Converts a hex color string to an RGB string, e.g. '#ff0000' → '255, 0, 0'.
 * @param hex Hexadecimal color string
 * @returns RGB string
 */
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
