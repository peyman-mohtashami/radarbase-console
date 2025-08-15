import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ConfigState} from "../models/config.model";

export const selectConfigState = createFeatureSelector<ConfigState>('config')

export const instanceConfig = createSelector(
  selectConfigState,
  config => config
)

export const themeConfig = createSelector(
  selectConfigState,
  config => config.theme
)

export const localeConfig = createSelector(
  selectConfigState,
  config => config.locale
)

export const entitiesConfig = createSelector(
  selectConfigState,
  config => config.entities
)
