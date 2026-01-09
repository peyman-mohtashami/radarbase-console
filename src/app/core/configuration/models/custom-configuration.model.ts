// import {Language} from '../../locale/models/locale.model';

export interface CustomConfiguration {
  branding: BrandingConfiguration;
  theme: ThemesConfiguration;
  locale: LocaleConfiguration;
  entities: Record<string, EntityConfiguration>
// {
//     organization: EntityConfiguration;
//     project: EntityConfiguration;
//     user: EntityConfiguration;
//     client: EntityConfiguration;
//     subject: EntityConfiguration;
//     source: EntityConfiguration;
//     sourceType: EntityConfiguration;
//     sourceData: EntityConfiguration;
//   }
}

export interface BrandingConfiguration {
  name: string;
  logo: string;
  title: string;
  description: string;
}

export interface ThemesConfiguration {
  light: Theme;
  dark: Theme;
}

export interface Theme {
  'primary': string;
  'on-primary': string;
  'accent': string;
  'on-accent': string;
  'tertiary': string;
  'on-tertiary': string;
}


export interface LocaleConfiguration {
  languages: Language[];
  translationsBaseUrl?: string;
}

export interface Language {
  code: string;
  locale: string;
  label: string;
  shortLabel?: string;
  dateFormat: string;
  direction?: string;
}

export interface EntityConfiguration {
  fields: Record<string, boolean>;
  extraFields?: ExtraFieldConfiguration[]
}

export interface ExtraFieldConfiguration {
  name: string,
  type: string;
  required?: boolean,
  validators?: Record<string, boolean>,
  placeholder?: string,
  hint?: string,
  max?: string,
  min?: string,
  rows?: number,
  maxlength?: number,
  options?: string[]
}

export enum ExtraFieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  // MULTISELECT = 'multiselect',
  SLIDE_TOGGLE = 'slideToggle'
}
