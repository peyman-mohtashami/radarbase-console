import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppGroup} from "../../models/group";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';
import {UpdateTrigger} from '../../services/group-dialog.service';
import {ActionsComponent} from '../actions/actions.component';

@Component({
  selector: 'rb-group-table-row',
  templateUrl: './group-table-row.component.html',
  animations: TABLE_ANIMATION,
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

  entity$ = input.required<AppGroup>();
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
