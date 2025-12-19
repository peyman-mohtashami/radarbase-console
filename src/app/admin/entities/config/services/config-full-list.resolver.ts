import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import {ConfigService} from './config.service';
import {AppConfig} from "../models/config";
import {getCurrentClient, getCurrentProject, getCurrentSubject} from '../../../services/util';

@Injectable({ providedIn: 'root' })
export class ConfigsResolver implements Resolve<AppConfig[]> {
  private entityService = inject(ConfigService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppConfig[]> {
    return this.entityService.getAll(
      getCurrentClient(route).clientId,
      getCurrentProject(route)?.projectName,
      getCurrentSubject(route)?.login
    );
  }
}

