import { createReducer, on } from '@ngrx/store';
import { ConfigActions } from '../action.types';
import {DEFAULT_CONFIG} from "../../consts/default-config.const";
import {ConfigState} from "../../models/config.model";

export const initialConfigState: ConfigState = {...DEFAULT_CONFIG};

export const configReducer = createReducer(
  initialConfigState,
  on(ConfigActions.setConfig, (state, action) => {
    return {
      ...state,
      ...action,
    };
  }),
);
