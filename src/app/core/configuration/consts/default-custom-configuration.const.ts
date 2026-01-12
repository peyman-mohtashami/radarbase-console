import {CustomConfiguration} from '../models/custom-configuration.model';

export const DEFAULT_CUSTOM_CONFIGURATION: CustomConfiguration = {
  "theme": {
    // "_comments" [
    //   "`theme` defines the application color palette for both light and dark modes.",
    //   "Each mode (`light` / `dark`) contains the same set of semantic color roles:",
    //   "`primary`: Main brand color.",
    //   "`on-primary`: Text/icon color that must be readable when placed on `primary`.",
    //   "`accent`: Secondary highlight color used for emphasis.",
    //   "`on-accent`: Text/icon color that must be readable when placed on `accent`.",
    //   "`tertiary`: Additional supporting color for specific UI elements where `primary`/`accent` are not appropriate.",
    //   "`on-tertiary`: Text/icon color that must be readable when placed on `tertiary`.",
    //   "Colors are expressed as hex strings (e.g., `#004F6E`).",
    //   "# Accessibility note",
    //   "Ensure sufficient contrast between each background color (`primary`/`accent`/`tertiary`) and its corresponding",
    //   "foreground color (`on-*`) to keep text and icons readable.",
    // ],
    "light": {
      "primary": "#004F6E",
      "on-primary": "#ffffff",
      "accent": "#22A2C9",
      "on-accent": "#ffffff",
      "tertiary": "#004F6E",
      "on-tertiary": "#ffffff"
    },
    "dark": {
      "primary": "#22A2C9",
      "on-primary": "#ffffff",
      "accent": "#004F6E",
      "on-accent": "#ffffff",
      "tertiary": "#004F6E",
      "on-tertiary": "#ffffff"
    },
  },
  locale: {
    // "_comments" [
    //   "`locale` configures internationalization (i18n) settings and available languages.",
    //   "`translationsBaseUrl`: Base path where translation JSON files are served from.",
    //   "`languages`: List of selectable UI languages. Each entry defines:",
    //   "`code`: Short language code used by the app (e.g., `en`, `nl`).",
    //   "`locale`: Locale tag used for formatting (e.g., `en-GB`, `nl-NL`).",
    //   "`label`: Human readable language name shown in the UI.",
    //   "`shortLabel`: Optional compact label (e.g., for a header switcher).",
    //   "`dateFormat`: Display format used for dates in the UI (keep consistent per language).",
    //   "# Notes",
    //   "Make sure a translation file exists per language under `translationsBaseUrl` (e.g., `assets/i18n/en.json`).",
    // ],
    "translationsBaseUrl": "assets/i18n/",
    languages: [
      {
        "code": "en",
        "locale": "en-GB",
        "label": "English",
        "shortLabel": "EN",
        "dateFormat": "dd/MM/yyyy"
      },
      {
        "code": "nl",
        "locale": "nl-NL",
        "label": "Nederlands",
        "dateFormat": "dd-MM-yyyy"
      }
    ],
  },
  branding: {
    // "_comments" [
    //   "`branding` controls the product identity text and imagery shown in the UI.",
    //   "`name`: Short product name (e.g., used in the header or navigation).",
    //   "`title`: Main welcome / landing title shown to users.",
    //   "`description`: Longer explanatory text (keep it reasonably short for layout).",
    //   "`logo`: Path or URL to a logo image.",
    // ],
    name: "RADAR-base Console",
    title: "Welcome to RADAR-base Console",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    logo: "assets/images/rb-logo-full-mono_resized.png",
  },
  entities: {
    // "_comments" [
    //   "`entities` configures which fields are visible/enabled per entity in the UI.",
    //   "Each key under `entities` is an entity name (e.g., `organization`, `project`, `subject`).",
    //   "For each entity:",
    //   "`fields`: a map of field paths to booleans (`true` = enabled/visible, `false` = disabled/hidden).",
    //   "Field paths may be nested using dot-notation (e.g., `attributes.participant_group`).",
    //   "Some entities may additionally support:",
    //   "`extraFields`: additional UI-defined fields that are not part of the backend model.",
    //   "# Notes",
    //   "Use this configuration to tailor forms and detail views without changing code.",
    //   "Prefer disabling fields with `false` rather than removing them, to preserve intent and ease upgrades.",
    // ],
    organization: {
      // "_comments" [
      //   "`organization` controls which Organization fields are shown in Organization forms/views.",
      //   "Supported field keys:",
      //   "- `location`",
      //   "- `description`",
      //   "- `projects`",
      // ],
      fields: {
        "location": true,
        "description": true,
        "projects": true
      }
    },
    project: {
      // "_comments" [
      //   "`project` controls which Project fields are shown in Project forms/views.",
      //   "Supported field keys:",
      //   "- `location`",
      //   "- `description`",
      //   "- `startDate`",
      //   "- `endDate`",
      //   "- `projectStatus`",
      //   "- `sourceTypes`",
      //   "- `humanReadableProjectName`",
      //   "- `attributes`",
      //   "- `attributes.Privacy-policy-url`",
      //   "- `attributes.Work-package`",
      //   "- `attributes.Phase`",
      //   "- `attributes.External-project-url`",
      //   "- `attributes.External-project-id`",
      // ],
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
    client: {
      // "_comments" [
      //   "`client` controls which OAuth Client fields are shown in Client forms/views.",
      //   "Supported field keys:",
      //   "- `resourceIds`",
      //   "- `authorizedGrantTypes`",
      //   "- `dynamic_registration`",
      //   "- `accessTokenValiditySeconds`",
      //   "- `refreshTokenValiditySeconds`",
      //   "- `scope`",
      //   "- `autoApproveScopes`",
      //   "- `registeredRedirectUri`",
      // ],
      fields: {
        resourceIds: true,
        authorizedGrantTypes: true,
        dynamic_registration: true,
        accessTokenValiditySeconds: true,
        refreshTokenValiditySeconds: true,
        scope: true,
        autoApproveScopes: true,
        registeredRedirectUri: true
      }
    },
    subject: {
      // "_comments" [
      //   "`subject` controls which Subject fields are shown in Subject forms/views.",
      //   "Also supports `extraFields` to add UI-defined fields (e.g., additional metadata captured locally).",
      //   "Supported field keys:",
      //   "- `personName`",
      //   "- `externalLink`",
      //   "- `dateOfBirth`",
      //   "- `group`",
      //   "- `status`",
      //   "- `sources`",
      //   "- `attributes`",
      //   "- `attributes.participant_group`",
      //   "- `attributes.humanReadableIdentifier`",
      //   "- `enrollmentDate`",
      //   "- `createdBy`",
      //   "- `createdDate`",
      //   "- `lastModifiedBy`",
      //   "- `lastModifiedDate`",
      //   "Also supported:",
      //   "- `extraFields[]` (array of UI-defined fields)",
      // ],
      fields: {
        personName: true,
        externalLink: true,
        dateOfBirth: true,
        group: true,
        status: true,
        sources: true,
        attributes: true,
        "attributes.participant_group": true,
        "attributes.humanReadableIdentifier": true,
        enrollmentDate: false,
        createdBy: false,
        createdDate: false,
        lastModifiedBy: false,
        lastModifiedDate: false
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
    "user": {
      // "_comments" [
      //   "`user` controls which User fields are shown in User forms/views.",
      //   "Supported field keys:",
      //   "- `firstName`",
      //   "- `lastName`",
      //   "- `createdBy`",
      //   "- `createdDate`",
      //   "- `lastModifiedBy`",
      //   "- `lastModifiedDate`",
      //   "- `langKey`",
      // ],
      "fields": {
        "firstName": true,
        "lastName": true,
        "createdBy": true,
        "createdDate": true,
        "lastModifiedBy": true,
        "lastModifiedDate": true,
        "langKey": true
      }
    },
    "sourceType": {
      // "_comments" [
      //   "`sourceType` controls which Source Type fields are shown in Source Type forms/views.",
      //   "Supported field keys:",
      //   "- `description`",
      //   "- `appProvider`",
      //   "- `assessmentType`",
      //   "- `name`",
      //   "- `sourceTypeScope`",
      //   "- `canRegisterDynamically`",
      //   "- `sourceData`",
      // ],
      "fields": {
        "description": true,
        "appProvider": true,
        "assessmentType": true,
        "name": true,
        "sourceTypeScope": true,
        "canRegisterDynamically": true,
        "sourceData": true
      }
    },
    "sourceData": {
      // "_comments" [
      //   "`sourceData` controls which Source Data fields are shown in Source Data forms/views.",
      //   "Supported field keys:",
      //   "- `topic`",
      //   "- `processingState`",
      //   "- `keySchema`",
      //   "- `valueSchema`",
      //   "- `frequency`",
      //   "- `unit`",
      // ],
      "fields": {
        "topic": true,
        "processingState": true,
        "keySchema": true,
        "valueSchema": true,
        "frequency": true,
        "unit": true
      }
    },
    "source": {
      // "_comments" [
      //   "`source` controls which Source fields are shown in Source forms/views.",
      //   "Supported field keys:",
      //   "- `expectedSourceName`",
      //   "- `attributes`",
      //   "- `attributes.External-identifier`",
      // ],
      "fields": {
        "expectedSourceName": true,
        "attributes": true,
        "attributes.External-identifier": true
      }
    }
  }
}

// const colorHints = {
//   "amber": "#ffc107",
//   "deepPurple": "#673ab7",
//   "pink": "#ff4081",
//   "indigo": "#3f51b5",
//   "blueGrey": "#607d8b",
//   "pinkDark": "#e91e63",
//   "green": "#4caf50",
//   "purple": "#9c27b0",
//   "rb-dark-blue": "#004F6E",
//   "rb-light-blue": "#22A2C9",
//   "rb-gray": "#858785"
// }
