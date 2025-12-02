import {Component, inject, input} from '@angular/core';
import { AppSubject } from "../../models/subject";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {DialogMode} from "../../../../enums/dialog";
import {DetailType} from "../../../../enums/detail-type";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {SubjectConfigService} from "../../services/subject-config.service";

@Component({
  selector: 'app-subject-details',
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

  protected configService = inject(SubjectConfigService);

  entity = input.required<AppSubject>();
  dialogMode = input<DialogMode>();
  detailType = input<DetailType>();
}
