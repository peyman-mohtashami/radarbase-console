const sourceData = {
  create: [
    {
      url: 'http://localhost/managementportal/api/source-data',
      method: 'POST',
      // x-managementportalapp-alert managementPortalApp.sourceData.created
      // x-managementportalapp-params TestSourceDataName
      //201
      payload: {
        "sourceDataType": "Test",
        "sourceDataName": "TestSourceDataName",
        "processingState": "VENDOR",
        "keySchema": "testKey",
        "valueSchema": "testValue",
        "topic": "test",
        "frequency": "1",
        "unit": "Hertz",
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
        }
      },
      response: {
        "id": 9251,
        "sourceDataType": "Test",
        "sourceDataName": "TestSourceDataName",
        "frequency": "1",
        "unit": "Hertz",
        "processingState": "VENDOR",
        "dataClass": null,
        "keySchema": "testKey",
        "valueSchema": "testValue",
        "topic": "test",
        "provider": null,
        "sourceType": {
          "id": 1201,
          "model": "aRMT-App",
          "producer": "RADAR",
          "catalogVersion": "1.5.0"
        },
        "enabled": true
      }
    },
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/source-data',
      method: 'PUT',
      // x-managementportalapp-alert managementPortalApp.sourceData.updated
      // x-managementportalapp-params TestSourceDataName
      // 200
      payload: {
        "id": 9251,
        "sourceDataType": "Test",
        "sourceDataName": "TestSourceDataName",
        "frequency": "1",
        "unit": "Hertz",
        "processingState": "RADAR",
        "dataClass": null,
        "keySchema": "testKey",
        "valueSchema": "testValue",
        "topic": "test",
        "provider": null,
        "sourceType": {
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
        },
        "enabled": true
      },
      response: {
        "id": 9251,
        "sourceDataType": "Test",
        "sourceDataName": "TestSourceDataName",
        "frequency": "1",
        "unit": "Hertz",
        "processingState": "RADAR",
        "dataClass": null,
        "keySchema": "testKey",
        "valueSchema": "testValue",
        "topic": "test",
        "provider": null,
        "sourceType": {
          "id": 6151,
          "model": "test",
          "producer": "test",
          "catalogVersion": "test"
        },
        "enabled": true
      }
    },
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/source-data/TestSourceDataName',
      method: 'DELETE',
      payload: null,
      response: null,
      // 200
      // x-managementportalapp-alert managementPortalApp.sourceData.deleted
      // x-managementportalapp-params TestSourceDataName
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/source-data?page=0&size=20&sort=id,asc',
      method: 'GET',
      //200
      // Filter No
      // SORT Yes - PAGE Yes
      // x-total-count 2
      response: [
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
          "sourceType": {
            "id": 1201,
            "model": "aRMT-App",
            "producer": "RADAR",
            "catalogVersion": "1.5.0"
          },
          "enabled": true
        },
        {
          "id": 6601,
          "sourceDataType": "demo1",
          "sourceDataName": "demo1",
          "frequency": "12",
          "unit": "demo",
          "processingState": "UNKNOWN",
          "dataClass": null,
          "keySchema": "demo1",
          "valueSchema": "demo1",
          "topic": "demo1",
          "provider": null,
          "enabled": true
        }
      ],
    }
  ]
}
