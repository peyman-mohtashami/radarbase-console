import {Component, inject, input, output} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {PROPERTIES} from "../../config";
import {AppSource} from "../../models/source";
import {MatCard} from "@angular/material/card";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {SourceProjectComponent} from "../source-project/source-project.component";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {MatIconButton} from "@angular/material/button";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AsyncPipe} from "@angular/common";
import {SourceDetailsComponent} from "../source-details/source-details.component";
import {
  OrganizationDetailsComponent
} from "../../../organization/components/organization-details/organization-details.component";

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
    AsyncPipe,
    SourceDetailsComponent,
    OrganizationDetailsComponent
  ]
})
export class SourceTableRowComponent {
  protected readonly DetailType = DetailType;
  protected readonly ROLES = ROLES;
  protected readonly PROPERTIES = PROPERTIES;
  protected readonly DialogMode = DialogMode;

  updated = input()
  entity = input.required<AppSource>();

  private store = inject(Store)

  actionEvent = output<{mode: DialogMode, entity: AppSource}>()

  expanded = false

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.source]?.fields ?? {})
  )

  // constructor(private store: Store) {}

  onAction(mode: DialogMode, entity: AppSource) {
    this.actionEvent.emit({mode, entity});
  }


  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
