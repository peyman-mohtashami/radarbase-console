import { createReducer, on } from '@ngrx/store';

// import {LocaleState} from "@rb/models";
import { LocaleActions } from '../action.types';
import {DEFAULT_LANGUAGES} from "../../consts/default-languages.const";
import {LocaleState} from '../../../../shared/models/locale.model';

export const initialLocaleState: LocaleState = {currentLanguage: DEFAULT_LANGUAGES[0], languages: DEFAULT_LANGUAGES};

export const localeReducer = createReducer(
  initialLocaleState,
  on(LocaleActions.switchLanguage, (state) => state),

  on(LocaleActions.languageSwitched, (state, action) => {
    return {
      ...state,
      currentLanguage: action.currentLanguage
    };
  }),

  on(LocaleActions.initLocales, (state, action) => {
    return {
      ...state,
      languages: action.languages,
      currentLanguage: action.currentLanguage
    };
  }),
);
