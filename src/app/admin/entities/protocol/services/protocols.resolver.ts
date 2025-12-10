import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";

import {ProtocolService} from './protocol.service';
import {AppProtocol} from "../models/protocol";
import {AppProject} from "../../project/models/project";
import {AppSubject} from "../../subject/models/subject";

@Injectable({providedIn: 'root'})
export class ProtocolsResolver implements Resolve<AppProtocol[]> {
  private entityService = inject(ProtocolService);

  resolve(route: ActivatedRouteSnapshot,): Observable<AppProtocol[]> {
    let currentProject: AppProject | undefined = route.parent?.parent?.data['entity'];
    let currentSubject: AppSubject | undefined = undefined;
    if (route.parent?.parent?.parent?.parent?.routeConfig?.path === 'subjects') {
      currentSubject = route.parent?.parent?.data['entity'];
      currentProject = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
    }
    return this.entityService.getAll(currentProject?.projectName, currentSubject?.login);
  }
}
