import {Component, inject} from '@angular/core';
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
    selector: 'app-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
})
export class QuestionnaireDetailsComponent extends BaseDetailsComponent<AppQuestionnaire>{
  override configService = inject(QuestionnaireConfigService);
}
