import { createReducer, on } from '@ngrx/store';
import { UiActions } from '../action.types';

export interface UiState {
  isMenuOpen: boolean;
  isThemeLight: boolean;
}

export const initialUiState: UiState = {
  isMenuOpen: true,
  isThemeLight: localStorage.getItem('theme') === 'light',
};

export const uiReducer = createReducer(
  initialUiState,
  on(UiActions.toggleMenu, (state) => {
    return {
      ...state,
      isMenuOpen: !state.isMenuOpen,
    };
  }),
  on(UiActions.toggleTheme, (state) => {
    return {
      ...state,
      isThemeLight: !state.isThemeLight,
    };
  })
);
