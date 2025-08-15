import {ConfigState} from "../models/config.model";

export const DEFAULT_CONFIG: ConfigState = {
  title: "ManagementPortal",
  logo: 'assets/images/radar-base-logo.svg',
  branding: {
    title: 'Welcome to ManagementPortal',
    description: ''
  },
  "theme": {
    "light": {
      "primary": "#ff0000",
      "on-primary": "#ffffff",
      "accent": "#00ff00",
      "on-accent": "#ffffff",
      "tertiary": "#0000ff",
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
    // "colorHints": {
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
  },
  locale: [
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
};
