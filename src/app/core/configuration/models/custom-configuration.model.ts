import {ThemeConfig} from "../../theme/models/theme.model";
import {Language} from '../../locale/models/locale.model';

export interface CustomConfiguration {
  branding: {
    name: string;
    logo: string;
    title: string;
    description: string;
  };
  theme: ThemeConfig;
  locale: {
    languages: Language[];
    translationsBaseUrl?: string;
  };
  entities?: Record<string, EntityCustomConfiguration>;
}

export interface EntityCustomConfiguration {
  fields: Record<string, boolean>;
  extraFields?: ExtraFieldCustomConfiguration[]
}


export interface ExtraFieldCustomConfiguration {
  name: string,
  type: string;
  validators?: Record<string, boolean>,
  maxDate?: string,
  minDate?: string,
  hint?: string,
  rows?: number,
  maxlength?: number,
  required?: boolean,
  placeholder?: string,
}

export enum ExtraFieldType {
  TEXT = 'text',
  NUMBER = 'number',
  DATE = 'date',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
}
