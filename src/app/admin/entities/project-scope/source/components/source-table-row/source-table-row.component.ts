import {Component, inject} from "@angular/core";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {SourceProjectComponent} from "../source-project/source-project.component";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {SourceDetailsComponent} from "../source-details/source-details.component";
import {AppSource} from '../../models/source';
import {MatTooltip} from '@angular/material/tooltip';
import {SourceConfigService} from "../../services/source-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {SourceActionsComponent} from '../source-actions/source-actions.component';

@Component({
  selector: 'app-source-table-row',
  templateUrl: './source-table-row.component.html',
  imports: [
    SourceAssignedComponent,
    SourceProjectComponent,
    SourceSourceTypeComponent,
    SourceDetailsComponent,
    MatTooltip,
    EntityTableRowComponent,
    SourceActionsComponent,
  ]
})
export class SourceTableRowComponent extends BaseEntityTableRowComponent<AppSource> {
  override configService = inject(SourceConfigService);
}
