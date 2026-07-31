const subject = {
  get: [
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc',
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc&login=58',
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc&login=58&externalId=link',
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc&login=58&externalId=link&groupId=7351&enrollmentDate.from=2026-07-29T00:00%5BEurope/Amsterdam%5D&enrollmentDate.to=2026-07-31T23:59%5BEurope/Amsterdam%5D',
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc&login=58&externalId=link&groupId=7351&enrollmentDate.from=2026-07-29T00:00%5BEurope/Amsterdam%5D&enrollmentDate.to=2026-07-31T23:59%5BEurope/Amsterdam%5D&dateOfBirth.is=2026-07-24',
    'http://localhost/managementportal/api/projects/test-project/subjects?size=20&sort=externalId,asc&groupId=7354'
  ],
  getByKey: [
    {
      url: 'http://localhost/managementportal/api/subjects/50a65e3c-e845-4e10-9edd-e3f0a6efcb76',
      method: 'GET',
      // 200 OK
      response: {
        "id": 7251,
        "externalLink": null,
        "externalId": null,
        "status": "DISCONTINUED",
        "createdBy": "system",
        "createdDate": "2026-07-30T17:53:05.879Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-07-30T18:11:25.433Z",
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
        "group": null,
        "dateOfBirth": null,
        "enrollmentDate": "2026-07-30T17:53:05.826635Z",
        "personName": null,
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [],
        "attributes": {},
        "login": "50a65e3c-e845-4e10-9edd-e3f0a6efcb76"
      }
    }
  ],
  create: [
    {
      url: 'http://localhost/managementportal/api/subjects',
      method: 'POST',
      payload: {
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
        },
        "sources": [],
        "status": 1,
        "externalLink": "link",
        "externalId": "link",
        "personName": "Peyman",
        "attributes": {
          "Human-readable-identifier": "test",
          "participant_group": "test"
        },
        "dateOfBirth": "2026-07-03T00:00:00.000Z",
        "group": "Test Group"
      },
      response: {
        "id": 7254,
        "externalLink": "link",
        "externalId": "link",
        "status": "ACTIVATED",
        "project": {
          "id": 6751,
          "projectName": "test-project",
          "description": "Test Project",
          "organizationName": "The Hyve555666",
          "location": "Utrecht",
          "attributes": {},
          "groups": [
            {
              "name": "Test Group"
            }
          ]
        },
        "group": "Test Group",
        "dateOfBirth": "2026-07-03",
        "enrollmentDate": "2026-07-30T18:08:02.738262133Z",
        "personName": "Peyman",
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [],
        "attributes": {
          "Human-readable-identifier": "test",
          "participant_group": "test"
        },
        "login": "58b0b326-8cbb-4a15-a20e-f87a76de8033"
      }
    },
    {
      payload: {
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
        },
        "sources": [],
        "status": 1,
        "group": null
      },
      response: {
        "id": 7255,
        "externalLink": null,
        "externalId": null,
        "status": "ACTIVATED",
        "project": {
          "id": 6751,
          "projectName": "test-project",
          "description": "Test Project",
          "organizationName": "The Hyve555666",
          "location": "Utrecht",
          "attributes": {},
          "groups": [
            {
              "name": "Test Group"
            }
          ]
        },
        "group": null,
        "dateOfBirth": null,
        "enrollmentDate": "2026-07-30T18:09:13.97146293Z",
        "personName": null,
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [],
        "attributes": {},
        "login": "285af971-17f2-4382-9b04-1e04bf1983a5"
      }
    }
  ],
  update: [
    {
      url: 'http://localhost/managementportal/api/subjects',
      method: 'PUT',
      payload: {
      "id": 7255,
      "externalLink": "google",
      "externalId": null,
      "status": "ACTIVATED",
      "createdBy": "system",
      "createdDate": "2026-07-30T18:09:13.991Z",
      "lastModifiedBy": "system",
      "lastModifiedDate": "2026-07-30T18:09:13.991Z",
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
            "name": "Test Group"
          }
        ],
        "persistentTokenTimeout": 2678400000
      },
      "group": null,
      "dateOfBirth": null,
      "enrollmentDate": "2026-07-30T18:09:13.971463Z",
      "personName": null,
      "roles": [
        {
          "id": 7055,
          "projectId": 6751,
          "projectName": "test-project",
          "authorityName": "ROLE_PARTICIPANT"
        }
      ],
      "sources": [],
      "attributes": {},
      "login": "285af971-17f2-4382-9b04-1e04bf1983a5"
    },
      response: {
      "id": 7255,
      "externalLink": "google",
      "externalId": null,
      "status": "ACTIVATED",
      "createdBy": "system",
      "createdDate": "2026-07-30T18:09:13.991Z",
      "lastModifiedBy": "system",
      "lastModifiedDate": "2026-07-30T18:09:13.991Z",
      "project": {
        "id": 6751,
        "projectName": "test-project",
        "description": "Test Project",
        "organizationName": "The Hyve555666",
        "location": "Utrecht",
        "attributes": {},
        "groups": [
          {
            "name": "Test Group"
          }
        ]
      },
      "group": null,
      "dateOfBirth": null,
      "enrollmentDate": "2026-07-30T18:09:13.971463Z",
      "personName": null,
      "roles": [
        {
          "id": 7055,
          "projectId": 6751,
          "projectName": "test-project",
          "authorityName": "ROLE_PARTICIPANT"
        }
      ],
      "sources": [],
      "attributes": {},
      "login": "285af971-17f2-4382-9b04-1e04bf1983a5"
    }
    }
  ],
  delete: [
    {
      url: 'http://localhost/managementportal/api/subjects/285af971-17f2-4382-9b04-1e04bf1983a5',
      method: 'DELETE',
      payload: null,
      response: null,
    }
  ],
  discontinue: [
    {
      url: 'http://localhost/managementportal/api/subjects/discontinue',
      method: 'PUT',
      payload: {
        "id": 7251,
        "externalLink": null,
        "externalId": null,
        "status": "ACTIVATED",
        "createdBy": "system",
        "createdDate": "2026-07-30T17:53:05.879Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-07-30T17:53:05.879Z",
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
              "name": "Test Group"
            }
          ],
          "persistentTokenTimeout": 2678400000
        },
        "group": null,
        "dateOfBirth": null,
        "enrollmentDate": "2026-07-30T17:53:05.826635Z",
        "personName": null,
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [],
        "attributes": {},
        "login": "50a65e3c-e845-4e10-9edd-e3f0a6efcb76"
      },
      response: {
        "id": 7251,
        "externalLink": null,
        "externalId": null,
        "status": "DISCONTINUED",
        "createdBy": "system",
        "createdDate": "2026-07-30T17:53:05.879Z",
        "lastModifiedBy": "system",
        "lastModifiedDate": "2026-07-30T17:53:05.879Z",
        "project": {
          "id": 6751,
          "projectName": "test-project",
          "description": "Test Project",
          "organizationName": "The Hyve555666",
          "location": "Utrecht",
          "attributes": {},
          "groups": [
            {
              "name": "Test Group"
            }
          ]
        },
        "group": null,
        "dateOfBirth": null,
        "enrollmentDate": "2026-07-30T17:53:05.826635Z",
        "personName": null,
        "roles": [
          {
            "id": 7055,
            "projectId": 6751,
            "projectName": "test-project",
            "authorityName": "ROLE_PARTICIPANT"
          }
        ],
        "sources": [],
        "attributes": {},
        "login": "50a65e3c-e845-4e10-9edd-e3f0a6efcb76"
      },
    }
  ],
  revision: [
    {
      url: 'http://localhost/managementportal/api/subjects/50a65e3c-e845-4e10-9edd-e3f0a6efcb76/revisions?page=0&size=20&sort=id,asc',
      method: 'GET',
      response: [
        {
          "id": 332,
          "timestamp": "2026-07-30T17:53:05.879Z",
          "author": "system",
          "entity": {
            "id": 7251,
            "externalLink": null,
            "externalId": null,
            "status": "ACTIVATED",
            "createdBy": "system",
            "createdDate": "2026-07-30T17:53:05.879Z",
            "lastModifiedBy": "system",
            "lastModifiedDate": "2026-07-30T18:11:25.433Z",
            "project": {
              "id": 6751,
              "projectName": "test-project",
              "description": "Test Project",
              "organizationName": "The Hyve555666",
              "location": "Utrecht",
              "attributes": {}
            },
            "group": null,
            "dateOfBirth": null,
            "enrollmentDate": "2026-07-30T17:53:05.826635Z",
            "personName": null,
            "roles": [
              {
                "id": 7055,
                "projectId": 6751,
                "projectName": "test-project",
                "authorityName": "ROLE_PARTICIPANT"
              }
            ],
            "sources": [],
            "attributes": {},
            "login": "50a65e3c-e845-4e10-9edd-e3f0a6efcb76"
          },
          "revisionType": "ADD"
        },
        {
          "id": 339,
          "timestamp": "2026-07-30T18:11:25.433Z",
          "author": "system",
          "entity": {
            "id": 7251,
            "externalLink": null,
            "externalId": null,
            "status": "DISCONTINUED",
            "createdBy": "system",
            "createdDate": "2026-07-30T17:53:05.879Z",
            "lastModifiedBy": "system",
            "lastModifiedDate": "2026-07-30T18:11:25.433Z",
            "project": {
              "id": 6751,
              "projectName": "test-project",
              "description": "Test Project",
              "organizationName": "The Hyve555666",
              "location": "Utrecht",
              "attributes": {}
            },
            "group": null,
            "dateOfBirth": null,
            "enrollmentDate": "2026-07-30T17:53:05.826635Z",
            "personName": null,
            "roles": [
              {
                "id": 7055,
                "projectId": 6751,
                "projectName": "test-project",
                "authorityName": "ROLE_PARTICIPANT"
              }
            ],
            "sources": [],
            "attributes": {},
            "login": "50a65e3c-e845-4e10-9edd-e3f0a6efcb76"
          },
          "revisionType": "MOD"
        }
      ]
    }
  ]
}
