import {Component, inject, input, signal} from "@angular/core";
import {AppProject} from "../../models/project";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ProjectConfigService} from "../../services/project-config.service";
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {ProjectActionsComponent} from '../project-actions/project-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-project-table-row',
  templateUrl: './project-table-row.component.html',
  imports: [
    MatCard,
    RouterLink,
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    ProjectDetailsComponent,
    PermissionDirective,
    LocalDateComponent,
    MatCardContent,
    EntityTableRowComponent,
    ProjectActionsComponent,
    MatIcon,
    TranslatePipe,
  ]
})
export class ProjectTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(ProjectConfigService);

  entity = input.required<AppProject>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
