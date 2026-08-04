const client = {
  create: [
    {
      url: 'http://localhost/managementportal/api/oauth-clients',
      method: 'POST',
      // x-managementportalapp-alert managementPortalApp.oauthClient.created
      // x-managementportalapp-params test
      //201
      payload: {
        "clientId": "test",
        "clientSecret": "",
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": "5",
        "refreshTokenValiditySeconds": "10",
        "authorities": [],
        "additionalInformation": {
          "dynamic_registration": true
        },
        "registeredRedirectUri": [
          "http://localhost.com"
        ]
      },
      response: {
        "clientId": "test",
        "clientSecret": null,
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": 5,
        "refreshTokenValiditySeconds": 10,
        "authorities": [],
        "registeredRedirectUri": [
          "http://localhost.com"
        ],
        "additionalInformation": {
          "dynamic_registration": "true"
        }
      },
    }
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/oauth-clients',
      method: 'PUT',
      // x-managementportalapp-alert  managementPortalApp.oauthClient.updated
      // x-managementportalapp-params   test
      // 200
      payload: {
        "clientId": "test",
        "clientSecret": "testsecret",
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": "58",
        "refreshTokenValiditySeconds": "108",
        "authorities": [],
        "registeredRedirectUri": [
          "http://localhost.com"
        ],
        "additionalInformation": {
          "dynamic_registration": true
        }
      },
      response: {
        "clientId": "test",
        "clientSecret": null,
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": 58,
        "refreshTokenValiditySeconds": 108,
        "authorities": [],
        "registeredRedirectUri": [
          "http://localhost.com"
        ],
        "additionalInformation": {
          "dynamic_registration": "true"
        }
      },
    },
    {
      url: 'http://localhost/managementportal/api/oauth-clients',
      method: 'PUT',
      // x-managementportalapp-alert  managementPortalApp.oauthClient.updated
      // x-managementportalapp-params   test
      // 200
      payload: {
        "clientId": "test",
        "clientSecret": null,
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": 580,
        "refreshTokenValiditySeconds": 1080,
        "authorities": [],
        "registeredRedirectUri": [
          "http://localhost.com"
        ],
        "additionalInformation": {
          "dynamic_registration": "true"
        }
      }
    }
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/oauth-clients/test',
      method: 'DELETE',
      payload: null,
      response: null,
      // 200
      // x-managementportalapp-alert
      // managementPortalApp.oauthClient.deleted
      // x-managementportalapp-params
      // test
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/oauth-clients',
      method: 'GET',
      //200
      // Filter No
      // SORT Yes - PAGE Yes
      // x-total-count 2
      response: [
        {
          "clientId": "ManagementPortalapp",
          "clientSecret": null,
          "scope": [
            "SOURCETYPE.CREATE",
            "SOURCETYPE.READ",
            "SOURCETYPE.UPDATE",
            "SOURCETYPE.DELETE",
            "SOURCEDATA.CREATE",
            "SOURCEDATA.READ",
            "SOURCEDATA.UPDATE",
            "SOURCEDATA.DELETE",
            "SOURCE.CREATE",
            "SOURCE.READ",
            "SOURCE.UPDATE",
            "SOURCE.DELETE",
            "SUBJECT.CREATE",
            "SUBJECT.READ",
            "SUBJECT.UPDATE",
            "SUBJECT.DELETE",
            "USER.CREATE",
            "USER.READ",
            "USER.UPDATE",
            "USER.DELETE",
            "ROLE.CREATE",
            "ROLE.READ",
            "ROLE.UPDATE",
            "ROLE.DELETE",
            "PROJECT.CREATE",
            "PROJECT.READ",
            "PROJECT.UPDATE",
            "PROJECT.DELETE",
            "ORGANIZATION.CREATE",
            "ORGANIZATION.READ",
            "ORGANIZATION.UPDATE",
            "ORGANIZATION.DELETE",
            "OAUTHCLIENTS.CREATE",
            "OAUTHCLIENTS.READ",
            "OAUTHCLIENTS.UPDATE",
            "OAUTHCLIENTS.DELETE",
            "AUDIT.READ",
            "AUTHORITY.READ",
            "MEASUREMENT.READ",
            "MEASUREMENT.CREATE"
          ],
          "resourceIds": [
            "res_ManagementPortal",
            "res_appconfig",
            "res_upload",
            "res_restAuthorizer"
          ],
          "authorizedGrantTypes": [
            "password",
            "refresh_token",
            "authorization_code"
          ],
          "autoApproveScopes": [
            "ORGANIZATION.DELETE",
            "SOURCEDATA.CREATE",
            "SOURCETYPE.UPDATE",
            "SOURCETYPE.DELETE",
            "PROJECT.READ",
            "ORGANIZATION.UPDATE",
            "USER.DELETE",
            "SUBJECT.DELETE",
            "SOURCEDATA.UPDATE",
            "SUBJECT.READ",
            "USER.UPDATE",
            "SOURCETYPE.CREATE",
            "ORGANIZATION.CREATE",
            "AUTHORITY.READ",
            "USER.CREATE",
            "OAUTHCLIENTS.UPDATE",
            "SOURCE.CREATE",
            "SOURCE.READ",
            "SUBJECT.CREATE",
            "ROLE.UPDATE",
            "ORGANIZATION.READ",
            "ROLE.READ",
            "MEASUREMENT.READ",
            "PROJECT.UPDATE",
            "PROJECT.DELETE",
            "ROLE.DELETE",
            "SOURCE.DELETE",
            "OAUTHCLIENTS.DELETE",
            "SOURCETYPE.READ",
            "ROLE.CREATE",
            "SOURCEDATA.DELETE",
            "SUBJECT.UPDATE",
            "SOURCE.UPDATE",
            "PROJECT.CREATE",
            "AUDIT.READ",
            "MEASUREMENT.CREATE",
            "OAUTHCLIENTS.CREATE",
            "USER.READ",
            "SOURCEDATA.READ",
            "OAUTHCLIENTS.READ"
          ],
          "accessTokenValiditySeconds": 14400,
          "refreshTokenValiditySeconds": 259200,
          "authorities": [],
          "registeredRedirectUri": null,
          "additionalInformation": {
            "protected": "true"
          }
        },
        {
          "clientId": "aRMT",
          "clientSecret": null,
          "scope": [
            "MEASUREMENT.READ",
            "MEASUREMENT.CREATE",
            "PROJECT.READ",
            "ROLE.READ",
            "SOURCE.READ",
            "SOURCEDATA.READ",
            "SOURCETYPE.READ",
            "SUBJECT.READ",
            "SUBJECT.UPDATE",
            "USER.READ"
          ],
          "resourceIds": [
            "res_gateway",
            "res_ManagementPortal",
            "res_appconfig",
            "res_AppServer",
            "res_DataDashboardAPI"
          ],
          "authorizedGrantTypes": [
            "refresh_token",
            "authorization_code"
          ],
          "autoApproveScopes": [],
          "accessTokenValiditySeconds": 43200,
          "refreshTokenValiditySeconds": 7948800,
          "authorities": [],
          "registeredRedirectUri": null,
          "additionalInformation": {
            "dynamic_registration": "true"
          }
        },
        {
          "clientId": "appconfig_frontend",
          "clientSecret": null,
          "scope": [
            "MEASUREMENT.CREATE",
            "OAUTHCLIENTS.READ",
            "PROJECT.CREATE",
            "PROJECT.READ",
            "PROJECT.UPDATE",
            "SOURCETYPE.READ",
            "SUBJECT.READ",
            "SUBJECT.UPDATE"
          ],
          "resourceIds": [
            "res_appconfig"
          ],
          "authorizedGrantTypes": [
            "authorization_code",
            "refresh_token"
          ],
          "autoApproveScopes": [
            "SOURCETYPE.READ",
            "SUBJECT.UPDATE",
            "PROJECT.CREATE",
            "MEASUREMENT.CREATE",
            "PROJECT.UPDATE",
            "PROJECT.READ",
            "OAUTHCLIENTS.READ",
            "SUBJECT.READ"
          ],
          "accessTokenValiditySeconds": 900,
          "refreshTokenValiditySeconds": 78000,
          "authorities": [],
          "registeredRedirectUri": [
            "http://localhost/appconfig/login"
          ],
          "additionalInformation": {}
        },
        {
          "clientId": "pRMT",
          "clientSecret": null,
          "scope": [
            "MEASUREMENT.CREATE",
            "PROJECT.READ",
            "ROLE.READ",
            "SOURCE.READ",
            "SOURCEDATA.READ",
            "SOURCETYPE.READ",
            "SUBJECT.READ",
            "SUBJECT.UPDATE",
            "USER.READ"
          ],
          "resourceIds": [
            "res_gateway",
            "res_ManagementPortal",
            "res_appconfig"
          ],
          "authorizedGrantTypes": [
            "refresh_token",
            "authorization_code"
          ],
          "autoApproveScopes": [],
          "accessTokenValiditySeconds": 43200,
          "refreshTokenValiditySeconds": 7948800,
          "authorities": [],
          "registeredRedirectUri": null,
          "additionalInformation": {
            "dynamic_registration": "true"
          }
        },
        {
          "clientId": "protocol-service",
          "clientSecret": null,
          "scope": [
            "OAUTHCLIENTS.READ",
            "PROJECT.READ",
            "SOURCETYPE.READ",
            "SUBJECT.READ",
            "SUBJECT.UPDATE"
          ],
          "resourceIds": [
            "res_appconfig"
          ],
          "authorizedGrantTypes": [
            "authorization_code",
            "refresh_token"
          ],
          "autoApproveScopes": [
            "SOURCETYPE.READ",
            "SUBJECT.UPDATE",
            "PROJECT.READ",
            "OAUTHCLIENTS.READ",
            "SUBJECT.READ"
          ],
          "accessTokenValiditySeconds": 900,
          "refreshTokenValiditySeconds": 78000,
          "authorities": [],
          "registeredRedirectUri": [
            "http://localhost/appconfig/login"
          ],
          "additionalInformation": {}
        },
        {
          "clientId": "questionnaire-service",
          "clientSecret": null,
          "scope": [
            "OAUTHCLIENTS.READ",
            "PROJECT.READ",
            "SOURCETYPE.READ",
            "SUBJECT.READ",
            "SUBJECT.UPDATE"
          ],
          "resourceIds": [
            "res_appconfig"
          ],
          "authorizedGrantTypes": [
            "authorization_code",
            "refresh_token"
          ],
          "autoApproveScopes": [
            "SOURCETYPE.READ",
            "SUBJECT.UPDATE",
            "PROJECT.READ",
            "OAUTHCLIENTS.READ",
            "SUBJECT.READ"
          ],
          "accessTokenValiditySeconds": 900,
          "refreshTokenValiditySeconds": 78000,
          "authorities": [],
          "registeredRedirectUri": [
            "http://localhost/appconfig/login"
          ],
          "additionalInformation": {}
        },
        {
          "clientId": "radar_appconfig",
          "clientSecret": null,
          "scope": [
            "MEASUREMENT.CREATE",
            "OAUTHCLIENTS.READ",
            "PROJECT.READ",
            "SOURCETYPE.READ",
            "SUBJECT.READ"
          ],
          "resourceIds": [
            "res_ManagementPortal",
            "res_appconfig"
          ],
          "authorizedGrantTypes": [
            "client_credentials"
          ],
          "autoApproveScopes": [],
          "accessTokenValiditySeconds": 900,
          "refreshTokenValiditySeconds": 0,
          "authorities": [],
          "registeredRedirectUri": null,
          "additionalInformation": {}
        }
      ],
    },
    {
      url: 'http://localhost/managementportal/api/oauth-clients/test',
      method: 'GET',
      //200
      response: {
        "clientId": "test",
        "clientSecret": null,
        "scope": [
          "test"
        ],
        "resourceIds": [
          "test"
        ],
        "authorizedGrantTypes": [
          "implicit",
          "refresh_token"
        ],
        "autoApproveScopes": [
          "test"
        ],
        "accessTokenValiditySeconds": 580,
        "refreshTokenValiditySeconds": 1080,
        "authorities": [],
        "registeredRedirectUri": [
          "http://localhost.com"
        ],
        "additionalInformation": {
          "dynamic_registration": "true"
        }
      }
    }
  ]
}
