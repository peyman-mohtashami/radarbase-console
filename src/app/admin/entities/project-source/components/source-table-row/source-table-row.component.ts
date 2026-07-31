import {Component, inject, ChangeDetectionStrategy, input, signal} from "@angular/core";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {SourceProjectComponent} from "../source-project/source-project.component";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {SourceDetailsComponent} from "../source-details/source-details.component";
import {AppSource} from '../../models/source';
import {MatTooltip} from '@angular/material/tooltip';
import {SourceConfigService} from "../../services/source-config.service";
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {SourceActionsComponent} from '../source-actions/source-actions.component';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-source-table-row',
  templateUrl: './source-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
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
export class SourceTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(SourceConfigService);

  entity = input.required<AppSource>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
