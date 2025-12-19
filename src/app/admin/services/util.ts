import {ActivatedRouteSnapshot} from '@angular/router';
import {AppProject} from '../entities/project/models/project';
import {AppSubject} from '../entities/subject/models/subject';
import {AppClient} from '../entities/client/models/client';
import {AppOrganization} from '../entities/organization/models/organization';

export function getCurrentOrganization(route: ActivatedRouteSnapshot): AppOrganization | undefined {
  const organization = route.pathFromRoot.find(route => route.data['organization']);
  return organization?.data['organization'];
}

export function getCurrentProject(route: ActivatedRouteSnapshot): AppProject | undefined {
  const project = route.pathFromRoot.find(route => route.data['project']);
  return project?.data['project'];
}

export function getCurrentSubject(route: ActivatedRouteSnapshot): AppSubject | undefined {
  const subject = route.pathFromRoot.find(route => route.data['subject']);
  return subject?.data['subject'];
}

export function getCurrentClient(route: ActivatedRouteSnapshot): AppClient {
  const client = route.pathFromRoot.find(route => route.data['client']);
  return client?.data['client'];
}
