import {Component, inject} from '@angular/core';
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';

@Component({
    selector: 'app-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
})
export class QuestionnaireDetailsComponent extends BaseEntityDetailsComponent<AppQuestionnaire>{
  override configService = inject(QuestionnaireConfigService);
}
