import {Component, effect, input, signal, untracked} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';
import {AppConfig} from '../../models/config';
import {UpdateTrigger} from '../../services/config-dialog.service';
import {ActionsComponent} from '../actions/actions.component';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'rb-config-table-row',
  templateUrl: './config-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    MatIconButton,
    ActionsComponent,
    JsonPipe,
  ]
})
export class ConfigTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppConfig>();
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

      untracked(() => {
        const {mode, entity} = updateTrigger;
        if (!entity) this.updated$.set(false);
        if (entity?.id !== this.entity$().id) return;
        if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
          this.updated$.set(true);
        } else if (mode === "publish" || mode === "discard") {
          this.updated$.set(false);
        }
      });
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }
}
