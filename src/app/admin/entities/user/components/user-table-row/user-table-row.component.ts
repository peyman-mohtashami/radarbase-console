import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {PROPERTIES} from "../../config";
import {AppUser} from "../../models/user";
import {TABLE_ANIMATION} from "../../../../animation";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIconButton} from "@angular/material/button";
import {UserDetailsComponent} from "../user-details/user-details.component";
import {UserActivatedComponent} from "../user-activated/user-activated.component";
import {ActivateComponent} from "../activate/activate.component";
import {UserRolesComponent} from "../user-roles/user-roles.component";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";

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
    AsyncPipe
  ]
})
export class UserTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input<string | number>()
  entity = input.required<AppUser>()

  private store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppUser}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.sourceData]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppUser) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
