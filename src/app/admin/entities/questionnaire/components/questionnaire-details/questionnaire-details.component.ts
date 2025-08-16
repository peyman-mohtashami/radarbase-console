import { Component } from '@angular/core';
import { BaseDetailsComponent } from '../../../../components/base-details/base-details.component';
import { AppQuestionnaire, AppQuestionnaireBundle } from "../../models/questionnaire";
// import { RadarQuestionnaireBundle } from "@rb/models";

@Component({
    selector: 'rb-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
})
export class QuestionnaireDetailsComponent extends BaseDetailsComponent<AppQuestionnaireBundle> {}
