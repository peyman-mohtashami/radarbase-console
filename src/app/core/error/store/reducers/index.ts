import { createReducer, on } from '@ngrx/store';
import {ErrorActions} from '../action.types';
import {AppError} from "../../models/error.model";

export interface ErrorState {
  error?: AppError; //string[];
}
export const initialErrorState: ErrorState = {};

export const errorReducer = createReducer(
  initialErrorState,
  // on(ErrorActions.setError, (state, action) => {
  //   return {
  //     ...state,
  //     error: action.error,
  //   };
  // }),
  on(ErrorActions.appServerErrorOccurred, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ErrorActions.appClientErrorOccurred, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),
);
