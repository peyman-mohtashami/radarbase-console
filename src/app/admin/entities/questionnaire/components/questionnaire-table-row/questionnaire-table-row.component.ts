import {Component, inject} from "@angular/core";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {QuestionnaireActionsComponent} from '../questionnaire-actions/questionnaire-actions.component';

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    QuestionnaireDetailsComponent,
    EntityComponent,
    PermissionDirective,
    QuestionnaireActionsComponent,
  ]
})
export class QuestionnaireTableRowComponent extends BaseEntityComponent<AppQuestionnaire> {
  override configService = inject(QuestionnaireConfigService);
}
