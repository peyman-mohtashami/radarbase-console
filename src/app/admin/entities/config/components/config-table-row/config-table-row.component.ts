import {Component, effect, inject, input, signal, untracked} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {AppConfig} from '../../models/config';
import {UpdateTrigger} from '../../services/config-dialog.service';
import {MatTooltip} from "@angular/material/tooltip";
import {ActionsComponent} from "../actions/actions.component";
import {ConfigConfigService} from "../../services/config-config.service";

@Component({
  selector: 'app-config-table-row',
  templateUrl: './config-table-row.component.html',
  imports: [
    MatCard,
    MatIconButton,
    MatTooltip,
    ActionsComponent,
  ]
})
export class ConfigTableRowComponent {
  configService = inject(ConfigConfigService);

  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity = input.required<AppConfig>();
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
        if (entity?.id !== this.entity().id) return;
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
