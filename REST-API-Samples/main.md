1. http://localhost/managementportal/i18n/en.json
2. http://localhost/managementportal/api/account 
GET 
401 Unauthorized

```
{"error": "Unauthorized",
"status": "401",
message": "No token provided",
"path": "/managementportal/api/account"}
```
3. http://localhost/managementportal/oauth/token 
POST 
200 OK
```
client_id: ManagementPortalapp
username: admin
password: admin
grant_type: password
```
```
{
    "access_token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcGNvbmZpZyIsInJlc19yZXN0QXV0aG9yaXplciIsInJlc19NYW5hZ2VtZW50UG9ydGFsIiwicmVzX3VwbG9hZCJdLCJzb3VyY2VzIjpbXSwicm9sZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwic2NvcGUiOlsiU09VUkNFVFlQRS5DUkVBVEUiLCJTT1VSQ0VUWVBFLlJFQUQiLCJTT1VSQ0VUWVBFLlVQREFURSIsIlNPVVJDRVRZUEUuREVMRVRFIiwiU09VUkNFREFUQS5DUkVBVEUiLCJTT1VSQ0VEQVRBLlJFQUQiLCJTT1VSQ0VEQVRBLlVQREFURSIsIlNPVVJDRURBVEEuREVMRVRFIiwiU09VUkNFLkNSRUFURSIsIlNPVVJDRS5SRUFEIiwiU09VUkNFLlVQREFURSIsIlNPVVJDRS5ERUxFVEUiLCJTVUJKRUNULkNSRUFURSIsIlNVQkpFQ1QuUkVBRCIsIlNVQkpFQ1QuVVBEQVRFIiwiU1VCSkVDVC5ERUxFVEUiLCJVU0VSLkNSRUFURSIsIlVTRVIuUkVBRCIsIlVTRVIuVVBEQVRFIiwiVVNFUi5ERUxFVEUiLCJST0xFLkNSRUFURSIsIlJPTEUuUkVBRCIsIlJPTEUuVVBEQVRFIiwiUk9MRS5ERUxFVEUiLCJQUk9KRUNULkNSRUFURSIsIlBST0pFQ1QuUkVBRCIsIlBST0pFQ1QuVVBEQVRFIiwiUFJPSkVDVC5ERUxFVEUiLCJPUkdBTklaQVRJT04uQ1JFQVRFIiwiT1JHQU5JWkFUSU9OLlJFQUQiLCJPUkdBTklaQVRJT04uVVBEQVRFIiwiT1JHQU5JWkFUSU9OLkRFTEVURSIsIk9BVVRIQ0xJRU5UUy5DUkVBVEUiLCJPQVVUSENMSUVOVFMuUkVBRCIsIk9BVVRIQ0xJRU5UUy5VUERBVEUiLCJPQVVUSENMSUVOVFMuREVMRVRFIiwiQVVESVQuUkVBRCIsIkFVVEhPUklUWS5SRUFEIiwiTUVBU1VSRU1FTlQuUkVBRCIsIk1FQVNVUkVNRU5ULkNSRUFURSJdLCJzdWIiOiJhZG1pbiIsImlzcyI6Ik1hbmFnZW1lbnRQb3J0YWwiLCJ1c2VyX25hbWUiOiJhZG1pbiIsImNsaWVudF9pZCI6Ik1hbmFnZW1lbnRQb3J0YWxhcHAiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJleHAiOjE3ODg3MTU0NjksImlhdCI6MTc4ODcwMTA2OX0.ZmW6fdjPBkVIHvd9OPb9KQRPb1ulhQFTX2jUCN7u8HSrhZF1CSEQTVCZ15t6vyEMmE08-a83aLwnrFO98rnuHw",
    "token_type": "bearer",
    "refresh_token": "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzX2FwcGNvbmZpZyIsInJlc19yZXN0QXV0aG9yaXplciIsInJlc19NYW5hZ2VtZW50UG9ydGFsIiwicmVzX3VwbG9hZCJdLCJzb3VyY2VzIjpbXSwicm9sZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9TWVNfQURNSU4iXSwic2NvcGUiOlsiU09VUkNFVFlQRS5DUkVBVEUiLCJTT1VSQ0VUWVBFLlJFQUQiLCJTT1VSQ0VUWVBFLlVQREFURSIsIlNPVVJDRVRZUEUuREVMRVRFIiwiU09VUkNFREFUQS5DUkVBVEUiLCJTT1VSQ0VEQVRBLlJFQUQiLCJTT1VSQ0VEQVRBLlVQREFURSIsIlNPVVJDRURBVEEuREVMRVRFIiwiU09VUkNFLkNSRUFURSIsIlNPVVJDRS5SRUFEIiwiU09VUkNFLlVQREFURSIsIlNPVVJDRS5ERUxFVEUiLCJTVUJKRUNULkNSRUFURSIsIlNVQkpFQ1QuUkVBRCIsIlNVQkpFQ1QuVVBEQVRFIiwiU1VCSkVDVC5ERUxFVEUiLCJVU0VSLkNSRUFURSIsIlVTRVIuUkVBRCIsIlVTRVIuVVBEQVRFIiwiVVNFUi5ERUxFVEUiLCJST0xFLkNSRUFURSIsIlJPTEUuUkVBRCIsIlJPTEUuVVBEQVRFIiwiUk9MRS5ERUxFVEUiLCJQUk9KRUNULkNSRUFURSIsIlBST0pFQ1QuUkVBRCIsIlBST0pFQ1QuVVBEQVRFIiwiUFJPSkVDVC5ERUxFVEUiLCJPUkdBTklaQVRJT04uQ1JFQVRFIiwiT1JHQU5JWkFUSU9OLlJFQUQiLCJPUkdBTklaQVRJT04uVVBEQVRFIiwiT1JHQU5JWkFUSU9OLkRFTEVURSIsIk9BVVRIQ0xJRU5UUy5DUkVBVEUiLCJPQVVUSENMSUVOVFMuUkVBRCIsIk9BVVRIQ0xJRU5UUy5VUERBVEUiLCJPQVVUSENMSUVOVFMuREVMRVRFIiwiQVVESVQuUkVBRCIsIkFVVEhPUklUWS5SRUFEIiwiTUVBU1VSRU1FTlQuUkVBRCIsIk1FQVNVUkVNRU5ULkNSRUFURSJdLCJzdWIiOiJhZG1pbiIsImlzcyI6Ik1hbmFnZW1lbnRQb3J0YWwiLCJ1c2VyX25hbWUiOiJhZG1pbiIsImNsaWVudF9pZCI6Ik1hbmFnZW1lbnRQb3J0YWxhcHAiLCJncmFudF90eXBlIjoicGFzc3dvcmQiLCJqdGkiOiJIWk51RXBfV1BXU2JBaURVeUtNc3JkdGx4djQiLCJhdGkiOiJRaVpya0tfdDJlUHNybUFibTl6SjdVY3hqbTAiLCJleHAiOjE3ODg5NjAyNjksImlhdCI6MTc4ODcwMTA2OX0.Rt9AH4oU0ovM5B7thwfchUS0p74aF56tpLNmumHGqoEgxey8TNPqVvm7uLzCONbxADA65fSmXSNRsewgHwao_A",
    "expires_in": 14399,
    "scope": "SOURCETYPE.CREATE SOURCETYPE.READ SOURCETYPE.UPDATE SOURCETYPE.DELETE SOURCEDATA.CREATE SOURCEDATA.READ SOURCEDATA.UPDATE SOURCEDATA.DELETE SOURCE.CREATE SOURCE.READ SOURCE.UPDATE SOURCE.DELETE SUBJECT.CREATE SUBJECT.READ SUBJECT.UPDATE SUBJECT.DELETE USER.CREATE USER.READ USER.UPDATE USER.DELETE ROLE.CREATE ROLE.READ ROLE.UPDATE ROLE.DELETE PROJECT.CREATE PROJECT.READ PROJECT.UPDATE PROJECT.DELETE ORGANIZATION.CREATE ORGANIZATION.READ ORGANIZATION.UPDATE ORGANIZATION.DELETE OAUTHCLIENTS.CREATE OAUTHCLIENTS.READ OAUTHCLIENTS.UPDATE OAUTHCLIENTS.DELETE AUDIT.READ AUTHORITY.READ MEASUREMENT.READ MEASUREMENT.CREATE",
    "sub": "admin",
    "sources": [],
    "grant_type": "password",
    "roles": [
        "ROLE_SYS_ADMIN"
    ],
    "iss": "ManagementPortal",
    "iat": 1788701069,
    "jti": "QiZrkK_t2ePsrmAbm9zJ7Ucxjm0"
}
```

4. http://localhost/managementportal/api/login
POST
200 OK
```
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
    "lastModifiedDate": "2026-08-29T15:23:01.324Z",
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
```
5. http://localhost/managementportal/api/organizations
GET
200 OK
```json
[
    {
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
            },
            {
                "id": 9051,
                "projectName": "demo",
                "description": "Description",
                "organizationName": "main",
                "location": "Utrecht",
                "startDate": "2026-07-31T22:00:00Z",
                "projectStatus": "PLANNING",
                "endDate": "2026-08-31T21:59:00Z",
                "attributes": {
                    "External-project-id": "1",
                    "Phase": "1"
                }
            },
            {
                "id": 15852,
                "projectName": "game",
                "description": "",
                "organizationName": "main",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Work-package": ""
                }
            },
            {
                "id": 15854,
                "projectName": "Game3",
                "description": "",
                "organizationName": "main",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Work-package": ""
                }
            }
        ]
    },
    {
        "id": 4751,
        "name": "The Hyve555666",
        "description": "The Hyve BV2",
        "location": "Utrecht",
        "projects": [
            {
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
            {
                "id": 15853,
                "projectName": "Game2",
                "description": "",
                "organizationName": "The Hyve555666",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Work-package": ""
                }
            },
            {
                "id": 15855,
                "projectName": "Game4",
                "description": "",
                "organizationName": "The Hyve555666",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Work-package": ""
                }
            },
            {
                "id": 15856,
                "projectName": "Game 5",
                "description": "",
                "organizationName": "The Hyve555666",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "one",
                    "Work-package": ""
                }
            },
            {
                "id": 15857,
                "projectName": "game6",
                "description": "",
                "organizationName": "The Hyve555666",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Work-package": ""
                }
            }
        ]
    },
    {
        "id": 4752,
        "name": "Organization 20",
        "description": "1112555",
        "location": "London",
        "projects": []
    },
    {
        "id": 9001,
        "name": "My Company",
        "description": "Description 2",
        "location": "The Hague 2",
        "projects": []
    },
    {
        "id": 9002,
        "name": "Test Org 2",
        "description": "",
        "location": "",
        "projects": []
    },
    {
        "id": 15801,
        "name": "AIMS",
        "description": "",
        "location": "",
        "projects": [
            {
                "id": 15851,
                "projectName": "AIMS-2-Trials Control Group",
                "humanReadableProjectName": "AIMS-2-Trials Control Group",
                "description": "",
                "organizationName": "AIMS",
                "location": "",
                "attributes": {
                    "External-project-id": "",
                    "External-project-url": "",
                    "Privacy-policy-url": "",
                    "Phase": "",
                    "Human-readable-project-name": "AIMS-2-Trials Control Group",
                    "Work-package": ""
                }
            }
        ]
    }
]
```
