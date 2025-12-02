import {Component, effect, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {ClientDetailsComponent} from "../client-details/client-details.component";
import {MatIconButton} from "@angular/material/button";
import {AppClient} from '../../models/client';
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/client-dialog.service';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {DhmsPipe} from '../../../../../shared/pipes/dhms.pipe';
import {ClientConfigService} from "../../services/client-config.service";

@Component({
  selector: 'app-client-table-row',
  templateUrl: './client-table-row.component.html',
  imports: [
    MatCard,
    RouterLink,
    TagComponent,
    DhmsPipe,
    ClientDetailsComponent,
    MatIconButton,
    ActionsComponent
  ]
})
export class ClientTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(ClientConfigService);

  entity = input.required<AppClient>();
  entityUpdateTrigger= input<UpdateTrigger>();
  extensionClass = input<string>();

  expanded = signal(false);
  updated = signal(false);

  constructor() {
    effect(() => {
      const updateTrigger = this.entityUpdateTrigger();
      if (!updateTrigger) return;

      const {mode, entity} = updateTrigger;
      if (entity.clientId !== this.entity().clientId) return;
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
