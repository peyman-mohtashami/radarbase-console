import {Component, input} from '@angular/core';

import { AppSource } from "../../models/source";
import {SourceAssignedComponent} from "../source-assigned/source-assigned.component";
import {KeyValuePipe} from "@angular/common";
import {SourceSourceTypeComponent} from "../source-source-type/source-source-type.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';

@Component({
  selector: 'rb-source-details',
  templateUrl: './source-details.component.html',
  imports: [
    SourceAssignedComponent,
    KeyValuePipe,
    SourceSourceTypeComponent,
    DetailsComponent,
  ]
})
export class SourceDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppSource>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
