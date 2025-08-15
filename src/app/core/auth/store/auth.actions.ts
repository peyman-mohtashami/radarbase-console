import { createAction, props } from '@ngrx/store';
import {ManagementPortalUser} from '../../../shared/models/auth.model';
// import { ManagementPortalUser } from "@rb/models";

export const loginOnStartUp = createAction(
  '[Auth: AuthService #init] Set User on Startup (Login)',
  props<{user: ManagementPortalUser}>()
);
export const login = createAction(
  '[Auth: AuthService #authenticateWith...] Set User (Login)',
  props<{user: ManagementPortalUser}>()
);
export const logoutPasswordGrant = createAction(
  '[Main App: Toolbar] Log out User and Navigate to Login (Password Grant)'
);
export const logoutOnUnauthorized = createAction(
  '[Auth: ServerErrorInterceptor #intercept] Log out User'
)
export const logoutSuccessPasswordGrant = createAction(
  '[Auth: AuthService #logoutPasswordGrant] User logged out (Password Grant)'
);
export const update = createAction(
  '[Auth: Profile] Update User',
  props<{user: ManagementPortalUser}>()
);
