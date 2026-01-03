import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";
import {SelectedEntities, SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireListResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    this.entityService.clearCache();

    const scope = route.data['scope'];
    if (scope === 'global') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT, SelectedEntities.ORGANIZATION, SelectedEntities.PROJECT]);
    } else if (scope === 'project') {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT, SelectedEntities.SUBJECT]);
    } else {
      this.selectedEntitiesService.clearSelected([ SelectedEntities.CLIENT]);
    }

    const project = this.selectedEntitiesService.getSelected().project();
    const subject = this.selectedEntitiesService.getSelected().subject();
    return this.entityService.getWithQuery(route.queryParams, project?._name, subject?._name);
  }
}
