import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";
import {AppProject} from "../../project/models/project";
import {AppSubject} from "../../subject/models/subject";

@Injectable({providedIn: 'root'})
export class QuestionnairesResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    let currentProject: AppProject | undefined = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
    let currentSubject: AppSubject | undefined = undefined;
    if (route.parent?.parent?.parent?.parent?.parent?.parent?.routeConfig?.path === 'subjects') {
      currentSubject = route.parent?.parent?.parent?.parent?.parent?.data['entity'];
      currentProject = route.parent?.parent?.parent?.parent?.parent?.parent?.parent?.data['entity'];
    }
    return this.entityService.getAll(currentProject?.projectName, currentSubject?.login);
  }
}
