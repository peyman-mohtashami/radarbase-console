import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {AppUser} from "../../models/user";
import {TABLE_ANIMATION} from "../../../../animation";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/permission-dialog.service';
import {PermissionRolesComponent} from '../permission-roles/permission-roles.component';
import {UserActivatedComponent} from '../../../user/components/user-activated/user-activated.component';
import {ActivateComponent} from '../../../user/components/activate/activate.component';
import {UserDetailsComponent} from '../../../user/components/user-details/user-details.component';

@Component({
  selector: 'rb-permission-table-row',
  templateUrl: './permission-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    MatIconButton,
    UserActivatedComponent,
    ActionsComponent,
    PermissionRolesComponent,
    ActivateComponent,
    UserDetailsComponent,
  ]
})
export class PermissionTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  entity$ = input.required<AppUser>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();
  organizationName$ = input<string>();
  projectName$ = input<string>();

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
