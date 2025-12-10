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

  resolve(
    route: ActivatedRouteSnapshot,
  ):
    | Observable<AppConfig[]>
    | Promise<AppConfig[]>
    | AppConfig[] {
    const currentClient: AppClient = route.parent?.parent?.data['entity'];
    let currentProject: AppProject | undefined = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
    let currentSubject: AppSubject | undefined = undefined;
    if (route.parent?.parent?.parent?.parent?.parent?.parent?.routeConfig?.path === 'subjects') {
      currentSubject = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
      currentProject = route.parent?.parent?.parent?.parent?.parent?.parent?.parent?.data['entity'];
    }
    // return this.entityService.getAll(currentClient.clientId, currentProject?.projectName, currentSubject?.login);
    return this.entityService.getWithQuery({}, currentClient.clientId, currentProject?.projectName, currentSubject?.login);
  }
}
