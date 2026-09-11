import {CustomConfiguration} from '../models/deployment-configuration.model';

export const DEFAULT_DEPLOYMENT_CONFIGURATION_URL = 'config-assets/frontend-config.json'

export const DEFAULT_DEPLOYMENT_CONFIGURATION: CustomConfiguration = {
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
    // "title": "RADAR-base Console",//?
    // "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",//?
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
        // attributes: {
        //   "Privacy-policy-url": false,
        //   "Work-package": false,
        //   "Phase": false,
        //   "External-project-url": false,
        //   "External-project-id": true
        // }
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
      "extraFields": [
        // {"name": "slideToggle", "type": "slideToggle", "validators": {}, "hint": "Hint for slideToggle field"},
        // // {"name": "select", "type": "Select", validators: {}, "hint": "Hint for select field"},
        // {"name": "select", "type": "select", options: ["RED", "YELLOW", "BLUE"], validators: {}, "hint": "Hint for select field"},
        // {"name": "text", "type": "text", validators: {normalTextValidator: true, requiredValidator: true}, "hint": "Hint for text field"},
        // // {"name": "number", "type": "number", validators: {}, "hint": "Hint for number field", min: "10", max: "20"},
        // {"name": "number", "type": "number", min: '10', max: '15', validators: {}, "hint": "Hint for text field"},
        // {"name": "textArea", "type": "textarea", validators: {longTextValidator: true}, "hint": "Hint for textArea field", rows: 5, maxlength: 120, required: true},
        // {"name": "email", "type": "text", "validators": {}},
        // {
        //   "name": "lastInjectionDate",
        //   "type": "date",
        //   "validators": {requiredValidator: true},
        //   "min": "01-01-2023",
        //   "max": "01-01-2026"
        // }
      ]
    },
  },

}
