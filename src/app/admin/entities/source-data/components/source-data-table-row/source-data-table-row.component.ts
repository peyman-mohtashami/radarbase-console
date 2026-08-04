import {Component, inject, input, signal} from "@angular/core";
import {AppSourceData} from "../../models/source-data";
import {RouterLink} from "@angular/router";
import {SourceDataSourceTypeComponent} from "../source-data-source-type/source-data-source-type.component";
import {SourceDataProcessingStateComponent} from "../source-data-processing-state/source-data-processing-state.component";
import {SourceDataDetailsComponent} from "../source-data-details/source-data-details.component";
import {SourceDataConfigService} from "../../services/source-data-config.service";
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {SourceDataActionsComponent} from '../source-data-actions/source-data-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';

@Component({
  selector: 'app-source-data-table-row',
  templateUrl: './source-data-table-row.component.html',
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
export class SourceDataTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(SourceDataConfigService);

  entity = input.required<AppSourceData>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
