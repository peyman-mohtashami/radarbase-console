import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslationObject} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ConfigurationService} from '../configuration/services/configuration.service';

@Injectable({providedIn: 'root'})
export class RuntimeConfigTranslateLoader implements TranslateLoader {
  private configurationService = inject(ConfigurationService)
  private http = inject(HttpClient);

  getTranslation(lang: string): Observable<TranslationObject> {
    const localeCustomization = this.configurationService.localeCustomization();
    const base = localeCustomization.translationsBaseUrl || this.defaultBase();
    const url = this.joinUrl(base, `${lang}.json`);

    // if (!environment.localDeployment) {
     return this.http.get<TranslationObject>(url);
    // } else {
    //   return from(
    //     fetch(url, {
    //       method: 'GET',
    //     })
    //   ).pipe(
    //     switchMap(response => {
    //       if (!response.ok) {
    //         throw new Error(`Translation request failed with status ${response.status}`);
    //       }
    //       return response.json(); // Promise -> Observable via switchMap
    //     })
    //   );
    // }
  }

  private defaultBase(): string {
    // Use document.baseURI when available to build absolute URL under the deployed subpath
    if (typeof document !== 'undefined' && document.baseURI) {
      try {
        return new URL('assets/i18n/', document.baseURI).href;
      } catch {
        return 'assets/i18n/';
      }
    }
    return 'assets/i18n/';
  }

  private joinUrl(base: string, path: string): string {
    if (!base) return path;
    // Ensure exactly one slash between parts
    return base.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
  }
}
