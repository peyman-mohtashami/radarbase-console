import {Component, effect, inject, input, signal, untracked} from "@angular/core";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";

import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {AppProtocol} from "../../models/protocol";
import {UpdateTrigger} from "../../services/protocol-dialog.service";
import {ProtocolConfigService} from "../../services/protocol-config.service";
import {ProtocolDetailsComponent} from "../protocol-details/protocol-details.component";
import {ProtocolActionsComponent} from '../protocol-actions/protocol-actions.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-protocol-table-row',
  templateUrl: './protocol-table-row.component.html',
  imports: [
    MatCard,
    MatIconButton,
    ProtocolDetailsComponent,
    ProtocolActionsComponent,
    TranslatePipe,
  ]
})
export class ProtocolTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  configService = inject(ProtocolConfigService);

  entity = input.required<AppProtocol>();
  entityUpdateTrigger= input<UpdateTrigger>();
  extensionClass = input<string>();

  expanded = signal(false);
  updated = signal(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger();
      if (!updateTrigger) return;

      untracked(() => {
        const {mode, entity} = updateTrigger;
        if (!entity) this.updated.set(false);
        if (entity?.name !== this.entity().name) return;
        if (mode === DialogMode.ADD || mode === DialogMode.EDIT) {
          this.updated.set(true);
        } else if (mode === "publish" || mode === "discard") {
          this.updated.set(false);
        }
      });
    });
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded.update((currentValue) => !currentValue);
  }
}
