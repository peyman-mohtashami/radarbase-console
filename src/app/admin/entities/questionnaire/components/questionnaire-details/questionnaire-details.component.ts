import {Component, inject, input} from '@angular/core';
import {DialogMode} from "../../../../enums/dialog";
import {TableElement} from "../../../../models/table.model";
import {DetailType} from "../../../../enums/detail-type";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireConfigService} from "../../services/questionnaire-config.service";

@Component({
    selector: 'app-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
})
export class QuestionnaireDetailsComponent {
  protected readonly DetailType = DetailType;

  protected configService = inject(QuestionnaireConfigService);

  entity$ = input.required<AppQuestionnaire>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
