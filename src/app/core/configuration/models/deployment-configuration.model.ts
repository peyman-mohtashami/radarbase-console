export interface CustomConfiguration {
  mainNavigation: CustomNavigation,
  localization: CustomLocalization;
  branding: CustomBranding;
  entities: CustomEntitiesConfig;
}

export interface CustomBranding {
  // "title": string;
  // "description": string;
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
      // attributes: {
      //   "Privacy-policy-url": boolean;
      //   "Work-package": boolean;
      //   "Phase": boolean;
      //   "External-project-url": boolean;
      //   "External-project-id": boolean;
      // }
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
    "extraFields": [
      // {"name": "slideToggle", "type": "slideToggle", "validators": {}, "hint": "Hint for slideToggle field"},
      // // {"name": "select", "type": "Select", validators: {}, "hint": "Hint for select field"},
      // {"name": "select", "type": "select", options: ["RED", "YELLOW", "BLUE"], validators: {}, "hint": "Hint for select field"},
      // {"name": "text", "type": "text", validators: {normalTextValidator: boolean; requiredValidator: boolean;}, "hint": "Hint for text field"},
      // // {"name": "number", "type": "number", validators: {}, "hint": "Hint for number field", min: "10", max: "20"},
      // {"name": "number", "type": "number", min: '10', max: '15', validators: {}, "hint": "Hint for text field"},
      // {"name": "textArea", "type": "textarea", validators: {longTextValidator: boolean;}, "hint": "Hint for textArea field", rows: 5, maxlength: 120, required: boolean;},
      // {"name": "email", "type": "text", "validators": {}},
      // {
      //   "name": "lastInjectionDate",
      //   "type": "date",
      //   "validators": {requiredValidator: boolean;},
      //   "min": "01-01-2023",
      //   "max": "01-01-2026"
      // }
    ]
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
