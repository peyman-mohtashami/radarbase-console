
export interface DeploymentConfiguration {
  internal: {
    client: boolean;
    sourceType: boolean;
    sourceData: boolean;
    appConfig: boolean;
    protocol: boolean;
    questionnaire: boolean;
    audit: boolean;
    revision: boolean;
    health: boolean;
    metrics: boolean;
    log: boolean;
  };
  external: {
    systemLogs?: { url: string };
    systemStatus?: { url: string };
    uploadPortal?: { url: string };
    dataStorage?: { url: string };
    grafana?: { url: string };
    website?: { url: string };
    wiki?: { url: string };
  }
}
