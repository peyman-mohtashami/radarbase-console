import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppProject} from "../../models/project";
import {PROPERTIES} from "../../config";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {AsyncPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProjectStatusComponent} from "../project-status/project-status.component";
import {ProjectSourceTypesComponent} from "../project-source-types/project-source-types.component";
import {ProjectDetailsComponent} from "../project-details/project-details.component";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {Store} from "@ngrx/store";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {map} from "rxjs/operators";
import {ActionsComponent} from "../actions/actions.component";

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
    AsyncPipe,
    LocalDateComponent,
    ActionsComponent,
    MatCardContent,
    MatCardHeader,
  ]
})
export class ProjectTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  updated = input()
  entity = input.required<AppProject>()
  gridView = input<boolean>(false);

  private store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppProject}>()

  expanded = false;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.project]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppProject) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
