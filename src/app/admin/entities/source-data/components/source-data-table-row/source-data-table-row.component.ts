import {Component, inject, input} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME, ROLES} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {TABLE_ANIMATION} from "../../../../animation";
import {AppSourceData} from "../../models/source-data";
import { TableElements} from "../../config";
import {MatCard} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {MatIconButton} from "@angular/material/button";
import {AsyncPipe} from "@angular/common";
import {entitiesConfig} from "../../../../../core/config/store/config.selectors";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {ActionsComponent} from '../actions/actions.component';

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
    AsyncPipe,
    ActionsComponent,
  ]
})
export class SourceDataTableRowComponent {
  protected readonly TableElements = TableElements;
  protected readonly DialogMode = DialogMode;
  protected readonly DetailType = DetailType;

  updated$ = input()
  entity$ = input.required<AppSourceData>();

  private store = inject(Store)

  expanded = false;

  config$ = this.store?.select(entitiesConfig).pipe(
    map(config => config?.[ENTITY_NAME.sourceData]?.fields ?? {})
  )

  onExpansionClick(event: MouseEvent) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }
}
