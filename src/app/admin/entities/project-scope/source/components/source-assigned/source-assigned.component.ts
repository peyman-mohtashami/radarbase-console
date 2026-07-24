import { Component, input, ChangeDetectionStrategy } from "@angular/core";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-source-assigned',
  templateUrl: './source-assigned.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    MatIcon
  ]
})
export class SourceAssignedComponent {
  assigned = input<boolean>()
}
