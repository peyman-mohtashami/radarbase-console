import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, tap } from "rxjs";
import { filter, mergeMap } from "rxjs/operators";
import { QuestionnaireService } from "./questionnaire.service";
import { QueryParams } from "@ngrx/data";
import { select, Store } from "@ngrx/store";
import { project } from "../../../store/admin.selectors";
import { AdminActions } from "../../../store/action.types";
import { AppClient } from "../../client/models/client";
import { AppQuestionnaireBundle } from "../models/questionnaire";

@Injectable({providedIn: 'root'})
export class QuestionnairesResolver implements Resolve<AppQuestionnaireBundle[]> {
  constructor(private entityService: QuestionnaireService, private store: Store) {
    console.log(9, "QuestionnairesResolver constructor")
  }

  resolve(
    route: ActivatedRouteSnapshot,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot
  // ): Observable<AppQuestionnaireBundle[]> | Promise<AppQuestionnaireBundle[]> | AppQuestionnaireBundle[] {
  ): Observable<any> {
    console.log(9, "QuestionnairesResolver resolve")
    return this.entityService.getWithQuery()

    // this.store.dispatch(
    //   AdminActions.clientSelected({ selectedClient: {clientId: "aRMT"} as AppClient })
    // );
    //
    // const params: QueryParams = { ...route.queryParams };
    //
    // const project$ = this.store.pipe(
    //   select(project),
    //   filter(project => project !== undefined)
    // );
    //
    // return project$.pipe(
    //   mergeMap(() => this.entityService.getWithQuery(params)),
    //   tap(entities => console.log(9, "QuestionnairesResolver resolve entities", entities)),
    // )
  }
}
