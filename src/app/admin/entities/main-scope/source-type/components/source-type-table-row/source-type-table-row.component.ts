import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {RouterLink} from "@angular/router";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeDetailsComponent} from "../source-type-details/source-type-details.component";
import {AppSourceType} from '../../models/source-type';
import {SourceTypeConfigService} from "../../services/source-type-config.service";
import {BaseEntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/base-entity-table-row.component';
import {EntityTableRowComponent} from '../../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {SourceTypeActionsComponent} from '../source-type-actions/source-type-actions.component';

@Component({
  selector: 'app-source-type-table-row',
  templateUrl: './source-type-table-row.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    RouterLink,
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeDetailsComponent,
    EntityTableRowComponent,
    SourceTypeActionsComponent,
  ]
})
export class SourceTypeTableRowComponent extends BaseEntityTableRowComponent<AppSourceType>{
  override configService = inject(SourceTypeConfigService);
}
