import {Component, inject} from "@angular/core";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {SourceProjectComponent} from "../source-project/source-project.component";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {SourceDetailsComponent} from "../source-details/source-details.component";
import {AppSource} from '../../models/source';
import {ActionsComponent} from '../actions/actions.component';
import {TruncatePipe} from '../../../../../shared/pipes/truncate-pipe';
import {MatTooltip} from '@angular/material/tooltip';
import {SourceConfigService} from "../../services/source-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-source-table-row',
  templateUrl: './source-table-row.component.html',
  imports: [
    SourceAssignedComponent,
    SourceProjectComponent,
    SourceSourceTypeComponent,
    SourceDetailsComponent,
    ActionsComponent,
    TruncatePipe,
    MatTooltip,
    ActionsComponent,
    EntityComponent,
  ]
})
export class SourceTableRowComponent extends BaseEntityComponent<AppSource> {
  override configService = inject(SourceConfigService);
}
