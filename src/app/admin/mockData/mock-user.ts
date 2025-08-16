// import { ManagementPortalUser } from "@rb/models";

import {ManagementPortalUser} from '../../shared/models/auth.model';

export const mockUser: ManagementPortalUser = {
  activated: true,
  authorities: ['ROLE_SYS_ADMIN'],
  email: 'admin@localhost',
  firstName: 'Administrator',
  id: 1,
  langKey: 'en',
  lastName: 'Administrator',
  login: 'admin',
  roles: [
    {
      id: 1,
      projectId: null,
      projectName: null,
      authorityName: 'ROLE_SYS_ADMIN',
    },
  ],
};
