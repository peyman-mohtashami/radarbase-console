import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UiState } from './reducers';

export const selectUiState = createFeatureSelector<UiState>('ui');

export const isMenuOpen = createSelector(selectUiState, (ui) => ui.isMenuOpen);
export const isLightTheme = createSelector(selectUiState, (ui) => ui.isThemeLight);
