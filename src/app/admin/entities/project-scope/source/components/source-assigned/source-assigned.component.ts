import { Component, input } from "@angular/core";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-source-assigned',
  templateUrl: './source-assigned.component.html',
  imports: [
    MatIcon
  ]
})
export class SourceAssignedComponent {
  assigned = input<boolean>()
}
