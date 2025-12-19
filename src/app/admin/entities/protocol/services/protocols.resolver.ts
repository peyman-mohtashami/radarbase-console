import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";

import {ProtocolService} from './protocol.service';
import {AppProtocol} from "../models/protocol";
import {getCurrentProject, getCurrentSubject} from '../../../services/util';

@Injectable({providedIn: 'root'})
export class ProtocolsResolver implements Resolve<AppProtocol[]> {
  private entityService = inject(ProtocolService);

  resolve(route: ActivatedRouteSnapshot,): Observable<AppProtocol[]> {
    return this.entityService.getAll(
      getCurrentProject(route)?.projectName,
      getCurrentSubject(route)?.login
    );
  }
}
