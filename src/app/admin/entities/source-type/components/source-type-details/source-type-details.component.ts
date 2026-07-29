import {Component, inject, input} from '@angular/core';
import { AppSourceType } from "../../models/source-type";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeSourcesDataComponent} from "../source-type-sources-data/source-type-sources-data.component";
import {EntityDetailsComponent} from "../../../../base-entities/components/entity-details/entity-details.component";
import {SourceTypeConfigService} from '../../services/source-type-config.service';
import {DetailType} from '../../../../base-entities/enums/detail-type';

@Component({
  selector: 'app-source-type-details',
  templateUrl: './source-type-details.component.html',
  imports: [
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeSourcesDataComponent,
    EntityDetailsComponent,
  ]
})
export class SourceTypeDetailsComponent {
  configService = inject(SourceTypeConfigService);

  entity = input.required<AppSourceType | undefined>();
  detailType = input<DetailType>();
}
