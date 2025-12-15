import {Component, inject} from "@angular/core";
import {AppSourceData} from "../../models/source-data";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {ActionsComponent} from '../actions/actions.component';
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
  imports: [
    RouterLink,
    SourceDataSourceTypeComponent,
    SourceDataProcessingStateComponent,
    SourceDataDetailsComponent,
    ActionsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class SourceDataTableRowComponent extends BaseEntityComponent<AppSourceData>{
  override configService = inject(SourceDataConfigService);
}
