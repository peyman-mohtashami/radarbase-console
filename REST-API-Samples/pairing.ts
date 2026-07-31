const pairing = {
  pairApp: [
    {
      url: 'http://localhost/managementportal/api/oauth-clients/pair?clientId=aRMT&login=58b0b326-8cbb-4a15-a20e-f87a76de8033&persistent=false',
      method: 'GET',
      // 200 OK
      response: {
        "tokenName": "Hm9SH1oL",
        "tokenUrl": "http://localhost/managementportal/api/meta-token/Hm9SH1oL",
        "baseUrl": "http://localhost/managementportal",
        "timeout": 3600000,
        "timesOutAt": "2026-07-31T10:03:33.688170715Z"
      }
    },
    {
      url: 'http://localhost/managementportal/api/oauth-clients/pair?clientId=aRMT&login=58b0b326-8cbb-4a15-a20e-f87a76de8033&persistent=true',
      method: 'GET',
      // 200 OK
      response: {
        "tokenName": "qdqY0hQSN8al9CZf",
        "tokenUrl": "http://localhost/managementportal/api/meta-token/qdqY0hQSN8al9CZf",
        "baseUrl": "http://localhost/managementportal",
        "timeout": 2678400000,
        "timesOutAt": "2026-08-31T09:04:00.091853005Z"
      }
    },
    {
      url: 'http://localhost/managementportal/api/meta-token/Hm9SH1oL',
      method: 'DELETE',
      // No Content
    }
  ],
  pairSource: [
    {
      url: 'http://localhost/managementportal/api/subjects',
      method: 'PUT',
      // 200 OK
      payload: {
        "id": 7252,
        "externalLink": "test",
        "externalId": "test",
        "status": "ACTIVATED",
        "createdBy": "system",
        "createdDate": "2026-07-30T17:56:08.499Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-07-30T17:56:08.499Z",
        "project": {
          "id": 6751,
          "projectName": "test-project",
          "description": "Test Project",
          "organization": {
            "id": 4751,
            "name": "The Hyve555666",
            "description": "The Hyve BV2",
            "location": "Utrecht",
            "projects": []
          },
          "organizationName": "The Hyve555666",
          "location": "Utrecht",
          "sourceTypes": [
            {
              "id": 1201,
              "producer": "RADAR",
              "model": "aRMT-App",
              "catalogVersion": "1.5.0",
              "sourceTypeScope": "ACTIVE",
              "canRegisterDynamically": true,
              "name": ""
            }
          ],
          "attributes": {},
          "groups": [
            {
              "name": "Group A"
            }
          ],
          "persistentTokenTimeout": 2678400000
        },
        "group": "Group A",
        "dateOfBirth": "2026-07-10",
        "enrollmentDate": "2026-07-30T17:56:08.485116Z",
        "personName": "Test",
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [
          {
            "id": 7452,
            "sourceTypeId": 1201,
            "sourceTypeProducer": "RADAR",
            "sourceTypeModel": "aRMT-App",
            "sourceTypeCatalogVersion": "1.5.0",
            "expectedSourceName": null,
            "sourceId": "8b29ea83-dd26-499e-a024-35716f4c689d",
            "sourceName": "test2",
            "attributes": {
              "External-identifier": "test"
            },
            "assigned": false
          }
        ],
        "attributes": {
          "Human-readable-identifier": "test"
        },
        "login": "0ed25f31-6bb7-4cb9-8296-7e50257e76f1"
      },
      response: {
        "id": 7252,
        "externalLink": "test",
        "externalId": "test",
        "status": "ACTIVATED",
        "createdBy": "system",
        "createdDate": "2026-07-30T17:56:08.499Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-07-30T17:56:08.499Z",
        "project": {
          "id": 6751,
          "projectName": "test-project",
          "description": "Test Project",
          "organizationName": "The Hyve555666",
          "location": "Utrecht",
          "attributes": {},
          "groups": [
            {
              "name": "Group A"
            }
          ]
        },
        "group": "Group A",
        "dateOfBirth": "2026-07-10",
        "enrollmentDate": "2026-07-30T17:56:08.485116Z",
        "personName": "Test",
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [
          {
            "id": 7452,
            "sourceTypeId": 1201,
            "sourceTypeProducer": "RADAR",
            "sourceTypeModel": "aRMT-App",
            "sourceTypeCatalogVersion": "1.5.0",
            "expectedSourceName": null,
            "sourceId": "8b29ea83-dd26-499e-a024-35716f4c689d",
            "sourceName": "test2",
            "attributes": {
              "External-identifier": "test"
            },
            "assigned": true
          }
        ],
        "attributes": {
          "Human-readable-identifier": "test"
        },
        "login": "0ed25f31-6bb7-4cb9-8296-7e50257e76f1"
      }
    }
  ]
}
