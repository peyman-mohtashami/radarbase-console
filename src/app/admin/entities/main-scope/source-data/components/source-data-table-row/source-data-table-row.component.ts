import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {AppSourceData} from "../../models/source-data";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {SourceDataActionsComponent} from '../source-data-actions/source-data-actions.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterLink,
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    SourceDataDetailsComponent,
    EntityTableRowComponent,
    SourceDataActionsComponent,
    TranslatePipe,
  ]
})
export class SourceDataTableRowComponent extends BaseEntityTableRowComponent<AppSourceData>{
  override configService = inject(SourceDataConfigService);
}
