import {Component, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppLog} from "../../models/log";
import {MatCard} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {TableElement} from '../../../../models/table.model';
import {TagComponent} from '../../../../components/tag/tag.component';

@Component({
  selector: 'rb-log-table-row',
  templateUrl: './log-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    TranslatePipe,
    TagComponent,
  ]
})
export class LogTableRowComponent {
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;

  entity$ = input.required<AppLog>();
  tableFields$ = input.required<TableElement[]>();
  configFields$ = input.required<Record<string, boolean>>();
  extensionClass$ = input<string>();

  expanded$ = signal(false);
  updated$ = signal(false);
  gridView = input<boolean>(false);

  updateAction(appLog: AppLog, trace: string) {
    //TODO
  }
}
