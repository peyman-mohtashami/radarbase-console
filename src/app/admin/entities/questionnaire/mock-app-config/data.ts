import {app_phq8, phq8} from "./phq8";
import {app_sample_field_types, sample_field_types} from "./sample-field-types";

export const data = [
  ...phq8,
  ...sample_field_types
];

export const appData = [
  app_phq8,
  app_sample_field_types,
];
