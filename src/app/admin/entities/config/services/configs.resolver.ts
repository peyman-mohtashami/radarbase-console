import {inject, Injectable} from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from "rxjs";

import { ConfigService } from './config.service';
import {AppConfig} from "../models/config";
import {AppClient} from "../../client/models/client";
import {AppProject} from '../../project/models/project';
import {AppSubject} from "../../subject/models/subject";

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

export function getCurrentProject(route: ActivatedRouteSnapshot): AppProject | undefined {
  const projectIndex = route.pathFromRoot.findIndex(route => route.routeConfig?.path === 'projects');
  return route.pathFromRoot[projectIndex + 1].data['entity'];
}

export function getCurrentSubject(route: ActivatedRouteSnapshot): AppSubject | undefined {
  const subjectIndex = route.pathFromRoot.findIndex(route => route.routeConfig?.path === 'subjects');
  return route.pathFromRoot[subjectIndex + 1].data['entity'];

}

export function getCurrentClient(route: ActivatedRouteSnapshot): AppClient {
  const clientIndex = route.pathFromRoot.findIndex(route => route.routeConfig?.path === 'global-config' || route.routeConfig?.path === 'app-config');
  return route.pathFromRoot[clientIndex + 2].data['entity'];

}
