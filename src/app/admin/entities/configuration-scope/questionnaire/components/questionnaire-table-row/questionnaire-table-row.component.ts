import {Component, inject} from "@angular/core";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {PermissionDirective} from '../../../../../../core/auth/directives/show-if-has-role.directive';
import {QuestionnaireActionsComponent} from '../questionnaire-actions/questionnaire-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {JsonPipe} from '@angular/common';
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {MatSlideToggle} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    QuestionnaireDetailsComponent,
    EntityTableRowComponent,
    PermissionDirective,
    QuestionnaireActionsComponent,
    TranslatePipe,
    JsonPipe,
    TagComponent,
    MatSlideToggle,
  ]
})
export class QuestionnaireTableRowComponent extends BaseEntityTableRowComponent<AppQuestionnaire> {
  override configService = inject(QuestionnaireConfigService);
}
