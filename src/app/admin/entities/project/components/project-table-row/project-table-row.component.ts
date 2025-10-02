import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppProject} from "../../models/project";
import {MatCard, MatCardContent} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {MatIconButton} from "@angular/material/button";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {TableElement} from '../../../../models/table.model';
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/project-dialog.service';

@Component({
  selector: 'rb-project-table-row',
  templateUrl: './project-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    ProjectStatusComponent,
    ProjectSourceTypesComponent,
    ProjectDetailsComponent,
    RbPermissionDirective,
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

  entity$ = input.required<AppProject>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);
  gridView = input<boolean>(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger$();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity.id !== this.entity$().id) return;
      if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
        this.updated$.set(true);
        setTimeout(() => {
          this.updated$.set(false);
        }, 1000);
      }
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }
}
