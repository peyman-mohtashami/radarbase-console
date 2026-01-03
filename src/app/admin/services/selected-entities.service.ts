import {Injectable, signal} from '@angular/core';
import {AppOrganization} from '../entities/main-scope/organization/models/organization';
import {AppProject} from '../entities/main-scope/project/models/project';
import {AppSubject} from '../entities/project-scope/subject/models/subject';
import {AppClient} from '../entities/main-scope/client/models/client';

export enum SelectedEntities {
  ORGANIZATION = 'organization',
  PROJECT = 'project',
  SUBJECT = 'subject',
  CLIENT = 'client'
}

@Injectable({ providedIn: 'root' })
export class SelectedEntitiesService  {
  private _selectedOrganization = signal<AppOrganization | undefined>(undefined);
  private _selectedProject = signal<AppProject | undefined>(undefined);
  private _selectedSubject = signal<AppSubject | undefined>(undefined);
  private _selectedClient = signal<AppClient | undefined>(undefined);

  getSelected() {
    return {
      organization: this._selectedOrganization,
      project: this._selectedProject,
      subject: this._selectedSubject,
      client: this._selectedClient
    }
  }

  setSelected(entityName: SelectedEntities, entity: unknown) {
    console.log('Class: SelectedEntitiesService, Function: setSelected, Line 31 entityName, entity' , entityName, entity);
    switch (entityName) {
      case 'organization': {
        this._selectedOrganization.set(entity as AppOrganization);
        this._selectedProject.set(undefined);
        this._selectedSubject.set(undefined);
        this._selectedClient.set(undefined);
        break;
      }
      case 'project': {
        this._selectedProject.set(entity as AppProject);
        this._selectedSubject.set(undefined);
        this._selectedClient.set(undefined);
        break;
      }
      case 'subject': this._selectedSubject.set(entity as AppSubject); break;
      case 'client': this._selectedClient.set(entity as AppClient); break;
      default: break;
    }
  }

  clearSelected(entitiesName: SelectedEntities[]) {
    console.log('Class: SelectedEntitiesService, Function: clearSelected, Line 52 entitiesName' , entitiesName);
    entitiesName.forEach(entityName => {
      switch (entityName) {
        case 'organization': this._selectedOrganization.set(undefined); break;
        case 'project': this._selectedProject.set(undefined); break;
        case 'subject': this._selectedSubject.set(undefined); break;
        case 'client': this._selectedClient.set(undefined); break;
        default: break;
      }
    });
  }
}
