import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {AppUser} from "../../models/user";
import {TABLE_ANIMATION} from "../../../../animation";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {ActivateComponent} from "../activate/activate.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {TableElement} from '../../../../models/table.model';
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/user-dialog.service';

@Component({
  selector: 'rb-user-table-row',
  templateUrl: './user-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    MatIconButton,
    UserDetailsComponent,
    UserActivatedComponent,
    ActivateComponent,
    UserRolesComponent,
    ActionsComponent,
  ]
})
export class UserTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  entity$ = input.required<AppUser>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);

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
