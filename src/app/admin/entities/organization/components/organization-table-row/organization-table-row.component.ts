import {Component, inject, input, output} from "@angular/core";
import {RouterLink} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {TableElements} from "../../config";
import {TABLE_ANIMATION} from "../../../../animation";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {RbPermissionDirective} from "../../../../../core/auth/directives/ng-permission.directive";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {ActionsComponent} from "../actions/actions.component";

@Component({
  selector: 'rb-organization-table-row',
  templateUrl: './organization-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    OrganizationProjectsComponent,
    MatIconButton,
    RbPermissionDirective,
    OrganizationDetailsComponent,
    AsyncPipe,
    ActionsComponent,
    MatCardContent,
  ]
})
export class OrganizationTableRowComponent {
  protected readonly ENTITY_NAME = ENTITY_NAME;
  protected readonly TableElements = TableElements;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  updated = input()
  entity = input.required<AppOrganization>()
  gridView = input<boolean>(false);

  private store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppOrganization}>()

  expanded = false;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.organization]?.fields ?? {})
  )

  onAction(mode: DialogMode, entity: AppOrganization) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

}
