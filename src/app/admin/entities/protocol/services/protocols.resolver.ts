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
    console.log('Class: ProtocolsResolver, Function: resolve, Line 15 route' , route);
    console.log('Class: ProtocolsResolver, Function: resolve, Line 16 route.parent' , route.parent);
    console.log('Class: ProtocolsResolver, Function: resolve, Line 16 route.parent' , route.parent?.parent);
    console.log('Class: ProtocolsResolver, Function: resolve, Line 16 route.parent' , route.parent?.parent?.parent);
    console.log('Class: ProtocolsResolver, Function: resolve, Line 16 route.parent' , route.parent?.parent?.parent?.parent);

    let currentProject: AppProject | undefined = route.parent?.parent?.data['entity'];
    let currentSubject: AppSubject | undefined = undefined;
    if (route.parent?.parent?.parent?.parent?.routeConfig?.path === 'subjects') {
      currentSubject = route.parent?.parent?.data['entity'];
      currentProject = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
    }
    console.log('Class: ProtocolsResolver, Function: resolve, Line 21 currentProject, currentSubject' , currentProject, currentSubject);
    return this.entityService.getAll(currentProject?.projectName, currentSubject?.login);
  }
}
