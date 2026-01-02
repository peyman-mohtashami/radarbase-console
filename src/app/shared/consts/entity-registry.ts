import {ROLES} from "../enums/roles";

export interface EntityRegistry {
  name: string; icon: string; route?: string; permissions?: { role: string; entityName?: string }[]; external?: boolean;
}

export const ENTITY_REGISTRY = {
  organization: {name: "organization", icon: "corporate_fare", route: "/admin/organizations"},
  project: {name: "project", icon: "folder_open", route: "/admin/projects"},
  user: {name: "user", icon: "person", route: "/admin/users", permission: [{role: ROLES.SYS_ADMIN}]},
  subject: {name: "subject", icon: "person_outline", route: ""},
  source: {name: "source", icon: "source", route: ""},
  group: {name: "group", icon: "portrait", route: ""},
  permission: {name: "user", icon: "person", route: ""},
  client: {name: "client", icon: "important_devices", route: "/admin/clients"},
  sourceType: {name: "sourceType", icon: "category", route: "/admin/source-types"},
  sourceData: {name: "sourceData", icon: "schema", route: "/admin/source-data"},
  audit: {name: "audit", icon: "policy", route: "/admin/audits"},
  log: {name: "log", icon: "description", route: "/admin/logs"},
  revision: {name: "revision", icon: "history", route: "/admin/revisions"},
  metrics: {name: "metrics", icon: "troubleshoot", route: "/admin/metrics"},
  health: {name: "health", icon: "heart_check", route: "/admin/health"},

  // authorizer: {icon: "person_outline", route: ""},
  appConfig: {name: "appConfig", icon: "app_settings_alt", route: "/admin/global-config"},
  config: {name: "config", icon: "app_settings_alt", route: ""},
  questionnaire: {name: "questionnaire", icon: "pending_actions", route: "/admin/questionnaires"},
  protocol: {name: "protocol", icon: "content_paste", route: "/admin/protocols"},

  dataDownload: {name: "dataDownload", icon: "file_download", route: ""},
  dataVisualization: {name: "dataVisualization", icon: "show_chart", route: ""},
  dataCompliance: {name: "dataCompliance", icon: "policy", route: ""},

  uploadPortal: {name: "uploadPortal", icon: "backup", route: "", external: true},
  dataStorage: {name: "dataStorage", icon: "storage", route: "", external: true},
  systemMonitor: {name: "systemMonitor", icon: "open_in_new", route: "", external: true},
  systemLogs: {name: "systemLogs", icon: "list_alt", route: "", external: true},
  systemStatus: {name: "systemStatus", icon: "monitor", route: "", external: true},
  grafana: {name: "grafana", icon: "table_chart_view", route: "", external: true},
  website: {name: "website", icon: "public", route: "https://radar-base.org", external: true},
  wiki: {name: "wiki", icon: "menu_book", route: "https://radar-base.atlassian.net/wiki/spaces/RAD/overview", external: true},

  // database: {icon: "storage", route: "/admin/databases"},
  // detail: {icon: "article", route: ""},
  // role: {icon: "history", route: "/admin/revisions"},
}
