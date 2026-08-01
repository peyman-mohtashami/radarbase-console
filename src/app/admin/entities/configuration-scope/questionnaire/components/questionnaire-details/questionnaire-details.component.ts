import {Component, inject, input} from '@angular/core';
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {DetailType} from '../../../../../base-entities/enums/detail-type';

@Component({
    selector: 'app-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
})
export class QuestionnaireDetailsComponent {
  configService = inject(QuestionnaireConfigService);

  entity = input.required<AppQuestionnaire | undefined>();
  detailType = input<DetailType>();
}
