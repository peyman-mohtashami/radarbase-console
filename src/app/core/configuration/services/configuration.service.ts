import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {take} from "rxjs/operators";
import {ROLES} from '../../../shared/enums/roles';
import {ENTITY_REGISTRY} from '../../../shared/consts/entity-registry';
import {getAppConfigBaseUrl} from '../../../admin/entities/configuration-scope/config/services/config.service';
import {NavGroupItem} from '../models/nav-group-item.model';
import {
  DEFAULT_DEPLOYMENT_CONFIGURATION,
  DEFAULT_DEPLOYMENT_CONFIGURATION_URL
} from '../consts/default-deployment-configuration';
import {DEFAULT_CUSTOM_CONFIGURATION} from '../consts/default-custom-configuration.const';
import {
  BrandingConfiguration,
  CustomConfiguration,
  EntityConfiguration, ExtraFieldConfiguration, ExtraFieldType, Language, LocaleConfiguration,
  Theme,
  ThemesConfiguration
} from '../models/custom-configuration.model';
import {DeploymentConfiguration} from '../models/deployment-configuration.model';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  private http = inject(HttpClient);

  private _navGroupItems = signal<NavGroupItem[]>([]);
  navGroupItems = this._navGroupItems.asReadonly();

  appCustomization = signal<CustomConfiguration>(DEFAULT_CUSTOM_CONFIGURATION);
  themeCustomization = computed(() => this.appCustomization()?.theme);
  brandingCustomization = computed(() => this.appCustomization()?.branding);
  localeCustomization = computed(() => this.appCustomization().locale);
  entitiesCustomization = computed(() => this.appCustomization()?.entities);

  init(): Observable<CustomConfiguration> {
    this.applyDeploymentConfiguration();
    return this.applyCustomConfiguration();
  }

  private applyCustomConfiguration() {
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

          fetch(configEntry.value, {method: 'GET'})
            .then(async (configResponse) => {
              if (!configResponse.ok) {
                throw new Error(`ConfigUrl request failed with status ${configResponse.status}`);
              }
              try {
                const parsed = await configResponse.json();
                const validated = sanitizeCustomConfiguration(parsed, DEFAULT_CUSTOM_CONFIGURATION);
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

  private applyDeploymentConfiguration() {
    this.http.get<unknown>(DEFAULT_DEPLOYMENT_CONFIGURATION_URL).pipe(
      take(1)
    ).subscribe({
      next: (config) => {
        const validatedConfig = sanitizeDeploymentConfiguration(config, DEFAULT_DEPLOYMENT_CONFIGURATION)
        this.setNavGroupItems(validatedConfig);
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
}

function sanitizeDeploymentConfiguration(value: unknown, defaults: DeploymentConfiguration): DeploymentConfiguration {
  const obj = isRecord(value) ? value : {};
  const objInternal = isRecord(obj["internal"]) ? obj["internal"] : {};
  return {
    internal: {
      client: withDefault(objInternal["client"], defaults.internal.client, isBoolean, "client"),
      sourceType: withDefault(objInternal["sourceType"], defaults.internal.sourceType, isBoolean, "sourceType"),
      sourceData: withDefault(objInternal["sourceData"], defaults.internal.sourceData, isBoolean, "sourceData"),
      appConfig: withDefault(objInternal["appConfig"], defaults.internal.client, isBoolean, "appConfig"),
      protocol: withDefault(objInternal["protocol"], defaults.internal.client, isBoolean, "protocol"),
      questionnaire: withDefault(objInternal["questionnaire"], defaults.internal.client, isBoolean, "questionnaire"),
      audit: withDefault(objInternal["audit"], defaults.internal.client, isBoolean, "audit"),
      revision: withDefault(objInternal["revision"], defaults.internal.client, isBoolean, "revision"),
      health: withDefault(objInternal["health"], defaults.internal.client, isBoolean, "health"),
      metrics: withDefault(objInternal["metrics"], defaults.internal.client, isBoolean, "metrics"),
      log: withDefault(objInternal["log"], defaults.internal.client, isBoolean, "log"),
    },
    external: obj["external"] as DeploymentConfiguration['external']
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

function withDefault<T>(value: unknown, fallback: T, validate: (value: unknown) => value is T, name?: string): T {
  if (validate(value)) {
    return value;
  } else {
    console.error(`${name} is not valid. Fallback to '${fallback}'`);
    return fallback;
  }
}

function isLanguage(v: unknown): v is Language {
  if (!isRecord(v)) return false;
  return isString(v["code"])
    && isString(v["locale"])
    && isString(v["label"])
    && (v["shortLabel"] === undefined || isString(v["shortLabel"]))
    && (v["direction"] === undefined || isString(v["direction"]))
    && isString(v["dateFormat"]);
}

const EXTRA_FIELD_TYPES = new Set<string>(Object.values(ExtraFieldType));

function isExtraFieldType(value: unknown): value is ExtraFieldType {
  return typeof value === 'string' && EXTRA_FIELD_TYPES.has(value);
}

function isExtraFieldConfiguration(v: unknown): v is ExtraFieldConfiguration {
  if (!isRecord(v)) return false;

  const validatorsOk =
    v["validators"] === undefined
      ? true
      : isRecord(v["validators"]) && Object.values(v["validators"]).every(isBoolean);

  const optionsOk =
    v["options"] === undefined
      ? true
      : Array.isArray(v["options"]) && v["options"].every(isString);

  return isString(v["name"])
    && isString(v["type"]) && isExtraFieldType(v["type"])
    && (v["required"] === undefined || isBoolean(v["required"]))
    && validatorsOk
    && (v["placeholder"] === undefined || isString(v["placeholder"]))
    && (v["hint"] === undefined || isString(v["hint"]))
    && (v["max"] === undefined || isString(v["max"]))
    && (v["min"] === undefined || isString(v["min"]))
    && (v["rows"] === undefined || typeof v["rows"] === 'number')
    && (v["maxlength"] === undefined || typeof v["maxlength"] === 'number')
    && optionsOk;
}

export function sanitizeCustomConfiguration(
  raw: unknown,
  defaults: CustomConfiguration
): CustomConfiguration {
  const obj = isRecord(raw) ? raw : {};

  return {
    branding: sanitizeBranding(obj["branding"], defaults.branding),
    theme: sanitizeThemes(obj["theme"], defaults.theme),
    locale: sanitizeLocale(obj["locale"], defaults.locale),
    entities: sanitizeEntities(obj["entities"], defaults.entities),
  };
}

export function sanitizeBranding(raw: unknown, defaults: BrandingConfiguration) {
  const obj = isRecord(raw) ? raw : {};
  return {
    name: withDefault(obj["name"], defaults.name, isString, "branding.name"),
    logo: withDefault(obj["logo"], defaults.logo, isString, "branding.logo"),
    title: withDefault(obj["title"], defaults.title, isString, "branding.title"),
    description: withDefault(obj["description"], defaults.description, isString, "branding.description"),
  }
}

export function sanitizeThemes(raw: unknown, defaults: ThemesConfiguration) {
  const obj = isRecord(raw) ? raw : {};
  return {
    light: sanitizeTheme(obj["light"], defaults.light),
    dark: sanitizeTheme(obj["dark"], defaults.dark),
  }
}

export function sanitizeTheme(raw: unknown, defaults: Theme) {
  const obj = isRecord(raw) ? raw : {};
  return {
    primary: pickHexColor(obj["primary"], defaults.primary, "theme.primary"),
    accent: pickHexColor(obj["accent"], defaults.accent, "theme.accent"),
    tertiary: pickHexColor(obj["tertiary"], defaults.tertiary, "theme.tertiary"),
    "on-primary": pickHexColor(obj["on-primary"], defaults["on-primary"], "theme.on-primary"),
    "on-accent": pickHexColor(obj["on-accent"], defaults["on-accent"], "theme.on-accent"),
    "on-tertiary": pickHexColor(obj["on-tertiary"], defaults["on-tertiary"], "theme.on-tertiary"),
  }
}

export function sanitizeLocale(raw: unknown, defaults: LocaleConfiguration): LocaleConfiguration {
  const obj = isRecord(raw) ? raw : {};
  return {
    languages: sanitizeLanguages(obj["languages"], defaults.languages),
    translationsBaseUrl: withDefault(obj["translationsBaseUrl"], defaults.translationsBaseUrl, isString, "locale.translationsBaseUrl"),
  }
}

export function sanitizeLanguages(raw: unknown, defaults: Language[]): Language[] {
  const array = Array.isArray(raw) ? raw : [];
  const validated =  array.filter(language => isLanguage(language));
  if (validated.length === 0) {
    console.error(`Languages are not valid. Fallback to '${defaults}'`);
    return defaults;
  }
  return validated;
}

export function sanitizeEntities(raw: unknown, defaults: Record<string, EntityConfiguration>) {
  const obj = isRecord(raw) ? raw : {};
  return {
    organization: sanitizeEntity(obj["organization"], defaults["organization"]),
    project: sanitizeEntity(obj["project"], defaults["project"]),
    user: sanitizeEntity(obj["user"], defaults["user"]),
    sourceType: sanitizeEntity(obj["sourceType"], defaults["sourceType"]),
    sourceData: sanitizeEntity(obj["sourceData"], defaults["sourceData"]),
    client: sanitizeEntity(obj["client"], defaults["client"]),
    subject: sanitizeEntity(obj["subject"], defaults["subject"]),
    source: sanitizeEntity(obj["source"], defaults["source"]),
  }
}

export function sanitizeEntity(raw: unknown, defaults: EntityConfiguration) {
  const obj = isRecord(raw) ? raw : {};
  return {
    fields: sanitizeEntityFields(obj["fields"], defaults.fields),
    extraFields: sanitizeEntityExtraFields(obj["extraFields"], defaults.extraFields),
  }
}

export function sanitizeEntityFields(raw: unknown, defaults: Record<string, boolean>): Record<string, boolean> {
  const obj = isRecord(raw) ? raw : {};
  const filtered = Object.fromEntries(
    Object.entries(obj).filter(([, v]) => isBoolean(v))
  ) as Record<string, boolean>;

  if (Object.keys(filtered).length === 0) {
    console.error(`Fields are not valid. Fallback to '${defaults}'`);
    return defaults;
  }
  return filtered;
}

export function sanitizeEntityExtraFields(raw: unknown, defaults: ExtraFieldConfiguration[] = []): ExtraFieldConfiguration[] {
  const array = Array.isArray(raw) ? raw : [];
  const validated =  array.filter(f => isExtraFieldConfiguration(f));
  if (validated.length === 0) {
    return defaults;
  }
  return validated;
}

const enabled = (config: boolean | undefined | { url: string }, item: {
  name: string;
  icon: string;
  route: string;
}) => {
  if (config === undefined || config === true) return item;
  if (config === false) return undefined;
  if (config.url) return {...item, external: true, route: config.url};
  return item;
}

function isHexColor(value: unknown): value is string {
  if (typeof value !== 'string') return false;

  // Accept #RGB, #RRGGBB, #RRGGBBAA (optional alpha)
  // If you want to disallow alpha, remove the last alternative.
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value.trim());
}

function pickHexColor(value: unknown, fallback: string, name: string): string {
  if(!isHexColor(value)) {
    console.error(`${name} is not valid. Fallback to '${fallback}'`);
    return fallback;
  }
  return value;
}

// const DUMMY_OBJECT = {
//   "theme": {
//     "_comments": [
//       "`theme` defines the application color palette for both light and dark modes.",
//       "Each mode (`light` / `dark`) contains the same set of semantic color roles:",
//       "`primary`: Main brand color.",
//       "`on-primary`: Text/icon color that must be readable when placed on `primary`.",
//       "`accent`: Secondary highlight color used for emphasis.",
//       "`on-accent`: Text/icon color that must be readable when placed on `accent`.",
//       "`tertiary`: Additional supporting color for specific UI elements where `primary`/`accent` are not appropriate.",
//       "`on-tertiary`: Text/icon color that must be readable when placed on `tertiary`.",
//       "Colors are expressed as hex strings (e.g., `#004F6E`).",
//       "# Accessibility note",
//       "Ensure sufficient contrast between each background color (`primary`/`accent`/`tertiary`) and its corresponding",
//       "foreground color (`on-*`) to keep text and icons readable."
//     ],
//     "light": {
//       "primary": "#cf3666",
//       "on-primary": "#ffffff",
//       "accent": "#5c3666",
//       "on-accent": "#ffffff",
//       "tertiary": "#2d1666",
//       "on-tertiary": "#ffffff"
//     },
//     "dark": {
//       "primary": "#163f4a",
//       "on-primary": "#ffffff",
//       "accent": "#10795f",
//       "on-accent": "#ffffff",
//       "tertiary": "#85c837",
//       "on-tertiary": "#ffffff"
//     }
//   },
//   "locale": {
//     "_comments": [
//       "`locale` configures internationalization (i18n) settings and available languages.",
//       "`translationsBaseUrl`: Base path where translation JSON files are served from.",
//       "`languages`: List of selectable UI languages. Each entry defines:",
//       "`code`: Short language code used by the app (e.g., `en`, `nl`).",
//       "`locale`: Locale tag used for formatting (e.g., `en-GB`, `nl-NL`).",
//       "`label`: Human readable language name shown in the UI.",
//       "`shortLabel`: Optional compact label (e.g., for a header switcher).",
//       "`dateFormat`: Display format used for dates in the UI (keep consistent per language).",
//       "# Notes",
//       "Make sure a translation file exists per language under `translationsBaseUrl` (e.g., `assets/i18n/en.json`)."
//     ],
//     "translationsBaseUrl": "assets/i18n/",
//     "languages": [
//       {
//         "code": "en",
//         "locale": "en-GB",
//         "label": "English",
//         "shortLabel": "EN",
//         "dateFormat": "dd/MM/yyyy"
//       },
//       {
//         "code": "nl",
//         "locale": "nl-NL",
//         "label": "Nederlands",
//         "dateFormat": "dd-MM-yyyy"
//       }
//     ]
//   },
//   "branding": {
//     "_comments": [
//       "`branding` controls the product identity text and imagery shown in the UI.",
//       "`name`: Short product name (e.g., used in the header or navigation).",
//       "`title`: Main welcome / landing title shown to users.",
//       "`description`: Longer explanatory text (keep it reasonably short for layout).",
//       "`logo`: Path or URL to a logo image."
//     ],
//     "name": "RADAR-base Console",
//     "title": "Welcome to RADAR-base Console",
//     "description": "KKK Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     "logo": "assets/images/rb-logo-full-mono_resized.png"
//   },
//   "entities": {
//     "_comments": [
//       "`entities` configures which fields are visible/enabled per entity in the UI.",
//       "Each key under `entities` is an entity name (e.g., `organization`, `project`, `subject`).",
//       "For each entity:",
//       "`fields`: a map of field paths to booleans (`true` = enabled/visible, `false` = disabled/hidden).",
//       "Field paths may be nested using dot-notation (e.g., `attributes.participant_group`).",
//       "Some entities may additionally support:",
//       "`extraFields`: additional UI-defined fields that are not part of the backend model.",
//       "# Notes",
//       "Use this configuration to tailor forms and detail views without changing code.",
//       "Prefer disabling fields with `false` rather than removing them, to preserve intent and ease upgrades."
//     ],
//     "organization": {
//       "_comments": [
//         "`organization` controls which Organization fields are shown in Organization forms/views.",
//         "Supported field keys:",
//         "- `location`",
//         "- `description`",
//         "- `projects`"
//       ],
//       "fields": {
//         "location": false,
//         "description": false,
//         "_projects": false
//       }
//     },
//     "project": {
//       "_comments": [
//         "`project` controls which Project fields are shown in Project forms/views.",
//         "Supported field keys:",
//         "- `location`",
//         "- `description`",
//         "- `startDate`",
//         "- `endDate`",
//         "- `projectStatus`",
//         "- `sourceTypes`",
//         "- `humanReadableProjectName`",
//         "- `attributes`",
//         "- `attributes.Privacy-policy-url`",
//         "- `attributes.Work-package`",
//         "- `attributes.Phase`",
//         "- `attributes.External-project-url`",
//         "- `attributes.External-project-id`"
//       ],
//       "fields": {
//         "location": false,
//         "description": false,
//         "startDate": false,
//         "endDate": false,
//         "projectStatus": false,
//         "sourceTypes": false,
//         "humanReadableProjectName": false,
//         "attributes": false,
//         "attributes.Privacy-policy-url": false,
//         "attributes.Work-package": false,
//         "attributes.Phase": false,
//         "attributes.External-project-url": false,
//         "attributes.External-project-id": false
//       }
//     },
//     "client": {
//       "_comments": [
//         "`client` controls which OAuth Client fields are shown in Client forms/views.",
//         "Supported field keys:",
//         "- `resourceIds`",
//         "- `authorizedGrantTypes`",
//         "- `dynamic_registration`",
//         "- `accessTokenValiditySeconds`",
//         "- `refreshTokenValiditySeconds`",
//         "- `scope`",
//         "- `autoApproveScopes`",
//         "- `registeredRedirectUri`"
//       ],
//       "fields": {
//         "resourceIds": false,
//         "authorizedGrantTypes": false,
//         "dynamic_registration": false,
//         "accessTokenValiditySeconds": false,
//         "refreshTokenValiditySeconds": false,
//         "scope": false,
//         "autoApproveScopes": false,
//         "registeredRedirectUri": false
//       }
//     },
//     "subject": {
//       "_comments": [
//         "`subject` controls which Subject fields are shown in Subject forms/views.",
//         "Also supports `extraFields` to add UI-defined fields (e.g., additional metadata captured locally).",
//         "Supported field keys:",
//         "- `personName`",
//         "- `externalLink`",
//         "- `dateOfBirth`",
//         "- `group`",
//         "- `status`",
//         "- `sources`",
//         "- `attributes`",
//         "- `attributes.participant_group`",
//         "- `attributes.humanReadableIdentifier`",
//         "- `enrollmentDate`",
//         "- `createdBy`",
//         "- `createdDate`",
//         "- `lastModifiedBy`",
//         "- `lastModifiedDate`",
//         "Also supported:",
//         "- `extraFields[]` (array of UI-defined fields)"
//       ],
//       "fields": {
//         "personName": false,
//         "externalLink": false,
//         "dateOfBirth": false,
//         "group": false,
//         "status": false,
//         "sources": true,
//         "attributes": false,
//         "attributes.participant_group": false,
//         "attributes.humanReadableIdentifier": false,
//         "enrollmentDate": false,
//         "createdBy": false,
//         "createdDate": false,
//         "lastModifiedBy": false,
//         "lastModifiedDate": false
//       },
//       "extraFields": []
//     },
//     "user": {
//       "_comments": [
//         "`user` controls which User fields are shown in User forms/views.",
//         "Supported field keys:",
//         "- `firstName`",
//         "- `lastName`",
//         "- `createdBy`",
//         "- `createdDate`",
//         "- `lastModifiedBy`",
//         "- `lastModifiedDate`",
//         "- `langKey`"
//       ],
//       "fields": {
//         "firstName": false,
//         "lastName": false,
//         "createdBy": false,
//         "createdDate": false,
//         "lastModifiedBy": false,
//         "lastModifiedDate": false,
//         "langKey": false
//       }
//     },
//     "sourceType": {
//       "_comments": [
//         "`sourceType` controls which Source Type fields are shown in Source Type forms/views.",
//         "Supported field keys:",
//         "- `description`",
//         "- `appProvider`",
//         "- `assessmentType`",
//         "- `name`",
//         "- `sourceTypeScope`",
//         "- `canRegisterDynamically`",
//         "- `sourceData`"
//       ],
//       "fields": {
//         "description": false,
//         "appProvider": false,
//         "assessmentType": false,
//         "name": false,
//         "sourceTypeScope": false,
//         "canRegisterDynamically": false,
//         "sourceData": false
//       }
//     },
//     "sourceData": {
//       "_comments": [
//         "`sourceData` controls which Source Data fields are shown in Source Data forms/views.",
//         "Supported field keys:",
//         "- `topic`",
//         "- `processingState`",
//         "- `keySchema`",
//         "- `valueSchema`",
//         "- `frequency`",
//         "- `unit`"
//       ],
//       "fields": {
//         "topic": false,
//         "processingState": false,
//         "keySchema": false,
//         "valueSchema": false,
//         "frequency": false,
//         "unit": false
//       }
//     },
//     "source": {
//       "_comments": [
//         "`source` controls which Source fields are shown in Source forms/views.",
//         "Supported field keys:",
//         "- `expectedSourceName`",
//         "- `attributes`",
//         "- `attributes.External-identifier`"
//       ],
//       "fields": {
//         "expectedSourceName": false,
//         "attributes": true,
//         "attributes.External-identifier": true
//       }
//     }
//   }
// }
// const DUMMY_STRING = JSON.stringify(DUMMY_OBJECT);
