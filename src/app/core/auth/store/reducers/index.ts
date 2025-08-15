import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../action.types';
import {ManagementPortalUser} from '../../../../shared/models/auth.model';
// import { ManagementPortalUser } from '@rb/models';

export interface AuthState {
  user?: ManagementPortalUser;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginOnStartUp, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.update, (state, action) => {
    return {
      ...state,
      user: { ...state.user, ...action.user },
    };
  }),

  // on(AuthActions.logoutAuthCodeGrant, (state, action) => {
  //   return {
  //     ...state,
  //     user: undefined
  //   };
  // }),
  // on(AuthActions.logoutAuthCodeGrantAndNavigate, (state, action) => {
  //   return {
  //     ...state,
  //     user: undefined
  //   };
  // }),
  on(AuthActions.logoutOnUnauthorized, (state) => {
    return {
      ...state,
      user: undefined
    };
  }),
  on(AuthActions.logoutSuccessPasswordGrant, (state) => {
      return {
        ...state,
        user: undefined
      };
    })
);
