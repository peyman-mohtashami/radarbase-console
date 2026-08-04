import {Component, inject, output, input, signal} from "@angular/core";
import {AppQuestionnaire} from "../../models/questionnaire";
import {QuestionnaireDetailsComponent} from "../questionnaire-details/questionnaire-details.component";
import {QuestionnaireConfigService} from '../../services/questionnaire-config.service';
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';
import {QuestionnaireActionsComponent} from '../questionnaire-actions/questionnaire-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {MatSlideToggle, MatSlideToggleChange} from '@angular/material/slide-toggle';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-questionnaire-table-row',
  templateUrl: './questionnaire-table-row.component.html',
  imports: [
    QuestionnaireDetailsComponent,
    EntityTableRowComponent,
    PermissionDirective,
    QuestionnaireActionsComponent,
    TranslatePipe,
    TagComponent,
    MatSlideToggle,
  ]
})
export class QuestionnaireTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(QuestionnaireConfigService);

  entity = input.required<AppQuestionnaire>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  duplicateEvent = output<void>();
  activeEvent = output<boolean>();

  onDuplicate() {
    this.duplicateEvent.emit();
  }

  protected onActiveChange($event: MatSlideToggleChange) {
    this.activeEvent.emit($event.checked);
  }
}
