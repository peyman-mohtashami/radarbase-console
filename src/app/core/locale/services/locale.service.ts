import {inject, Injectable, signal} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import {registerLocaleData} from "@angular/common";
import {Locale} from 'date-fns';

import {Language} from '../models/locale.model';
import {ConfigurationService} from '../../configuration/services/configuration.service';

@Injectable({providedIn: 'root'})
export class LocaleService {
  private readonly configurationService = inject(ConfigurationService);
  private readonly translate = inject(TranslateService);
  private readonly dateAdapter = inject(DateAdapter<string>);

  private _locales = signal<Language[]>([]);
  readonly locales = this._locales.asReadonly();

  private _currentLocale = signal<Language | undefined>(undefined);
  readonly currentLocale = this._currentLocale.asReadonly();

  init(): void {
    const languages = this.configurationService.localeCustomization().languages;
    this.initLocales(languages);
  }

  switchLanguage(language: Language): void {
    this.storeLocale(language.code);

    document.dir = language.direction || 'ltr';
    this.registerCulture(language);
    this.translate.use(language.code).subscribe(() => {
      this._currentLocale.set(language);
    });
  }

  private initLocales(languages: Language[]) {
    const browserLanguage = this.getBrowserLanguage(languages);
    document.dir = browserLanguage.direction || 'ltr';
    this.registerCulture(browserLanguage);
    this._locales.set(languages);
    this._currentLocale.set(browserLanguage);
  }

  private getBrowserLanguage(languages: Language[]) {
    const availableCodes = languages.map(lang => lang.code);
    this.translate.addLangs(availableCodes);

    const browserLang = this.translate.getBrowserLang();
    const storedLang = localStorage.getItem('locale');

    const selectedLang = storedLang ?? (
      browserLang && availableCodes.includes(browserLang)
        ? browserLang
        : availableCodes[0]
    );

    // Set to localStorage if not already stored
    if (!storedLang) {
      localStorage.setItem('locale', selectedLang);
      this.translate.addLangs([selectedLang]);
      this.translate.use(selectedLang);
    }

    return languages.find(lang => lang.code === selectedLang) || languages[0];
  }

  private getAngularLocaleLoader(localeId: string): (() => Promise<{ default: any }>) | undefined {
    switch (localeId) {
      case 'en':
        return () => import('@angular/common/locales/en');
      case 'en-GB':
        return () => import('@angular/common/locales/en-GB');
      case 'nl':
        return () => import('@angular/common/locales/nl');
      case 'fr':
        return () => import('@angular/common/locales/fr');
      default:
        return undefined;
    }
  }

  private getDateFnsLocaleLoader(localeId: string): (() => Promise<Locale>) | undefined {
    switch (localeId) {
      case 'en':
      case 'en-GB':
        return () =>
          import('date-fns/locale/en-GB').then(m => m.enGB);
      case 'nl':
        return () =>
          import('date-fns/locale/nl').then(m => m.nl);
      case 'fr':
        return () =>
          import('date-fns/locale/fr').then(m => m.fr);
      default:
        return undefined;
    }
  }

  private storeLocale(languageCode: string): void {
    localStorage.setItem('locale', languageCode);
  }

  private registerCulture(language: Language): void {
    const localeCode = language.locale;
    if (!localeCode) return;
    const angularLocaleId =
      localeCode === 'en-GB' ? 'en-GB' : localeCode.substring(0, 2);

    this.localeInitializer(angularLocaleId)
      .then(() => this.translate.use(language.code))
      .catch(err => console.warn('Error initializing locale', angularLocaleId, err));
  }

  private async localeInitializer(localeId: string): Promise<void> {
    // Angular i18n locale
    const angularLoader = this.getAngularLocaleLoader(localeId);
    if (angularLoader) {
      try {
        const module = await angularLoader();
        registerLocaleData(module.default);
      } catch (e) {
        console.warn(`Failed to load Angular locale data for ${localeId}`, e);
      }
    } else {
      console.warn(`Angular locale loader for ${localeId} not found`);
    }

    // date-fns locale
    const dateFnsLoader = this.getDateFnsLocaleLoader(localeId);
    if (dateFnsLoader) {
      try {
        const locale = await dateFnsLoader();
        this.dateAdapter.setLocale(locale);
      } catch (e) {
        console.warn(`Failed to load date-fns locale for ${localeId}`, e);
      }
    } else {
      console.warn(`date-fns locale loader for ${localeId} not found`);
    }
  }
}
