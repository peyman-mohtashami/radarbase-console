import {Component, inject} from '@angular/core';
import { AppSubject } from "../../models/subject";
import {LocalDateComponent} from "../../../../../../core/locale/components/local-date/local-date.component";
import {KeyValuePipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {EntityDetailsComponent} from "../../../../../base-entities/components/entity-details/entity-details.component";
import {TagComponent} from '../../../../../../shared/components/tag/tag.component';
import {SubjectConfigService} from "../../services/subject-config.service";
import {BaseEntityDetailsComponent} from '../../../../../base-entities/components/entity-details/base-entity-details.component';

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
    EntityDetailsComponent,
  ]
})
export class SubjectDetailsComponent extends BaseEntityDetailsComponent<AppSubject> {
  override configService = inject(SubjectConfigService);
}
