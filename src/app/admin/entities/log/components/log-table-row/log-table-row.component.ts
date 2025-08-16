import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {PROPERTIES} from "../../config";
import {AppLog} from "../../models/log";
import {MatCard} from "@angular/material/card";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatIconButton} from "@angular/material/button";
import {AsyncPipe, NgClass} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";

@Component({
  selector: 'rb-log-table-row',
  templateUrl: './log-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconButton,
    TranslatePipe,
    AsyncPipe
  ]
})
export class LogTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppLog>();

  store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppLog}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.organization]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppLog) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

  updateAction(log: AppLog, level: string) {
    // const updatedLog = {
    //   id: log.id,
    //   name: log.name,
    //   level,
    // };
    // this.update(updatedLog).subscribe({
    //   next: () => this.updateTrigger$.next(updatedLog.name || '0'),
    //   error: (err) => console.log(err),
    // });
  }
}
