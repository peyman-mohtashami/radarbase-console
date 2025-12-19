import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {ROLES} from '../../../shared/enums/roles';
import {ENTITY_REGISTRY} from '../../../shared/consts/entity-registry';
import {getAppConfigBaseUrl} from '../../../admin/entities/config/services/config.service';
import {NavGroupItem} from '../models/nav-group-item.model';
import {
  DEFAULT_DEPLOYMENT_CONFIGURATION,
  DEFAULT_DEPLOYMENT_CONFIGURATION_URL
} from '../consts/default-deployment-configuration';
import {DeploymentConfiguration} from '../models/deployment-configuration.model';
import {DEFAULT_CUSTOM_CONFIGURATION} from '../consts/default-custom-configuration.const';
import {CustomConfiguration} from '../models/custom-configuration.model';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  private http = inject(HttpClient);

  private baseConfig$ = this.http.get<DeploymentConfiguration>(DEFAULT_DEPLOYMENT_CONFIGURATION_URL)
    .pipe(take(1));
  private _navGroupItems = signal<NavGroupItem[]>([]);
  navGroupItems = this._navGroupItems.asReadonly();

  appCustomization = signal<CustomConfiguration>(DEFAULT_CUSTOM_CONFIGURATION);
  themeCustomization = computed(() => this.appCustomization()?.theme);
  brandingCustomization = computed(() => this.appCustomization()?.branding);
  localeCustomization = computed(() => this.appCustomization().locale);
  entitiesCustomization = computed(() => this.appCustomization()?.entities);

  init(): Observable<CustomConfiguration> {
    this.fetchNavGroupItems();

    const appConfigBaseUrl = getAppConfigBaseUrl();
    const managementPortalClientId = 'ManagementPortalapp';
    const appConfigUrl = `${appConfigBaseUrl}/global/config/${managementPortalClientId}`;

    const accessToken = localStorage.getItem('accessToken');

    return new Observable<CustomConfiguration>((observer) => {
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

          fetch(configEntry.value, { method: 'GET' })
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
              this.appCustomization.set(DEFAULT_CUSTOM_CONFIGURATION);
              observer.next(DEFAULT_CUSTOM_CONFIGURATION);
              observer.complete();
            })
        })
        .catch(() => {
          this.appCustomization.set(DEFAULT_CUSTOM_CONFIGURATION);
          observer.next(DEFAULT_CUSTOM_CONFIGURATION);
          observer.complete();
        });
      });
  }

  private fetchNavGroupItems() {
    this.baseConfig$.subscribe({
      next: (config) => {
        this.setNavGroupItems(config);
      },
      error: () => {
        this.setNavGroupItems(DEFAULT_DEPLOYMENT_CONFIGURATION);
      },
    });
  }

  private setNavGroupItems(config: DeploymentConfiguration) {
    const navGroupItems: NavGroupItem[] = [
      {
        permission: [{role: ROLES.SYS_ADMIN}, {role: ROLES.ORGANIZATION_ADMIN}, {role: ROLES.PROJECT_ADMIN}],
        close: false,
        header: {icon: 'workspaces', name: 'coreManagement'},
        navList: [
          ENTITY_REGISTRY.project,
          ENTITY_REGISTRY.organization,
          ENTITY_REGISTRY.user
        ],
      },
      {
        permission: [{role: ROLES.SYS_ADMIN}],
        close: false,
        header: {icon: 'tune', name: 'systemConfiguration'},
        navList: ([
          enabled(config.internal.client, ENTITY_REGISTRY.client),
          enabled(config.internal.sourceType, ENTITY_REGISTRY.sourceType),
          enabled(config.internal.sourceData, ENTITY_REGISTRY.sourceData),
          enabled(config.internal.appConfig, ENTITY_REGISTRY.appConfig),
          enabled(config.internal.protocol, ENTITY_REGISTRY.protocol),
          enabled(config.internal.questionnaire, ENTITY_REGISTRY.questionnaire),
          enabled(config.internal.audit, ENTITY_REGISTRY.audit),
          enabled(config.internal.revision, ENTITY_REGISTRY.revision),
        ]).filter(item => !!item),
      },
      {
        permission: [{role: ROLES.SYS_ADMIN}],
        close: true,
        header: {icon: 'monitor_heart', name: 'monitoring'},
        navList: ([
          enabled(config.internal.health, ENTITY_REGISTRY.health),
          enabled(config.internal.metrics, ENTITY_REGISTRY.metrics),
          enabled(config.internal.log, ENTITY_REGISTRY.log),
          enabled(config.external.systemLogs, ENTITY_REGISTRY.systemLogs),
          enabled(config.external.systemStatus, ENTITY_REGISTRY.systemStatus),
        ]).filter(item => !!item),
      },
      {
        close: true,
        header: {icon: 'extension', name: 'externalLinks'},
        navList: ([
          enabled(config.external.uploadPortal, ENTITY_REGISTRY.uploadPortal),
          enabled(config.external.dataStorage, ENTITY_REGISTRY.dataStorage),
          enabled(config.external.grafana, ENTITY_REGISTRY.grafana),
        ]).filter(item => !!item),
      },
      {
        close: false,
        header: {icon: 'help', name: 'documentation'},
        navList: ([
          enabled(config.external.website, ENTITY_REGISTRY.website),
          enabled(config.external.wiki, ENTITY_REGISTRY.wiki),
        ]).filter(item => !!item),
      },
    ];
    this._navGroupItems.set(navGroupItems)
  }

  protected validateConfig(config: CustomConfiguration): CustomConfiguration {
    return {
      branding: {
        logo: config.branding.logo ?? DEFAULT_CUSTOM_CONFIGURATION.branding.logo,
        title: config.branding.title ?? DEFAULT_CUSTOM_CONFIGURATION.branding.title,
        description: config.branding.description ?? DEFAULT_CUSTOM_CONFIGURATION.branding.description,
        name: config.branding.name ?? DEFAULT_CUSTOM_CONFIGURATION.branding.name,
      },
      theme: config.theme,
      locale: {
        languages: config.locale.languages ?? DEFAULT_CUSTOM_CONFIGURATION.locale.languages,
        translationsBaseUrl: config.locale.translationsBaseUrl ?? DEFAULT_CUSTOM_CONFIGURATION.locale.translationsBaseUrl,
      },
      entities: config.entities ?? DEFAULT_CUSTOM_CONFIGURATION.entities,
    };
  }
}

const enabled = (config: boolean | undefined | {url: string}, item: any) => {
  if (config === undefined || config === true) return item;
  if (config === false) return undefined;
  if (config.url) return {...item, external: true, route: config.url};
}
