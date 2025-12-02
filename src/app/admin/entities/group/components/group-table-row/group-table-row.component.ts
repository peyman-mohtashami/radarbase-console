import {Component, effect, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {AppGroup} from "../../models/group";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {UpdateTrigger} from '../../services/group-dialog.service';
import {ActionsComponent} from '../actions/actions.component';
import {OrganizationConfigService} from "../../../organization/services/organization-config.service";

@Component({
  selector: 'app-group-table-row',
  templateUrl: './group-table-row.component.html',
  imports: [
    MatCard,
    MatIconButton,
    ActionsComponent,
  ]
})
export class GroupTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  configService = inject(OrganizationConfigService);

  entity = input.required<AppGroup>();
  entityUpdateTrigger= input<UpdateTrigger>();
  extensionClass = input<string>();

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
