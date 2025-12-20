import {Component, inject, input} from "@angular/core";
import {AppSubject} from "../../models/subject";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";
import {SubjectStatusComponent} from "../subject-status/subject-status.component";
import {LocalDateComponent} from "../../../../../core/locale/components/local-date/local-date.component";
import {SubjectGroupComponent} from "../subject-group/subject-group.component";
import {SubjectDetailsComponent} from "../subject-details/subject-details.component";
import {MatTooltip} from "@angular/material/tooltip";
import {TruncatePipe} from '../../../../../shared/pipes/truncate-pipe';
import {TagComponent} from '../../../../../shared/components/tag/tag.component';
import {BaseEntityComponent} from '../../../../components/entity/base-entity.component';
import {EntityComponent} from '../../../../components/entity/entity.component';
import {SelectionModel} from '@angular/cdk/collections';
import {SubjectConfigService} from '../../services/subject-config.service';
import {SubjectActionsComponent} from '../subject-actions/subject-actions.component';

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
    TruncatePipe,
    MatTooltip,
    TagComponent,
    EntityComponent,
    SubjectActionsComponent,
  ]
})
export class SubjectTableRowComponent extends BaseEntityComponent<AppSubject> {
  override configService = inject(SubjectConfigService);
  selection = input.required<SelectionModel<any>>();
}
