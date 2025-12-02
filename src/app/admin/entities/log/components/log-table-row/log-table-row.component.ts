import {Component, inject, input, signal} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ROLES} from "../../../../../shared/enums/roles";
import {DialogMode} from "../../../../enums/dialog";
import {AppLog} from "../../models/log";
import {MatCard} from "@angular/material/card";
import {TranslatePipe} from "@ngx-translate/core";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {LogConfigService} from "../../services/log-config.service";

@Component({
  selector: 'app-log-table-row',
  templateUrl: './log-table-row.component.html',
  imports: [
    MatCard,
    TranslatePipe,
    TagComponent,
  ]
})
export class LogTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  configService = inject(LogConfigService);

  entity = input.required<AppLog>();
  extensionClass = input<string>();

  expanded = signal(false);
  updated = signal(false);

  updateAction(log: AppLog, level: string) {
    //TODO
  }
}
