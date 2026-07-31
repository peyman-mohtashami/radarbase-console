import {Component, inject, input, signal} from "@angular/core";
import {AppSubject} from "../../models/subject";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {SubjectDetailsComponent} from "../subject-details/subject-details.component";
import {MatTooltip} from "@angular/material/tooltip";
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {EntityTableRowComponent} from '../../../../base-entities/components/entity-table-row/entity-table-row.component';
import {SelectionModel} from '@angular/cdk/collections';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectActionsComponent} from '../subject-actions/subject-actions.component';
import {TranslatePipe} from '@ngx-translate/core';
import {ROLES} from '../../../../../shared/enums/roles';
import {DetailType} from '../../../../base-entities/enums/detail-type';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-subject-table-row',
  templateUrl: './subject-table-row.component.html',
  imports: [
    MatCheckbox,
    RouterLink,
    SubjectStatusComponent,
    LocalDateComponent,
    SubjectGroupComponent,
    SubjectDetailsComponent,
    MatTooltip,
    TagComponent,
    EntityTableRowComponent,
    SubjectActionsComponent,
    TranslatePipe,
    AsyncPipe,
  ]
})
export class SubjectTableRowComponent {
  protected readonly ROLES = ROLES;
  protected readonly DetailType = DetailType;

  configService = inject(SubjectConfigService);

  entity = input.required<AppSubject>();
  extensionClass = input<string>();
  gridView = input<boolean>(false);

  updated = signal(false);

  selection = input.required<SelectionModel<AppSubject>>();
}
