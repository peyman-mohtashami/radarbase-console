import {Component, inject} from "@angular/core";
import {RouterLink} from "@angular/router";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeDetailsComponent} from "../source-type-details/source-type-details.component";
import {ActionsComponent} from '../actions/actions.component';
import {AppSourceType} from '../../models/source-type';
import {SourceTypeConfigService} from "../../services/source-type-config.service";
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';

@Component({
  selector: 'app-source-type-table-row',
  templateUrl: './source-type-table-row.component.html',
  imports: [
    RouterLink,
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeDetailsComponent,
    ActionsComponent,
    ActionsComponent,
    EntityComponent,
  ]
})
export class SourceTypeTableRowComponent extends BaseEntityComponent<AppSourceType>{
  override configService = inject(SourceTypeConfigService);
}
