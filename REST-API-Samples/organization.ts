const organization = {
  create: [
    {
      url: 'http://localhost/managementportal/api/organizations',
      method: 'POST',
      // x-managementportalapp-alert: managementPortalApp.organization.created
      // x-managementportalapp-params: My Company
      // 201
      payload: {
        "name": "My Company",
        "description": "Description",
        "location": "The Hague"
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
      url: 'http://localhost/managementportal/api/organizations',
      method: 'PUT',
      // x-managementportalapp-alert  managementPortalApp.organization.created
      // x-managementportalapp-params My Company
      // 200
      payload: {
        "projects": [],
        "id": 9001,
        "name": "My Company",
        "description": "Description 2",
        "location": "The Hague 2"
      },
      response: {
        "id": 9001,
        "name": "My Company",
        "description": "Description 2",
        "location": "The Hague 2",
        "projects": []
      }
    },
  ],
  get: [
    {
      url: 'http://localhost/managementportal/api/organizations',
      method: 'GET',
      response: [
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
            }
          ]
        },
        {
          "id": 4752,
          "name": "Organization 20",
          "description": "1112555",
          "location": "London",
          "projects": []
        }
      ]
      // Filter NO
      // SORT/PAGE
    }
  ],
}
