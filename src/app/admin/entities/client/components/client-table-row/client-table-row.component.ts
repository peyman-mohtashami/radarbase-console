import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppClient} from "../../models/client";
import {PROPERTIES} from "../../config";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {TagComponent} from "../../../../components/tag/tag.component";
import {ClientTagsComponent} from "../client-resource-ids/client-tags.component";
import {DhmsPipe} from "../../../../pipes/dhms.pipe";
import {ClientDetailsComponent} from "../client-details/client-details.component";
import {AsyncPipe} from "@angular/common";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'rb-client-table-row',
  templateUrl: './client-table-row.component.html',
  animations: TABLE_ANIMATION,
  imports: [
    MatCard,
    RouterLink,
    TagComponent,
    ClientTagsComponent,
    DhmsPipe,
    ClientDetailsComponent,
    AsyncPipe,
    MatIconButton
  ]
})
export class ClientTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppClient>();

  store = inject(Store);

  actionEvent = output<{mode: DialogMode, entity: AppClient}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.client]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppClient) {
    this.actionEvent.emit({mode, entity});
  }

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
