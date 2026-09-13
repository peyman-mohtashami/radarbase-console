export interface CustomConfiguration {
  mainNavigation: CustomNavigation,
  localization: CustomLocalization;
  branding: CustomBranding;
  entities: CustomEntitiesConfig;
}

export interface CustomBranding {
  "logo": string;
  "theme": {
    "light": {
      "primary": string;
      "on-primary": string;
      "accent": string;
      "on-accent": string;
      "tertiary": string;
      "on-tertiary": string;
    };
    "dark": {
      "primary": string;
      "on-primary": string;
      "accent": string;
      "on-accent": string;
      "tertiary": string;
      "on-tertiary": string;
    };
  };
}

export interface CustomLocalization {
  "translationsBaseUrl": string;
  "locales": {
    "code": string;
    "locale": string;
    "label": string;
    "shortLabel"?: string;
    "dateFormat": string;
  }[];
}

export interface CustomEntitiesConfig {
  project: {
    fields: {
      location: boolean;
      description: boolean;
      startDate: boolean;
      endDate: boolean;
      projectStatus: boolean;
      sourceTypes: boolean;
      humanReadableProjectName: boolean;
      attributes: boolean;
      "attributes.Privacy-policy-url": boolean;
      "attributes.Work-package": boolean;
      "attributes.Phase": boolean;
      "attributes.External-project-url": boolean;
      "attributes.External-project-id": boolean;
    }
  },
  subject: {
    fields: {
      personName: boolean;
      externalLink: boolean;
      externalId: boolean;
      dateOfBirth: boolean;
      group: boolean;
      attributes: boolean;
      "attributes.participant_group": boolean;
      "attributes.humanReadableIdentifier": boolean;
    },
    "extraFields": any[];
  },
}

export interface CustomNavigation {
  internal: {
    questionnaire: boolean;
    audit: boolean;
    revision: boolean;
    health: boolean;
    metrics: boolean;
    log: boolean;
  };
  external: {
    systemLogs?: { url: string };
    systemStatus?: { url: string };
    uploadPortal?: { url: string };
    dataStorage?: { url: string };
    grafana?: { url: string };
    website?: { url: string };
    wiki?: { url: string };
  }
}

export interface AppNavGroupItem {
  permission?: { role: string; entityName?: string }[];
  header?: { icon: string; name: string };
  expanded?: boolean;
  navList: {
    name: string;
    icon: string;
    route?: string;
    external?: boolean;
    permission?: { role: string; entityName?: string }[];
    exactMatch?: boolean;
  }[];
  close?: boolean;
}


// export interface ThemesConfiguration {
//   light: CustomTheme;
//   dark: CustomTheme;
// }

export interface CustomTheme {
  'primary': string;
  'on-primary': string;
  'accent': string;
  'on-accent': string;
  'tertiary': string;
  'on-tertiary': string;
}

export interface CustomLocale {
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
