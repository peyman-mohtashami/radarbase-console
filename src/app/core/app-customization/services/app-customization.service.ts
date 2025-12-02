import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, switchMap} from "rxjs";
import {DEFAULT_APP_CUSTOMIZATION} from "../consts/default-app-customization.const";
import {AppCustomization} from "../models/app-customization.model";
import {environment} from "../../../../environments/environment";
import {RadarConfigBundle} from "../../../admin/entities/config/models/config";
import {catchError, map, tap} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AppCustomizationService {

  private http = inject(HttpClient);

  appCustomization = signal<AppCustomization>(DEFAULT_APP_CUSTOMIZATION);

  themeCustomization = computed(() => {
    return this.appCustomization()?.theme;
  });

  brandingCustomization = computed(() => {
    return this.appCustomization()?.branding;
  });

  localeCustomization = computed(() => {
    return this.appCustomization().locale;
  });

  entitiesCustomization = computed(() => {
    return this.appCustomization()?.entities;
  });

  init(): Observable<AppCustomization> {
    const appConfigBaseUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}/appconfig/api`
        : '/appconfig/api'; // fallback for SSR or tests
    // const appConfigBaseUrl = 'http://localhost/appconfig/api';
    const managementClientId = 'ManagementPortalapp';
    const appConfigUrl = `${appConfigBaseUrl}/global/config/${managementClientId}`;

    if (false && !environment.localDeployment) {
      const accessToken = localStorage.getItem('accessToken');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);

      return this.http.get<RadarConfigBundle>(appConfigUrl, {headers}).pipe(
        map((configBundle) => {
          const configEntry = configBundle.config.find(c => c.name === 'config');
          return configEntry?.value as string | undefined;
        }),
        switchMap((url) => {
          if (url) {
            return this.loadConfigFromUrl(url).pipe(
              map(config => this.validateConfig(config)),
              catchError(() => of(DEFAULT_APP_CUSTOMIZATION)),
            );
          } else {
            return of(DEFAULT_APP_CUSTOMIZATION);
          }
        }),
        catchError(() => of(DEFAULT_APP_CUSTOMIZATION)),
        tap((config) => {
          this.appCustomization.set(config);
        }),
      );
    } else {
      const accessToken = localStorage.getItem('accessToken');
      // const accessToken = "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcGNvbmZpZyIsInJlc19yZXN0QXV0aG9yaXplciIsInJlc19NYW5hZ2VtZW50UG9ydGFsIiwicmVzX3VwbG9hZCJdLCJzb3VyY2VzIjpbXSwicm9sZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwic2NvcGUiOlsiU09VUkNFVFlQRS5DUkVBVEUiLCJTT1VSQ0VUWVBFLlJFQUQiLCJTT1VSQ0VUWVBFLlVQREFURSIsIlNPVVJDRVRZUEUuREVMRVRFIiwiU09VUkNFREFUQS5DUkVBVEUiLCJTT1VSQ0VEQVRBLlJFQUQiLCJTT1VSQ0VEQVRBLlVQREFURSIsIlNPVVJDRURBVEEuREVMRVRFIiwiU09VUkNFLkNSRUFURSIsIlNPVVJDRS5SRUFEIiwiU09VUkNFLlVQREFURSIsIlNPVVJDRS5ERUxFVEUiLCJTVUJKRUNULkNSRUFURSIsIlNVQkpFQ1QuUkVBRCIsIlNVQkpFQ1QuVVBEQVRFIiwiU1VCSkVDVC5ERUxFVEUiLCJVU0VSLkNSRUFURSIsIlVTRVIuUkVBRCIsIlVTRVIuVVBEQVRFIiwiVVNFUi5ERUxFVEUiLCJST0xFLkNSRUFURSIsIlJPTEUuUkVBRCIsIlJPTEUuVVBEQVRFIiwiUk9MRS5ERUxFVEUiLCJQUk9KRUNULkNSRUFURSIsIlBST0pFQ1QuUkVBRCIsIlBST0pFQ1QuVVBEQVRFIiwiUFJPSkVDVC5ERUxFVEUiLCJPUkdBTklaQVRJT04uQ1JFQVRFIiwiT1JHQU5JWkFUSU9OLlJFQUQiLCJPUkdBTklaQVRJT04uVVBEQVRFIiwiT1JHQU5JWkFUSU9OLkRFTEVURSIsIk9BVVRIQ0xJRU5UUy5DUkVBVEUiLCJPQVVUSENMSUVOVFMuUkVBRCIsIk9BVVRIQ0xJRU5UUy5VUERBVEUiLCJPQVVUSENMSUVOVFMuREVMRVRFIiwiQVVESVQuUkVBRCIsIkFVVEhPUklUWS5SRUFEIiwiTUVBU1VSRU1FTlQuUkVBRCIsIk1FQVNVUkVNRU5ULkNSRUFURSJdLCJzdWIiOiJhZG1pbiIsImlzcyI6Ik1hbmFnZW1lbnRQb3J0YWwiLCJ1c2VyX25hbWUiOiJhZG1pbiIsImNsaWVudF9pZCI6Ik1hbmFnZW1lbnRQb3J0YWxhcHAiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJleHAiOjE3NjMzOTA1NzYsImlhdCI6MTc2MzM3NjE3Nn0.BgT7JZk8VjcCnrxNu51emktYh0vwuf9fKnlUU7qlWJHAcOtoSoeZoiMIQCted8iG4XFkKATHWgjBqwEHWacNbQ";

      // Wrap fetch-based logic into an Observable
      return new Observable<AppCustomization>((observer) => {
        fetch(appConfigUrl, {
          method: 'GET',
          headers: {
            ...(accessToken ? {Authorization: `Bearer ${accessToken}`} : {})
          }
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`AppConfig request failed with status ${response.status}`);
            }

            const bundle = await response.json() as {
              config: { name: string; value: string }[];
            };

            const configEntry = bundle.config?.find(c => c.name === 'config');

            if (!configEntry?.value) {
              throw new Error('No "config" entry in AppConfig bundle');
            }

            fetch(configEntry.value, {
              method: 'GET',
            })
              .then(async (configResponse) => {
                if (!configResponse.ok) {
                  throw new Error(`ConfigUrl request failed with status ${configResponse.status}`);
                }
                try {
                  const parsed = await configResponse.json();
                  const validated = this.validateConfig(parsed);
                  this.appCustomization.set(validated);
                  observer.next(validated);
                  observer.complete();
                } catch {
                  throw new Error('Failed to parse config JSON from configUrl***');
                }
              }).catch(() => {
              this.appCustomization.set(DEFAULT_APP_CUSTOMIZATION);
              observer.next(DEFAULT_APP_CUSTOMIZATION);
              observer.complete();
            })
          })
          .catch(() => {
            this.appCustomization.set(DEFAULT_APP_CUSTOMIZATION);
            observer.next(DEFAULT_APP_CUSTOMIZATION);
            observer.complete();
          });
      })
    }
  }

  protected validateConfig(config: AppCustomization): AppCustomization {
    return {
      branding: {
        logo: config.branding.logo ?? DEFAULT_APP_CUSTOMIZATION.branding.logo,
        title: config.branding.title ?? DEFAULT_APP_CUSTOMIZATION.branding.title,
        description: config.branding.description ?? DEFAULT_APP_CUSTOMIZATION.branding.description,
        name: config.branding.name ?? DEFAULT_APP_CUSTOMIZATION.branding.name,
      },
      theme: config.theme,
      locale: {
        languages: config.locale.languages ?? DEFAULT_APP_CUSTOMIZATION.locale.languages,
        translationsBaseUrl: config.locale.translationsBaseUrl ?? DEFAULT_APP_CUSTOMIZATION.locale.translationsBaseUrl,
      },
      entities: config.entities ?? DEFAULT_APP_CUSTOMIZATION.entities,
    };
  }

  private loadConfigFromUrl(url: string): Observable<AppCustomization> {
    return this.http.get<AppCustomization>(url).pipe(
      map((config) => this.validateConfig(config)),
      catchError((err) => {
        console.error('Error fetching config from URL, using DEFAULT_CONFIG', err);
        return of(DEFAULT_APP_CUSTOMIZATION);
      }),
    );
  }
}
