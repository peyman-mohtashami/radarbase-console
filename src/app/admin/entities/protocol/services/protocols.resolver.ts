import {inject, Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from "rxjs";

import {ProtocolService} from './protocol.service';
import {AppProtocol} from "../models/protocol";
import {SelectedEntitiesService} from '../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class ProtocolsResolver implements Resolve<AppProtocol[]> {
  private entityService = inject(ProtocolService);
  private selectedEntitiesService = inject(SelectedEntitiesService);


  resolve(): Observable<AppProtocol[]> {
    const project = this.selectedEntitiesService.selectedProject();
    const subject = this.selectedEntitiesService.selectedSubject();
    return this.entityService.getAll(project?._name, subject?._name);
  }
}
