import {Component, inject} from "@angular/core";
import {AppProject} from "../../models/project";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ActionsComponent} from '../actions/actions.component';
import {ProjectConfigService} from "../../services/project-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

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
    ActionsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class ProjectTableRowComponent extends BaseEntityComponent<AppProject> {
  override configService = inject(ProjectConfigService);
}
