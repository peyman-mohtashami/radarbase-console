import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';

import { DEFAULT_CONFIG } from '../consts/default-config.const';
import { environment } from '../../../../environments/environment';
import {Store} from "@ngrx/store";
import {ConfigActions} from "../store/action.types";
import {ConfigState} from "../models/config.model";

@Injectable({providedIn: 'root'})
export class ConfigService {
  constructor(
    private http: HttpClient,
    private store: Store<ConfigState>) {}

  init(): Observable<ConfigState> {
    return this.http.get<ConfigState>(environment.configUrl || "/assets/config/config.json").pipe(
      map((config) => this.validateConfig(config)),
      catchError(() => of(DEFAULT_CONFIG)),
      tap((config) => {
        this.store.dispatch(ConfigActions.setConfig(config))
      }),
    );
  }

  protected validateConfig(config: ConfigState): ConfigState {
    //TODO implement validation
    return config;
    if (config.logo) {
      return config;
    }
    return DEFAULT_CONFIG;
  }
}
