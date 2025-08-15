import { createFeatureSelector, createSelector } from '@ngrx/store';
import {LocaleState} from '../../../shared/models/locale.model';

// import { LocaleState } from "@rb/models";

export const selectLocaleState = createFeatureSelector<LocaleState>('locale')

export const locale = createSelector(
  selectLocaleState,
  locale => locale
)
