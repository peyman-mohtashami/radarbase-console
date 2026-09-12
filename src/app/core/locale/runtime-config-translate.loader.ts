import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslationObject} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../configuration/services/configuration.service';

const DEFAULT_TRANSLATIONS_PATH = 'assets/i18n/';

@Injectable({providedIn: 'root'})
export class RuntimeConfigTranslateLoader implements TranslateLoader {

  private readonly configurationService = inject(ConfigurationService);
  private readonly http = inject(HttpClient);

  getTranslation(lang: string): Observable<TranslationObject> {
    const { translationsBaseUrl } = this.configurationService.customLocalization();
    const url = this.buildTranslationUrl(translationsBaseUrl, `${lang}.json`);

    return this.http.get<TranslationObject>(url);
  }

  private buildTranslationUrl(baseUrl: string | undefined, fileName: string): string {
    const base = baseUrl || this.defaultBaseUrl();
    return `${base.replace(/\/+$/, '')}/${fileName.replace(/^\/+/, '')}`;
  }

  private defaultBaseUrl(): string {
    if (typeof document === 'undefined' || !document.baseURI) {
      return DEFAULT_TRANSLATIONS_PATH;
    }

    try {
      return new URL(DEFAULT_TRANSLATIONS_PATH, document.baseURI).href;
    } catch {
      return DEFAULT_TRANSLATIONS_PATH;
    }
  }
}
