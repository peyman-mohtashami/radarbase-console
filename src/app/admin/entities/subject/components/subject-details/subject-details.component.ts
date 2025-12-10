import {Component, inject} from '@angular/core';
import { AppSubject } from "../../models/subject";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {DetailsComponent} from "../../../../components/details/details.component";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {SubjectConfigService} from "../../services/subject-config.service";
import {BaseDetailsComponent} from '../../../../components/details/base-details.component';

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
export class SubjectDetailsComponent extends BaseDetailsComponent<AppSubject> {
  override configService = inject(SubjectConfigService);
}
