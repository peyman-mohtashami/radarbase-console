import {Component, inject} from "@angular/core";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {ActionsComponent} from "../actions/actions.component";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    ActionsComponent,
    QuestionnaireDetailsComponent,
    ActionsComponent,
    EntityComponent,
    ActionsComponent,
    PermissionDirective,
  ]
})
export class QuestionnaireTableRowComponent extends BaseEntityComponent<AppQuestionnaire> {
  override configService = inject(QuestionnaireConfigService);
}
