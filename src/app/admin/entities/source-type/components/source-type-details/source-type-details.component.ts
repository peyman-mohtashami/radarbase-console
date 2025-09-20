import {Component, input} from '@angular/core';
import { AppSourceType } from "../../models/source-type";
import {SourceTypeScopeComponent} from "../source-type-scope/source-type-scope.component";
import {
  SourceTypeSourceRegistrationComponent
} from "../source-type-source-registration/source-type-source-registration.component";
import {SourceTypeSourcesDataComponent} from "../source-type-sources-data/source-type-sources-data.component";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';

@Component({
  selector: 'rb-source-type-details',
  templateUrl: './source-type-details.component.html',
  imports: [
    SourceTypeScopeComponent,
    SourceTypeSourceRegistrationComponent,
    SourceTypeSourcesDataComponent,
    DetailsComponent,
  ]
})
export class SourceTypeDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppSourceType>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
