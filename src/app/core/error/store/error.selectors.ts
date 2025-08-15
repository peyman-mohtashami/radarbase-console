import { createFeatureSelector, createSelector } from '@ngrx/store';
import {ErrorState} from "./reducers";
export const selectErrorState = createFeatureSelector<ErrorState>('error')


export const clientError = createSelector(
  selectErrorState,
  error => error.error
)

export const serverError = createSelector(
  selectErrorState,
  error => error.error
)
