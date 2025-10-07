import {inject, Injectable} from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";
import {map, take, tap} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

import { LocaleActions } from '../store/action.types';
import { LocaleStorageItem } from '../enums/locale-storage-item';
import {locale} from "../store/locale.selectors";
import {localeConfig} from "../../config/store/config.selectors";
import {registerLocaleData} from "@angular/common";

import localeEn from '@angular/common/locales/en';
import localeEnGb from '@angular/common/locales/en-GB';
import localeNl from '@angular/common/locales/nl';
import localeFa from '@angular/common/locales/fa';
import {Language} from '../../../shared/models/locale.model';
import {Locale} from 'date-fns';
import {enGB, nl, faIR} from 'date-fns/locale';

@Injectable({providedIn: 'root'})
export class localeService {
  private readonly store = inject(Store);
  private readonly translate = inject(TranslateService);
  private readonly dateAdapter = inject(DateAdapter<string>);

  /**
   * Observable for current locale (from the store).
   */
  readonly locale$ = this.store.pipe(select(locale));

  localeMap: Record<string, any> = {
    en: localeEn,
    'en-GB': localeEnGb,
    nl: localeNl,
    fa: localeFa,
  };

  // Map Angular locale codes to date-fns locales
  private dateFnsLocaleMap: Record<string, Locale> = {
    'en-GB': enGB,
    'nl': nl,
    'fa': faIR,
  };


  /**
   * Initializes available locales and sets the app's default locale.
   * Uses `localeConfig` from the store and initializes culture settings.
   */
  init(): Observable<Language[]> {
    return this.store.select(localeConfig).pipe(
      take(1),
      tap((languages) => this.initLocales(languages)),
      catchError((err) => throwError(() => err))
    )
  }

  /**
   * Initializes translations, directionality, and dispatches initial locale state.
   * @param languages Supported languages
   */
  private initLocales(languages: Language[]) {
    const browserLanguage = this.getBrowserLanguage(languages);
    document.dir = browserLanguage.direction || 'ltr';
    this.registerCulture(browserLanguage);
    this.store.dispatch(LocaleActions.initLocales({ languages, currentLanguage: browserLanguage }));
  }

  /**
   * Detects and returns the most appropriate language from browser or localStorage.
   * @param languages Supported language list
   */
  private getBrowserLanguage(languages: Language[]) {
    const availableCodes = languages.map(lang => lang.code);
    this.translate.addLangs(availableCodes);

    const browserLang = this.translate.getBrowserLang();
    const storedLang = localStorage.getItem(LocaleStorageItem.LOCALE);

    const selectedLang = storedLang ?? (
      browserLang && availableCodes.includes(browserLang)
        ? browserLang
        : availableCodes[0]
    );

    // Set to localStorage if not already stored
    if (!storedLang) {
      localStorage.setItem(LocaleStorageItem.LOCALE, selectedLang);
      this.translate.addLangs([selectedLang]);
      this.translate.use(selectedLang);
    }

    return languages.find(lang => lang.code === selectedLang) || languages[0];
  }

  /**
   * Stores the selected language code in localStorage.
   * @param languageCode Code to store
   */
  storeLocale(languageCode: string): void {
    localStorage.setItem(LocaleStorageItem.LOCALE, languageCode);
  }

  /**
   * Dispatches language switch action to the store.
   * @param language The language switched to
   */
  private languageSwitched(language: Language): void {
    this.store.dispatch(LocaleActions.languageSwitched({ currentLanguage: language }));
  }

  /**
   * Registers Angular Material and ngx-translate culture and starts translation loading.
   * @param language Language to register
   */
  registerCulture(language: Language): void {
    const localeCode = language.locale;
    if (!localeCode) return;

    // Angular i18n locale (for registerLocaleData and DateAdapter)
    const angularLocaleId = localeCode === 'en-GB' ? 'en-GB' : localeCode.substring(0, 2);
    this.localeInitializer(angularLocaleId);

    // Set date-fns locale for the DateAdapter
    const dateFnsLocale = this.dateFnsLocaleMap[angularLocaleId];
    if (dateFnsLocale) {
      this.dateAdapter.setLocale(dateFnsLocale);
    } else {
      console.warn(`date-fns locale for ${angularLocaleId} not found`);
    }

    this.switchLanguage(language).subscribe();
  }

  /**
   * Switches language using ngx-translate and updates the store.
   * @param language Language to switch to
   */
  private switchLanguage(language: Language): Observable<Language> {
    this.storeLocale(language.code);

    return this.translate.use(language.code).pipe(
      tap(() => this.languageSwitched(language)),
      map(() => language)
    );
  }

  private localeInitializer(localeId: string): void {
    const localeData = (this.localeMap)[localeId];
    if (localeData) {
      registerLocaleData(localeData);
    } else {
      console.warn(`Locale ${localeId} not found`);
    }
  }
}
