import {Component, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {AppLog} from "../../models/log";
import {MatCard, MatCardContent} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {ActionsComponent} from '../../../organization/components/actions/actions.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {
  OrganizationDetailsComponent
} from '../../../organization/components/organization-details/organization-details.component';
import {
  OrganizationProjectsComponent
} from '../../../organization/components/organization-projects/organization-projects.component';
import {PermissionDirective} from '../../../../../core/auth/directives/show-if-has-role.directive';

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  imports: [
    MatCard,
    TranslatePipe,
    TagComponent,
    ActionsComponent,
    EntityComponent,
    MatCardContent,
    OrganizationDetailsComponent,
    OrganizationProjectsComponent,
    PermissionDirective,
  ]
})
export class LogTableRowComponent extends BaseEntityComponent<AppLog>{
  override configService = inject(LogConfigService);

  updateAction(log: AppLog, level: string) {
    //TODO
  }
}
