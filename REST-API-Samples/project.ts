const project = {
  create: [
    {
      url: 'http://localhost/managementportal/api/projects',
      method: 'POST',
      // x-managementportalapp-alert managementPortalApp.project.created
      // x-managementportalapp-params demo
      // 201
      payload: {
        "organization": {
          "id": 1,
          "name": "main",
          "description": "The main organization",
          "location": "gfgd",
          "projects": [
            {
              "id": 1101,
              "projectName": "radar",
              "description": "",
              "organizationName": "main",
              "location": "",
              "attributes": {},
              "groups": [
                {
                  "name": "Group A"
                },
                {
                  "name": "Group B"
                }
              ]
            }
          ]
        },
        "sourceTypes": [
          {
            "id": 1201,
            "producer": "RADAR",
            "model": "aRMT-App",
            "catalogVersion": "1.5.0",
            "sourceTypeScope": "ACTIVE",
            "canRegisterDynamically": true,
            "name": "",
            "description": "",
            "assessmentType": "",
            "appProvider": "",
            "sourceData": [
              {
                "id": 1251,
                "sourceDataType": "test",
                "sourceDataName": "test",
                "frequency": "test",
                "unit": "test",
                "processingState": "RAW",
                "dataClass": null,
                "keySchema": "test",
                "valueSchema": "test",
                "topic": "test",
                "provider": null,
                "enabled": true
              }
            ]
          }
        ],
        "projectName": "demo",
        "description": "Description",
        "location": "Utrecht",
        "projectStatus": "ONGOING",
        "attributes": {
          "Phase": "1"
        },
        "startDate": "2026-08-12T22:00:00.000Z",
        "endDate": "2026-08-30T21:59:00.000Z"
      },
      response: {
        "id": 9001,
        "name": "My Company",
        "description": "Description",
        "location": "The Hague",
        "projects": []
      },
    }
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/projects',
      method: 'PUT',
      // x-managementportalapp-alert managementPortalApp.project.updated
      // x-managementportalapp-params demo
      // 200
      payload: {
        "id": 9051,
        "projectName": "demo",
        "description": "Description",
        "organization": {
          "id": 1,
          "name": "main",
          "description": "The main organization",
          "location": "gfgd",
          "projects": [
            {
              "id": 1101,
              "projectName": "radar",
              "description": "",
              "organizationName": "main",
              "location": "",
              "attributes": {},
              "groups": [
                {
                  "name": "Group A"
                },
                {
                  "name": "Group B"
                }
              ]
            }
          ]
        },
        "organizationName": "main",
        "location": "Utrecht",
        "startDate": "2026-07-31T22:00:00.000Z",
        "projectStatus": "PLANNING",
        "endDate": "2026-08-31T21:59:00.000Z",
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
        "attributes": {
          "Phase": "1",
          "External-project-id": "1"
        },
        "persistentTokenTimeout": 2678400000
      },
      response: {
        "id": 9051,
        "projectName": "demo",
        "description": "Description",
        "organization": {
          "id": 1,
          "name": "main",
          "description": "The main organization",
          "location": "gfgd",
          "projects": []
        },
        "organizationName": "main",
        "location": "Utrecht",
        "startDate": "2026-07-31T22:00:00Z",
        "projectStatus": "PLANNING",
        "endDate": "2026-08-31T21:59:00Z",
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
        "attributes": {
          "External-project-id": "1",
          "Phase": "1"
        },
        "persistentTokenTimeout": 2678400000
      }
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/projects',
      method: 'GET',
      // 200
      // x-total-count 2
      response: [
        {
          "id": 1101,
          "projectName": "radar",
          "description": "",
          "organization": {
            "id": 1,
            "name": "main",
            "description": "The main organization",
            "location": "gfgd",
            "projects": []
          },
          "organizationName": "main",
          "location": "",
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
            },
            {
              "name": "Group B"
            }
          ],
          "persistentTokenTimeout": 2678400000
        },
        {
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
        }
      ]
      // Filter No - SORT No - PAGE No
    }
  ],
}
