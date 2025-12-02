import {Component, effect, inject, input, signal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {ActionsComponent} from "../actions/actions.component";
import {UpdateTrigger} from '../../services/organization-dialog.service';
import {PermissionDirective} from "../../../../../core/auth/directives/show-if-has-role.directive";
import {ROLES} from "../../../../../shared/enums/roles";
import {OrganizationConfigService} from "../../services/organization-config.service";

@Component({
  selector: 'app-organization-table-row',
  templateUrl: './organization-table-row.component.html',
  imports: [
    MatCard,
    RouterLink,
    OrganizationProjectsComponent,
    MatIconButton,
    OrganizationDetailsComponent,
    MatCardContent,
    ActionsComponent,
    PermissionDirective,
  ]
})
export class OrganizationTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(OrganizationConfigService);

  entity = input.required<AppOrganization>();
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
