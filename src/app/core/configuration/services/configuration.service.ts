import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {firstValueFrom} from "rxjs";
import {SKIP_AUTH} from '../../auth/interceptors/auth.interceptor';
import {ROLES} from '../../../shared/enums/roles';
import {ENTITY_REGISTRY, EntityRegistry} from '../../../shared/consts/entity-registry';
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
import {RadarbaseAppConfigService} from './radarbase-app-config.service';
import {SKIP_ERROR} from '../../auth/interceptors/server-error.interceptor';

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  private radarbaseAppConfigService = inject(RadarbaseAppConfigService);
  private http = inject(HttpClient);

  private _navGroupItems = signal<NavGroupItem[]>([]);
  navGroupItems = this._navGroupItems.asReadonly();

  appCustomization = signal<CustomConfiguration>(DEFAULT_CUSTOM_CONFIGURATION);
  themeCustomization = computed(() => this.appCustomization()?.theme);
  brandingCustomization = computed(() => this.appCustomization()?.branding);
  localeCustomization = computed(() => this.appCustomization().locale);
  entitiesCustomization = computed(() => this.appCustomization()?.entities);

  async init(): Promise<void> {
    await this.applyDeploymentConfiguration();
    await this.applyCustomConfiguration();
  }

  private async applyCustomConfiguration() {
    try {
      const context = new HttpContext().set(SKIP_ERROR, true);
      const radarConfigBundle = await firstValueFrom(this.radarbaseAppConfigService.getRadarConfigBundle('ManagementPortalapp', undefined, undefined, context));
      const radarConfig = this.radarbaseAppConfigService.getConfig(radarConfigBundle, 'config')
      const brandingUrl = radarConfig?.value;
      if (!brandingUrl) {
        this.appCustomization.set(DEFAULT_CUSTOM_CONFIGURATION);
        return;
      }
      const customization = await firstValueFrom(this.http.get<unknown>(brandingUrl, {
        context: new HttpContext().set(SKIP_AUTH, true)
      }));
      const validatedCustomization = sanitizeCustomConfiguration(customization, DEFAULT_CUSTOM_CONFIGURATION);
      this.appCustomization.set(validatedCustomization);
      return;
    } catch {
      this.appCustomization.set(DEFAULT_CUSTOM_CONFIGURATION);
      return;
    }
  }

  private async applyDeploymentConfiguration() {
    try {
      const config = await firstValueFrom(this.http.get<unknown>(DEFAULT_DEPLOYMENT_CONFIGURATION_URL));
      const validatedConfig = sanitizeDeploymentConfiguration(config, DEFAULT_DEPLOYMENT_CONFIGURATION)
      this.setNavGroupItems(validatedConfig);
    } catch {
      this.setNavGroupItems(DEFAULT_DEPLOYMENT_CONFIGURATION);
    }
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
          // enabled(config.internal.protocol, ENTITY_REGISTRY.protocol),
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

const enabled = (config: boolean | undefined | { url: string }, item: EntityRegistry) => {
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
