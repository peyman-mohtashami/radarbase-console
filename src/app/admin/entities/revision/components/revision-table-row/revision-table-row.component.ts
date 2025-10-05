import {Component, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppRevision} from "../../models/revision";
import {MatCard} from "@angular/material/card";
import {ModificationComponent} from "../modifications/modification.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {MatIconButton} from "@angular/material/button";
import {TableElement} from '../../../../models/table.model';

@Component({
  selector: 'rb-revision-table-row',
  templateUrl: './revision-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    ModificationComponent,
    LocalDateComponent,
    MatIconButton,
  ]
})
export class RevisionTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  entity$ = input.required<AppRevision>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded$.update((currentValue) => !currentValue);
  }
}
