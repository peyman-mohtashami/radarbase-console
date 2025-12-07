import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {TableElement} from "../../../../models/table.model";
import {DetailType} from "../../../../enums/detail-type";
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
