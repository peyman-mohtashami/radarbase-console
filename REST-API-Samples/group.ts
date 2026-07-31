const group = {
  create: [
    {
      url: 'http://localhost/managementportal/api/projects/test-project/groups',
      method: 'POST',
      payload: {
        "projectId": 6751,
        "projectName": "test-project",
        "name": "Test Group"
      },
      response: {
        "id": 7351,
        "projectId": 6751,
        "name": "Test Group"
      }
    }
  ],
  update: null,
  delete: [
    {
      url: 'http://localhost/managementportal/api/projects/test-project/groups/GROUP%20B',
      method: 'DELETE',
      payload: null,
      response: null
    },
    {
      url: 'http://localhost/managementportal/api/projects/test-project/groups/Test%20Group',
      method: 'DELETE',
      payload: null,
      // 409 Conflict
      response: {
        "message": "Group Test Group has subjects. Add `unlinkSubjects=true` query param to confirm deletion",
        "entityName": "group",
        "errorCode": "error.validation",
        "params": {
          "timestamp": "2026-07-31 08:58:08"
        }
      }
      // http://localhost/managementportal/api/projects/test-project/groups/Test%20Group?unlinkSubjects=true
    }
  ],
  get: [
    // GET ALL / NO FILTER/PAGE/SORT
  ],
  assign: [
    {
      url: 'http://localhost/managementportal/api/projects/test-project/groups/Group%20A/subjects',
      method: 'PATCH',
      payload: [
        {
          "op": "add",
          "value": [
            {
              "id": 7254
            },
            {
              "id": 7252
            },
            {
              "id": 7253
            }
          ]
        }
      ],
      response: null,
      // 204 No Content
    }
  ]
}

