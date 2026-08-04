const sourceType = {
  create: [
    {
      url: 'http://localhost/managementportal/api/source-types',
      method: 'POST',
      // x-managementportalapp-alert  managementPortalApp.sourceType.created
      // x-managementportalapp-params  demo demo 1
      //201
      payload: {
        "producer": "demo",
        "model": "demo",
        "catalogVersion": "1",
        "sourceTypeScope": "ACTIVE",
        "canRegisterDynamically": true,
        "name": "Demo Test",
        "description": "Description",
        "assessmentType": "Demo",
        "appProvider": "demo"
      },
      response: {
        "id": 9151,
        "producer": "demo",
        "model": "demo",
        "catalogVersion": "1",
        "sourceTypeScope": "ACTIVE",
        "canRegisterDynamically": true,
        "name": "Demo Test",
        "description": "Description",
        "assessmentType": "Demo",
        "appProvider": "demo"
      }
    },
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/source-types',
      method: 'PUT',
      // x-managementportalapp-alert managementPortalApp.sourceType.updated
      // x-managementportalapp-params demo demo2 1
      // 200
      payload: {
        "id": 9151,
        "producer": "demo",
        "model": "demo2",
        "catalogVersion": "1",
        "sourceTypeScope": "PASSIVE",
        "canRegisterDynamically": true,
        "name": "Demo Test",
        "description": "Description",
        "assessmentType": "Demo",
        "appProvider": "demo"
      },
      response: {
        "id": 9151,
        "producer": "demo",
        "model": "demo2",
        "catalogVersion": "1",
        "sourceTypeScope": "PASSIVE",
        "canRegisterDynamically": true,
        "name": "Demo Test",
        "description": "Description",
        "assessmentType": "Demo",
        "appProvider": "demo"
      }
    },
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/source-types/demo/demo2/1',
      method: 'DELETE',
      payload: null,
      response: null,
      // 200
      // x-managementportalapp-alert  managementPortalApp.sourceType.deleted
      // x-managementportalapp-params demo demo2 1
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/source-types',
      method: 'GET',
      //200
      // Filter No - SORT No - PAGE No
      // x-total-count 2
      response: [
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
        },
        {
          "id": 6151,
          "producer": "test",
          "model": "test",
          "catalogVersion": "test",
          "sourceTypeScope": "ACTIVE",
          "canRegisterDynamically": true,
          "name": "",
          "description": "",
          "assessmentType": "",
          "appProvider": ""
        }
      ]
    }
  ],
}
