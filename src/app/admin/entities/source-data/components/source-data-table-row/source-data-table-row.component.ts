import {Component, effect, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {AppSourceData} from "../../models/source-data";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {MatIconButton} from "@angular/material/button";
import {ActionsComponent} from '../actions/actions.component';
import {UpdateTrigger} from '../../services/source-data-dialog.service';
import {SourceDataConfigService} from "../../services/source-data-config.service";

@Component({
  selector: 'app-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
  imports: [
    MatCard,
    RouterLink,
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    MatIconButton,
    SourceDataDetailsComponent,
    ActionsComponent,
  ]
})
export class SourceDataTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(SourceDataConfigService);

  entity = input.required<AppSourceData>();
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
