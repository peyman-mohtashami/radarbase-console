import {Component, inject} from '@angular/core';
import { AppSourceType } from "../../models/source-type";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeSourcesDataComponent} from "../source-type-sources-data/source-type-sources-data.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {SourceConfigService} from "../../../source/services/source-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

@Component({
  selector: 'app-source-type-details',
  templateUrl: './source-type-details.component.html',
  imports: [
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeSourcesDataComponent,
    DetailsComponent,
  ]
})
export class SourceTypeDetailsComponent extends BaseDetailsComponent<AppSourceType>{
  override configService = inject(SourceConfigService);
}
