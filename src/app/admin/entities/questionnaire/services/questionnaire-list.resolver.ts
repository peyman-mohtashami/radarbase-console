import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {QuestionnaireStore} from './questionnaire.store';

@Injectable({providedIn: 'root'})
export class QuestionnaireListResolver implements Resolve<void> {
  private store = inject(QuestionnaireStore);

  async resolve(route: ActivatedRouteSnapshot): Promise<void> {
    const projectId = route.paramMap.get('projectId');
    const subjectId = route.paramMap.get('subjectId');

    const res = await this.store.getAll({projectId, subjectId});
    this.store.applyQueryParams(route.queryParams);
    if (res) this.store.selected.set(null);
  }
}
