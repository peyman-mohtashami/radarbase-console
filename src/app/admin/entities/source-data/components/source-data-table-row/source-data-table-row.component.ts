import {Component, effect, Input, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppSourceData} from "../../models/source-data";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {MatIconButton} from "@angular/material/button";
import {ActionsComponent} from '../actions/actions.component';
import {TableElement} from '../../../../models/table.model';
import {UpdateTrigger} from '../../services/source-data-dialog.service';

@Component({
  selector: 'rb-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
  animations: TABLE_ANIMATION,
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

  entity$ = input.required<AppSourceData>();
  entityUpdateTrigger$= input<UpdateTrigger>();
  tableFields$ = input.required<TableElement[]>();
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
