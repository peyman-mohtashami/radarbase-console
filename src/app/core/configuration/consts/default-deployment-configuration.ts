export const DEFAULT_DEPLOYMENT_CONFIGURATION_URL = 'config-assets/frontend-config.json'

export const DEFAULT_DEPLOYMENT_CONFIGURATION = {
  "internal": {
    // "_comments": [
    //   "Enable/disable navigation items. Missing or true = enabled; false = disabled.",
    //   "Available attributes: client, sourceType, sourceData, appConfig, protocol, questionnaire, audit, revision, health, metrics, log"
    // ],
    "client": true,
    "sourceType": true,
    "sourceData": true,
    "appConfig": true,
    "protocol": true,
    "questionnaire": true,
    "audit": true,
    "revision": true,
    "health": true,
    "metrics": true,
    "log": true
  },
  "external": {
    // "_comments": [
    //   "Enable/disable navigation items. Missing or true = enabled and default; false = disabled; {url: string;} = external URL to open.",
    //   "Available attributes: systemLogs, systemStatus, uploadPortal, dataStorage, grafana, website, wiki"
    // ],
    "systemLogs": {
      "url": "http://grafana.localhost"
    },
    "_systemStatus": {
      "url": "http://graylog.localhost"
    },
    "uploadPortal": {
      "url": "http://localhost/upload"
    },
    "dataStorage": {
      "url": "https://s3.localhost"
    },
    "grafana": {
      "url": "http://grafana.localhost"
    },
    "website": {
      "url": "https://radar-base.org/"
    },
    "wiki": {
      "url": "https://radar-base.atlassian.net/wiki/spaces/RAD/overview"
    }
  }
}

