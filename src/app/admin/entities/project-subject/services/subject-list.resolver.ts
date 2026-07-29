import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve,} from '@angular/router';

import {ProjectStore} from '../../project/services/project.store';
import {OrganizationStore} from '../../organization/services/organization.store';
import {SubjectStore} from './subject.store';

@Injectable({ providedIn: 'root' })
export class SubjectListResolver implements Resolve<void> {
  private subjectStore = inject(SubjectStore);
  private projectStore = inject(ProjectStore);
  // private organizationStore = inject(OrganizationStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    // const project = this.projectStore.selected();
    const res = await this.subjectStore.getWithQuery(route.queryParams);
    if (res) this.subjectStore.selected.set(null);
  }
}
