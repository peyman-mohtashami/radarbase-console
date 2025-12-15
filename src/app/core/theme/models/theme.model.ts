export interface ThemeConfig {
  light: Theme;
  dark: Theme;
}

export interface Theme {
  'primary': string;
  'on-primary': string;
  'accent': string;
  'on-accent': string;
  'tertiary'?: string;
  'on-tertiary'?: string;
}
