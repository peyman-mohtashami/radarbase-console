import { createAction, props } from '@ngrx/store';
import {Language} from '../../../shared/models/locale.model';

// import { Language } from "@rb/models";

export const initLocales = createAction(
  '[Locale: _LocaleService#initLocales] Initialize locales',
  props<{languages: Language[], currentLanguage: Language}>()
);

export const switchLanguage = createAction(
  '[Locale: LocaleService#setLocale] (Main App: Top Menu) Switch language',
  props<{currentLanguage: Language}>()
);

export const languageSwitched = createAction(
  '[Locale: _LocaleService#languageSwitched] Language switched',
  props<{currentLanguage: Language}>()
);
