import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthActions } from "../../core/auth/store/action.types";

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export function logger(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    if (
      action.type === AuthActions.logoutPasswordGrant.type
    ) {
      return reducer({ ...state, entityCache: undefined }, action);
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [clearState, logger];
