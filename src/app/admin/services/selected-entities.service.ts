import {Injectable, signal} from '@angular/core';
import {AppOrganization} from '../entities/organization/models/organization';
import {AppProject} from '../entities/project/models/project';
import {AppSubject} from '../entities/subject/models/subject';
import {AppClient} from '../entities/client/models/client';

@Injectable({ providedIn: 'root' })
export class SelectedEntitiesService  {
  selectedOrganization = signal<AppOrganization | undefined>(undefined);
  selectedProject = signal<AppProject | undefined>(undefined);
  selectedSubject = signal<AppSubject | undefined>(undefined);
  selectedClient = signal<AppClient | undefined>(undefined);

  setSelectedOrganization(organization: AppOrganization) {
    this.selectedProject.set(undefined);
    this.selectedSubject.set(undefined);
    this.selectedClient.set(undefined);
    this.selectedOrganization.set(organization);
  }

  setSelectedProject(project: AppProject) {
    this.selectedSubject.set(undefined);
    this.selectedClient.set(undefined);
    this.selectedProject.set(project);
  }

  setSelectedSubject(subject: AppSubject) {
    this.selectedSubject.set(subject);
  }

  setSelectedClient(client: AppClient) {
    this.selectedClient.set(client);
  }

  clearAllSelected() {
    this.selectedOrganization.set(undefined);
    this.selectedProject.set(undefined);
    this.selectedSubject.set(undefined);
    this.selectedClient.set(undefined);
  }
}
