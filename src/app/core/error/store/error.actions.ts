import { createAction, props } from '@ngrx/store';
import { AppError } from '../models/error.model';

// export const setError = createAction(
//   '[Error: ??? #???] Set Error',
//   props<{error: string[];}>()
// );


export const appClientErrorOccurred = createAction(
  '[App] Client Error Occurred',
  props<{ error: AppError }>()
);

export const appServerErrorOccurred = createAction(
  '[App] Server Error Occurred',
  props<{ error: AppError }>()
);
