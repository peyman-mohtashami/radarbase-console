import { createAction, props } from '@ngrx/store';
import {ConfigState} from "../models/config.model";

export const setConfig = createAction(
  '[Config: ConfigService #init] Set Config at Startup',
  props<ConfigState>()
);
