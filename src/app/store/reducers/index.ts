import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from "../../core/auth/store/action.types";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    // console.log(state, action);
    return reducer(state, action);
  };
}

export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    if (
      action.type === AuthActions.logoutPasswordGrant.type
      // '[Main App: Toolbar] Log out User and Navigate to Login (Password Grant)'
    ) {
      return reducer({ ...state, entityCache: undefined }, action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [clearState, logger];
