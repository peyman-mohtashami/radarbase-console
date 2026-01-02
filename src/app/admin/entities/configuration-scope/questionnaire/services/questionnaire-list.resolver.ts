import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class QuestionnaireListResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    this.entityService.clearCache();

    const scope = route.data['scope'];
    if (scope === 'global') {
      this.selectedEntitiesService.clearAllSelected();
    } else if (scope === 'project') {
      this.selectedEntitiesService.selectedClient.set(undefined);
      this.selectedEntitiesService.selectedSubject.set(undefined);
    } else {
      this.selectedEntitiesService.selectedClient.set(undefined);
    }

    const project = this.selectedEntitiesService.selectedProject();
    const subject = this.selectedEntitiesService.selectedSubject();
    return this.entityService.getWithQuery(route.queryParams, project?._name, subject?._name);
  }
}
