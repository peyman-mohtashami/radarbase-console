import {Component, inject} from "@angular/core";
import {AppSourceData} from "../../models/source-data";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {SourceDataActionsComponent} from '../source-data-actions/source-data-actions.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
  imports: [
    RouterLink,
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    SourceDataDetailsComponent,
    EntityComponent,
    SourceDataActionsComponent,
    TranslatePipe,
  ]
})
export class SourceDataTableRowComponent extends BaseEntityComponent<AppSourceData>{
  override configService = inject(SourceDataConfigService);
}
