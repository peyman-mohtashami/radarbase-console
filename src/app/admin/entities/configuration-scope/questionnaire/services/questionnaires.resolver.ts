import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";
import {SelectedEntitiesService} from '../../../../services/selected-entities.service';

@Injectable({providedIn: 'root'})
export class QuestionnairesResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);
  private selectedEntitiesService = inject(SelectedEntitiesService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    const project = this.selectedEntitiesService.selectedProject();
    const subject = this.selectedEntitiesService.selectedSubject();
    return this.entityService.getWithQuery(route.queryParams, project?._name, subject?._name);
  }
}
