import {Component, effect, input, signal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {AppOrganization} from "../../models/organization";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {OrganizationProjectsComponent} from "../organization-projects/organization-projects.component";
import {OrganizationDetailsComponent} from "../organization-details/organization-details.component";
import {ActionsComponent} from "../actions/actions.component";
import {TableElement} from '../../../../models/table.model';
import {UpdateTrigger} from '../../services/organization-dialog.service';
import {ROLES} from '../../../../enums/entities';

@Component({
  selector: 'rb-organization-table-row',
  templateUrl: './organization-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    OrganizationProjectsComponent,
    MatIconButton,
    OrganizationDetailsComponent,
    MatCardContent,
    ActionsComponent,
  ]
})
export class OrganizationTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppOrganization>();
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
