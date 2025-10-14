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
    const currentProject: AppProject = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
    // console.log('Class: ConfigsResolver, Function: resolve, Line 25 route.parent?.parent?.parent?.parent?.data' , route.parent?.parent?.parent?.parent?.data);
    // console.log('Class: ConfigsResolver, Function: resolve, Line 25 route.parent?.parent?.parent?.parent?.data' , route.parent?.parent?.parent?.parent?.parent?.data);
    // console.log('Class: ConfigsResolver, Function: resolve, Line 25 route.parent?.parent?.parent?.parent?.data' , route.parent?.parent?.parent?.parent?.parent?.parent?.data);
    // console.log('Class: ConfigsResolver, Function: resolve, Line 25 route.parent?.parent?.parent?.parent?.data' , route.parent?.parent?.parent?.parent?.parent?.parent?.parent?.parent?.data);
    console.log('Class: ConfigsResolver, Function: resolve, Line 23 currentClient' , currentClient, currentProject);
    return this.entityService.getAll(currentClient.clientId, currentProject.projectName);
  }
}
