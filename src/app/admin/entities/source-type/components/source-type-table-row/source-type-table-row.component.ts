import {Component, inject, input, signal} from "@angular/core";
import {RouterLink} from "@angular/router";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeDetailsComponent} from "../source-type-details/source-type-details.component";
import {EntityTableRowComponent} from '../../../../shared/components/entity-table-row/entity-table-row.component';
import {SourceTypeActionsComponent} from '../source-type-actions/source-type-actions.component';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../shared/enums/detail-type';
import {AppSourceType} from '../../models/source-type';
import {SourceTypeConfigService} from '../../services/source-type-config.service';

@Component({
  selector: 'app-source-type-table-row',
  templateUrl: './source-type-table-row.component.html',
  imports: [
    RouterLink,
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeDetailsComponent,
    EntityTableRowComponent,
    SourceTypeActionsComponent,
  ]
})
export class SourceTypeTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(SourceTypeConfigService);

  entity = input.required<AppSourceType>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);
}
