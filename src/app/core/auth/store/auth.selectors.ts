import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth')

export const user = createSelector(
  selectAuthState,
  auth => auth.user
)

export const isLoggedIn = createSelector(
  user,
  user => !!user
)

export const isLoggedOut = createSelector(
  user,
  user => !user
)
