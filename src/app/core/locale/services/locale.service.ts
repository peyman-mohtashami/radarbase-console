import {inject, Injectable, signal} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import {registerLocaleData} from "@angular/common";
import {Locale} from 'date-fns';

import {ConfigurationService} from '../../configuration/services/configuration.service';
import {firstValueFrom} from 'rxjs';
import {CustomLocale} from '../../configuration/models/configuration.model';

const LOCALE_STORAGE_KEY = 'locale';

const LOCALE_LOADERS: Record<
  string,
  { angular: () => Promise<{ default: unknown }>; dateFns: () => Promise<Locale> }
> = {
  en: {
    angular: () => import('@angular/common/locales/en'),
    dateFns: () => import('date-fns/locale/en-GB').then(m => m.enGB),
  },
  'en-GB': {
    angular: () => import('@angular/common/locales/en-GB'),
    dateFns: () => import('date-fns/locale/en-GB').then(m => m.enGB),
  },
  nl: {
    angular: () => import('@angular/common/locales/nl'),
    dateFns: () => import('date-fns/locale/nl').then(m => m.nl),
  },
  fr: {
    angular: () => import('@angular/common/locales/fr'),
    dateFns: () => import('date-fns/locale/fr').then(m => m.fr),
  },
};

@Injectable({providedIn: 'root'})
export class LocaleService {
  private readonly configurationService = inject(ConfigurationService);
  private readonly translate = inject(TranslateService);
  private readonly dateAdapter = inject(DateAdapter<string>);

  private readonly _locales = signal<CustomLocale[]>([]);
  readonly locales = this._locales.asReadonly();

  private readonly _currentLocale = signal<CustomLocale | undefined>(undefined);
  readonly currentLocale = this._currentLocale.asReadonly();

  async init(): Promise<void> {
    const { locales } = this.configurationService.customLocalization();
    this._locales.set(locales);
    this.translate.addLangs(locales.map(lang => lang.code));

    const initialLanguage = this.resolveInitialLanguage(locales);
    await this.applyLanguage(initialLanguage);
  }

  async switchLanguage(language: CustomLocale): Promise<void> {
    localStorage.setItem(LOCALE_STORAGE_KEY, language.code);
    await this.applyLanguage(language);
  }

  private resolveInitialLanguage(languages: CustomLocale[]): CustomLocale {
    const availableCodes = languages.map(lang => lang.code);
    const storedCode = localStorage.getItem(LOCALE_STORAGE_KEY);
    const browserCode = this.translate.getBrowserLang();

    const selectedCode =
      (storedCode && availableCodes.includes(storedCode) && storedCode) ||
      (browserCode && availableCodes.includes(browserCode) && browserCode) ||
      availableCodes[0];

    if (!storedCode) {
      localStorage.setItem(LOCALE_STORAGE_KEY, selectedCode);
    }

    return languages.find(lang => lang.code === selectedCode) ?? languages[0];
  }

  private async applyLanguage(language: CustomLocale): Promise<void> {
    document.dir = language.direction || 'ltr';
    await this.loadCultureData(language.locale);
    await firstValueFrom(this.translate.use(language.code));
    this._currentLocale.set(language);
  }

  private async loadCultureData(localeCode: string | undefined): Promise<void> {
    if (!localeCode) return;

    const localeId = localeCode === 'en-GB' ? 'en-GB' : localeCode.substring(0, 2);
    const loaders = LOCALE_LOADERS[localeId];

    if (!loaders) {
      console.warn(`No locale loaders registered for "${localeId}"`);
      return;
    }

    await Promise.all([
      loaders
        .angular()
        .then(module => registerLocaleData(module.default))
        .catch(err => console.warn(`Failed to load Angular locale data for ${localeId}`, err)),
      loaders
        .dateFns()
        .then(locale => this.dateAdapter.setLocale(locale))
        .catch(err => console.warn(`Failed to load date-fns locale for ${localeId}`, err)),
    ]);
  }
}
