import {Component, input} from '@angular/core';
import { AppSubject } from "../../models/subject";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {ENTITY_NAME} from "../../../../enums/entities";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TableElement} from '../../../../models/table.model';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';

@Component({
  selector: 'rb-subject-details',
  templateUrl: './subject-details.component.html',
  imports: [
    LocalDateComponent,
    TagComponent,
    KeyValuePipe,
    RouterLink,
    SubjectStatusComponent,
    SubjectGroupComponent,
    DetailsComponent,
  ]
})
export class SubjectDetailsComponent {
  protected readonly DetailType = DetailType;
  protected readonly ENTITY_NAME = ENTITY_NAME;

  entity$ = input.required<AppSubject>();
  mode$ = input<DialogMode>();
  type$ = input<DetailType>();
  tableFields$ = input.required<TableElement[]>();
}
