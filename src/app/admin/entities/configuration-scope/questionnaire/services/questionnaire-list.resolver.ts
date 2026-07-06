import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {Observable} from "rxjs";
import {QuestionnaireService} from "./questionnaire.service";
import {AppQuestionnaire} from "../models/questionnaire";

@Injectable({providedIn: 'root'})
export class QuestionnaireListResolver implements Resolve<AppQuestionnaire[]> {
  private entityService = inject(QuestionnaireService);

  resolve(route: ActivatedRouteSnapshot): Observable<AppQuestionnaire[]> {
    this.entityService.clearCache();

    const projectId = route.paramMap.get('projectId');
    const subjectId = route.paramMap.get('subjectId');
    return this.entityService.getWithQuery(route.queryParams, projectId ?? undefined, subjectId ?? undefined);
  }
}
