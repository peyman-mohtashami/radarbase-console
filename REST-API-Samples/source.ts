const source = {
  create: [
    {
      url: 'http://localhost/managementportal/api/sources',
      method: 'POST',
      payload: {
        "sourceName": "test2",
        "assigned": false,
        "sourceType": {
          "id": 1201,
          "producer": "RADAR",
          "model": "aRMT-App",
          "catalogVersion": "1.5.0",
          "sourceTypeScope": "ACTIVE",
          "canRegisterDynamically": true,
          "name": ""
        },
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
          "persistentTokenTimeout": 2678400000,
          "startDate": null,
          "endDate": null
        }
      },
      response: {
        "id": 7451,
        "sourceId": "0b6b495d-92c6-438b-aac3-6284a77fd576",
        "sourceName": "test2",
        "expectedSourceName": null,
        "assigned": false,
        "sourceType": {
        "id": 1201,
          "producer": "RADAR",
          "model": "aRMT-App",
          "catalogVersion": "1.5.0",
          "sourceTypeScope": "ACTIVE",
          "canRegisterDynamically": true,
          "name": ""
      },
        "subjectLogin": null,
        "project": {
        "id": 6751,
          "projectName": "test-project"
      },
        "attributes": {}
      }
    },
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/sources',
      method: 'PUT',
      payload: {
        "id": 7451,
        "sourceId": "0b6b495d-92c6-438b-aac3-6284a77fd576",
        "sourceName": "test2",
        "expectedSourceName": "test2",
        "assigned": false,
        "sourceType": {
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
        },
        "subjectLogin": null,
        "project": {
          "id": 6751,
          "projectName": "test-project"
        },
        "attributes": {}
      },
      response: {
        "id": 7451,
        "sourceId": "0b6b495d-92c6-438b-aac3-6284a77fd576",
        "sourceName": "test2",
        "expectedSourceName": "test2",
        "assigned": false,
        "sourceType": {
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
        },
        "subjectLogin": null,
        "project": {
          "id": 6751,
          "projectName": "test-project"
        },
        "attributes": {}
      }
    },
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/sources/test2',
      method: 'DELETE',
      payload: null,
      response: null,
      // 400 Bad Request
      // X-Managementportalapp-Error
      // error.sourceIsAssigned
      //
      // X-Managementportalapp-Params
      // source
      // UNASSINGING SOURCE doens’t work
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/projects/test-project/sources?projectName=test-project&page=0&size=20&sort=id,desc',
      method: 'GET',
      // Filter NO
      // SORT/PAGE
    }
  ],
}
