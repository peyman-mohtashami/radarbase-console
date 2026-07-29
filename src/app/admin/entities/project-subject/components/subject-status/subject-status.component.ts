import {Component, input} from "@angular/core";
import {DetailType} from "../../../../base-entities/enums/detail-type";
import {MatTooltip} from "@angular/material/tooltip";
import {SubjectStatus} from '../../models/subject';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-subject-status',
  templateUrl: './subject-status.component.html',
  imports: [
    MatTooltip,
    MatIcon
  ]
})
export class SubjectStatusComponent {
  protected readonly SubjectStatus = SubjectStatus;
  protected readonly DetailType = DetailType;

  status = input<SubjectStatus>();
  detailType = input<DetailType>();
}
