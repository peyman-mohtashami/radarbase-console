import {CustomConfiguration} from '../models/deployment-configuration.model';

export const DEFAULT_CONFIGURATION_URL = 'config-assets/frontend-config.json'

export const DEFAULT_CONFIGURATION: CustomConfiguration = {
  "mainNavigation": {
    "internal": {
      "questionnaire": true,
      "audit": true,
      "revision": true,
      "health": true,
      "metrics": true,
      "log": true
    },
    "external": {
      "systemLogs": {
        "url": "http://grafana.localhost"
      },
      "systemStatus": {
        "url": "http://graylog.localhost"
      },
      "uploadPortal": {
        "url": "http://localhost/upload"
      },
      "dataStorage": {
        "url": "https://s3.localhost"
      },
      "grafana": {
        "url": "http://grafana.localhost"
      },
      "website": {
        "url": "https://radar-base.org/"
      },
      "wiki": {
        "url": "https://radar-base.atlassian.net/wiki/spaces/RAD/overview"
      }
    },
  },
  "localization": {
    "translationsBaseUrl": "/assets/i18n/",
    "locales": [
      {
        "code": "en",
        "locale": "en-GB",
        "label": "English",
        "shortLabel": "EN",
        "dateFormat": "dd/mm/yyyy"
      },
      {
        "code": "nl",
        "locale": "nl-NL",
        "label": "Nederlands",
        "dateFormat": "dd-mm-yyyy"
      }
    ],
  },
  "branding": {
    "logo": "assets/images/rb-logo-full-white.svg",
    "theme": {
      "light": {
        "primary": "#004F6E",
        "on-primary": "#ffffff",
        "accent": "#22A2C9",
        "on-accent": "#ffffff",
        "tertiary": "#22A2C9",
        "on-tertiary": "#ffffff"
      },
      "dark": {
        "primary": "#22A2C9",
        "on-primary": "#ffffff",
        "accent": "#22A2C9",
        "on-accent": "#ffffff",
        "tertiary": "#004F6E",
        "on-tertiary": "#ffffff"
      },
    },
    // "sampleColors": {
    //   "primary": "#9262ff",
    //   "on-primary": "#ffffff",
    //   "accent": "#5c3ccf",
    //   "on-accent": "#ffffff",
    //   "tertiary": "#cf3ca5",
    //   "on-tertiary": "#ffffff"
    // },
  },
  "entities": {
    project: {
      fields: {
        location: true,
        description: true,
        startDate: true,
        endDate: true,
        projectStatus: true,
        sourceTypes: true,
        humanReadableProjectName: true,
        attributes: true,
        "attributes.Privacy-policy-url": true,
        "attributes.Work-package": true,
        "attributes.Phase": true,
        "attributes.External-project-url": true,
        "attributes.External-project-id": true
      }
    },
    subject: {
      fields: {
        personName: true,
        externalLink: true,
        externalId: true,
        dateOfBirth: true,
        group: true,
        attributes: true,
        "attributes.participant_group": true,
        "attributes.humanReadableIdentifier": true,
      },
      "extraFields": []
    },
  },

}
