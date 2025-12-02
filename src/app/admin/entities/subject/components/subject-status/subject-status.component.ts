import {Component, input} from "@angular/core";
import {DetailType} from "../../../../enums/detail-type";
import {MatTooltip} from "@angular/material/tooltip";
import {SubjectStatus} from '../../models/subject';

@Component({
  selector: 'app-subject-status',
  templateUrl: './subject-status.component.html',
  imports: [
    MatTooltip
  ]
})
export class SubjectStatusComponent {
  protected readonly SubjectStatus = SubjectStatus;
  protected readonly DetailType = DetailType;

  status = input<SubjectStatus>();
  detailType = input<DetailType>();
}
