import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader} from '@ngx-translate/core';
import {from, Observable, switchMap} from 'rxjs';
import {AppCustomizationService} from "../app-customization/services/app-customization.service";
import {environment} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class RuntimeConfigTranslateLoader implements TranslateLoader {
  private appCustomizationService = inject(AppCustomizationService)
  private http = inject(HttpClient);

  getTranslation(lang: string): Observable<any> {
    const localeCustomization = this.appCustomizationService.localeCustomization();
    const base = localeCustomization.translationsBaseUrl || this.defaultBase();
    const url = this.joinUrl(base, `${lang}.json`);

    if (!environment.localDeployment) {
     return this.http.get(url);
    } else {
      return from(
        fetch(url, {
          method: 'GET',
        })
      ).pipe(
        switchMap(response => {
          if (!response.ok) {
            throw new Error(`Translation request failed with status ${response.status}`);
          }
          return response.json(); // Promise -> Observable via switchMap
        })
      );
    }
  }

  private defaultBase(): string {
    // Use document.baseURI when available to build absolute URL under the deployed subpath
    if (typeof document !== 'undefined' && (document as any).baseURI) {
      try {
        return new URL('assets/i18n/', (document as any).baseURI).href;
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
