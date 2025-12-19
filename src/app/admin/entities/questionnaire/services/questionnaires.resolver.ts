import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";
import {getCurrentProject, getCurrentSubject} from '../../config/services/configs.resolver';

@Injectable({providedIn: 'root'})
export class QuestionnairesResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    return this.entityService.getAll(
      getCurrentProject(route)?.projectName,
      getCurrentSubject(route)?.login
    );
  }
}
