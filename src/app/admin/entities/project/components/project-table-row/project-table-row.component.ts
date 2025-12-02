import {Component, effect, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {AppProject} from "../../models/project";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {MatIconButton} from "@angular/material/button";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/project-dialog.service';
import {ProjectConfigService} from "../../services/project-config.service";

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
    MatIconButton,
    LocalDateComponent,
    MatCardContent,
    ActionsComponent,
  ]
})
export class ProjectTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(ProjectConfigService);

  entity = input.required<AppProject>();
  entityUpdateTrigger= input<UpdateTrigger>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  expanded = signal(false);
  updated = signal(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity.id !== this.entity().id) return;
      if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
        this.updated.set(true);
        setTimeout(() => {
          this.updated.set(false);
        }, 1000);
      }
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
