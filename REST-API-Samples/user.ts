const user = {
  create: [
    {
      url: 'http://localhost/managementportal/api/users',
      method: 'POST',
      // x-managementportalapp-alert
      // userManagement.created
      // x-managementportalapp-params
      // peyman
      //201
      payload: {
        "authorities": [],
        "login": "peyman",
        "firstName": "Peyman",
        "lastName": "M",
        "email": "peyman@thehyve.nl",
        "langKey": "en",
        "roles": [
          {
            "authorityName": "ROLE_SYS_ADMIN"
          }
        ]
      },
      response: {
        "id": 9351,
        "login": "peyman",
        "firstName": "Peyman",
        "lastName": "M",
        "email": "peyman@thehyve.nl",
        "activated": false,
        "langKey": "en",
        "resetKey": "85392658029599410564",
        "resetDate": "2026-08-04T10:35:35.430135637Z",
        "roles": [
          {
            "id": 1,
            "users": null,
            "project": null,
            "organization": null,
            "authority": {
              "name": "ROLE_SYS_ADMIN"
            },
            "role": "SYS_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_SYS_ADMIN"
        ]
      },
    },
    {
      url: 'http://localhost/managementportal/api/users',
      method: 'POST',
      // x-managementportalapp-alert
      // userManagement.created
      //
      // x-managementportalapp-params
      // peyman2
      //
      //201
      payload: {
        "authorities": [],
        "login": "peyman2",
        "firstName": "",
        "email": "peyman+1@thehyve.nl",
        "langKey": "nl",
        "roles": [
          {
            "authorityName": "ROLE_ORGANIZATION_ADMIN",
            "organizationId": 1,
            "organizationName": "main"
          },
          {
            "authorityName": "ROLE_PROJECT_ADMIN",
            "projectId": 9051,
            "projectName": "demo"
          }
        ]
      },
      response: {
        "id": 9352,
        "login": "peyman2",
        "firstName": "",
        "lastName": null,
        "email": "peyman+1@thehyve.nl",
        "activated": false,
        "langKey": "nl",
        "resetKey": "44592054014850113357",
        "resetDate": "2026-08-04T10:37:17.58886342Z",
        "roles": [
          {
            "id": 6,
            "users": null,
            "project": null,
            "organization": {
              "id": 1,
              "name": "main",
              "description": "The main organization",
              "location": "gfgd",
              "projects": null
            },
            "authority": {
              "name": "ROLE_ORGANIZATION_ADMIN"
            },
            "role": "ORGANIZATION_ADMIN"
          },
          {
            "id": 9401,
            "users": [],
            "project": {
              "id": 9051,
              "projectName": "demo",
              "description": "Description",
              "organizationName": "main",
              "organization": {
                "id": 1,
                "name": "main",
                "description": "The main organization",
                "location": "gfgd",
                "projects": null
              },
              "location": "Utrecht",
              "startDate": "2026-07-31T22:00:00Z",
              "projectStatus": "PLANNING",
              "endDate": "2026-08-31T21:59:00Z",
              "sourceTypes": null,
              "attributes": {
                "External-project-id": "1",
                "Phase": "1"
              },
              "groups": null
            },
            "organization": null,
            "authority": {
              "name": "ROLE_PROJECT_ADMIN"
            },
            "role": "PROJECT_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_ORGANIZATION_ADMIN",
          "ROLE_PROJECT_ADMIN"
        ]
      },
    },
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/users',
      method: 'PUT',
      // x-managementportalapp-alert
      // userManagement.updated
      // x-managementportalapp-params
      // peyman
      //
      // 200
      payload: {
        "id": 9351,
        "login": "peyman",
        "firstName": "Peyman",
        "lastName": "Moh",
        "email": "peyman@thehyve.nl",
        "langKey": "en",
        "createdBy": "system",
        "createdDate": "2026-08-04T10:35:35.459Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-08-04T10:35:35.459Z",
        "roles": [
          {
            "id": 1,
            "authorityName": "ROLE_SYS_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_SYS_ADMIN"
        ],
        "accessToken": null,
        "activated": false
      },
      response: {
        "id": 9351,
        "login": "peyman",
        "firstName": "Peyman",
        "lastName": "Moh",
        "email": "peyman@thehyve.nl",
        "langKey": "en",
        "createdBy": "system",
        "createdDate": "2026-08-04T10:35:35.459Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-08-04T10:35:35.459Z",
        "roles": [
          {
            "id": 1,
            "authorityName": "ROLE_SYS_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_SYS_ADMIN"
        ],
        "accessToken": null,
        "activated": false
      }
    },
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/users/peyman2',
      method: 'DELETE',
      payload: null,
      response: null,
      // 200
      // x-managementportalapp-alert
      // userManagement.deleted
      // x-managementportalapp-params
      // peyman2
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/users?page=0&size=20&sort=id,asc',
      method: 'GET',
      //200
      // Filter No
      // SORT Yes - PAGE Yes
      // x-total-count 2
      response: [
        {
          "id": 1,
          "login": "admin",
          "firstName": "Administrator",
          "lastName": "Administrator",
          "email": "admin@localhost",
          "langKey": "en",
          "createdBy": "system",
          "createdDate": "2026-07-05T10:52:07.397098Z",
          "lastModifiedBy": "system",
          "lastModifiedDate": "2026-08-04T06:29:23.165Z",
          "roles": [
            {
              "id": 1,
              "authorityName": "ROLE_SYS_ADMIN"
            }
          ],
          "authorities": [
            "ROLE_SYS_ADMIN"
          ],
          "accessToken": null,
          "activated": true
        }
      ],
    },
    {
      url: 'http://localhost/managementportal/api/users/peyman2',
      method: 'GET',
      //200
      response: {
        "id": 9352,
        "login": "peyman2",
        "firstName": "",
        "lastName": null,
        "email": "peyman+1@thehyve.nl",
        "langKey": "nl",
        "createdBy": "system",
        "createdDate": "2026-08-04T10:37:17.625Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-08-04T10:37:17.625Z",
        "roles": [
          {
            "id": 6,
            "organizationId": 1,
            "organizationName": "main",
            "authorityName": "ROLE_ORGANIZATION_ADMIN"
          },
          {
            "id": 9401,
            "projectId": 9051,
            "projectName": "demo",
            "authorityName": "ROLE_PROJECT_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_ORGANIZATION_ADMIN",
          "ROLE_PROJECT_ADMIN"
        ],
        "accessToken": null,
        "activated": false
      },
    },
    // http://localhost/managementportal/api/users?page=0&size=20&login=p&sort=id,asc
    // http://localhost/managementportal/api/users?page=0&size=20&authority=&email=thehyve&login=&sort=id,asc
    // http://localhost/managementportal/api/users?page=0&size=20&authority=&login=&sort=id,asc
    {
      // http://localhost/managementportal/api/users?includeProvenance=false
      payload: [
        {
          "id": 1,
          "login": "admin",
          "firstName": "Administrator",
          "lastName": "Administrator",
          "email": "admin@localhost",
          "langKey": "en",
          "createdBy": null,
          "createdDate": null,
          "lastModifiedBy": null,
          "lastModifiedDate": null,
          "roles": [
            {
              "id": 1,
              "authorityName": "ROLE_SYS_ADMIN"
            }
          ],
          "authorities": [
            "ROLE_SYS_ADMIN"
          ],
          "accessToken": null,
          "activated": true
        },
        {
          "id": 9351,
          "login": "peyman",
          "firstName": "Peyman",
          "lastName": "Moh",
          "email": "peyman@thehyve.nl",
          "langKey": "en",
          "createdBy": null,
          "createdDate": null,
          "lastModifiedBy": null,
          "lastModifiedDate": null,
          "roles": [
            {
              "id": 1,
              "authorityName": "ROLE_SYS_ADMIN"
            }
          ],
          "authorities": [
            "ROLE_SYS_ADMIN"
          ],
          "accessToken": null,
          "activated": false
        }
      ]
    }
],
  sendActivation: [
    {
      url: 'http://localhost/managementportal/api/account/reset-activation/init',
      method: 'POST',
      // 204
      payload: 'peyman',
      preview: null,

    }
  ],
  permission: {
    //http://localhost/managementportal/api/users
    // PUT
    // x-managementportalapp-alert
    // userManagement.updated
    // x-managementportalapp-params
    // peyman2
    payload: {
      "id": 9353,
      "login": "peyman2",
      "firstName": null,
      "lastName": null,
      "email": "peyman+2@thehyve.nl",
      "langKey": "en",
      "createdBy": null,
      "createdDate": null,
      "lastModifiedBy": null,
      "lastModifiedDate": null,
      "roles": [],
      "authorities": [],
      "accessToken": null,
      "activated": false
    },
    response: {
      "id": 9353,
      "login": "peyman2",
      "firstName": null,
      "lastName": null,
      "email": "peyman+2@thehyve.nl",
      "langKey": "en",
      "createdBy": "system",
      "createdDate": "2026-08-04T10:47:50.96Z",
      "lastModifiedBy": "system",
      "lastModifiedDate": "2026-08-04T10:47:50.96Z",
      "roles": [],
      "authorities": [],
      "accessToken": null,
      "activated": false
    },
    payloadAdd: {
      "id": 9353,
      "login": "peyman2",
      "firstName": null,
      "lastName": null,
      "email": "peyman+2@thehyve.nl",
      "langKey": "en",
      "createdBy": null,
      "createdDate": null,
      "lastModifiedBy": null,
      "lastModifiedDate": null,
      "roles": [
        {
          "authorityName": "ROLE_ORGANIZATION_ADMIN",
          "organizationId": 1,
          "organizationName": "main"
        }
      ],
      "authorities": [
        null
      ],
      "accessToken": null,
      "activated": false
    },
    responseAdd: [
      {
        "id": 1,
        "login": "admin",
        "firstName": "Administrator",
        "lastName": "Administrator",
        "email": "admin@localhost",
        "langKey": "en",
        "createdBy": null,
        "createdDate": null,
        "lastModifiedBy": null,
        "lastModifiedDate": null,
        "roles": [
          {
            "id": 1,
            "authorityName": "ROLE_SYS_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_SYS_ADMIN"
        ],
        "accessToken": null,
        "activated": true
      },
      {
        "id": 9353,
        "login": "peyman2",
        "firstName": null,
        "lastName": null,
        "email": "peyman+2@thehyve.nl",
        "langKey": "en",
        "createdBy": null,
        "createdDate": null,
        "lastModifiedBy": null,
        "lastModifiedDate": null,
        "roles": [
          {
            "id": 6,
            "organizationId": 1,
            "organizationName": "main",
            "authorityName": "ROLE_ORGANIZATION_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_ORGANIZATION_ADMIN"
        ],
        "accessToken": null,
        "activated": false
      },
      {
        "id": 9351,
        "login": "peyman",
        "firstName": "Peyman",
        "lastName": "Moh",
        "email": "peyman@thehyve.nl",
        "langKey": "en",
        "createdBy": null,
        "createdDate": null,
        "lastModifiedBy": null,
        "lastModifiedDate": null,
        "roles": [
          {
            "id": 1,
            "authorityName": "ROLE_SYS_ADMIN"
          }
        ],
        "authorities": [
          "ROLE_SYS_ADMIN"
        ],
        "accessToken": null,
        "activated": false
      }
    ]
  }

}
