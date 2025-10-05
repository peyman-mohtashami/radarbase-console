import {Component, effect, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {MatCard} from "@angular/material/card";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {SourceProjectComponent} from "../source-project/source-project.component";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {MatIconButton} from "@angular/material/button";
import {SourceDetailsComponent} from "../source-details/source-details.component";
import {TableElement} from '../../../../models/table.model';
import {AppSource} from '../../models/source';
import {UpdateTrigger} from '../../services/source-dialog.service';
import {ActionsComponent} from '../actions/actions.component';
import {TruncatePipe} from '../../../../../shared/pipes/truncate-pipe';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'rb-source-table-row',
  templateUrl: './source-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    SourceAssignedComponent,
    SourceProjectComponent,
    SourceSourceTypeComponent,
    MatIconButton,
    SourceDetailsComponent,
    ActionsComponent,
    TruncatePipe,
    MatTooltip,
  ]
})
export class SourceTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppSource>();
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
