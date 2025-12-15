import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-subject-data-details-page',
    templateUrl: './subject-data-details-page.component.html',
})
export class SubjectDataDetailsPageComponent  {
  @Input() entity: any;
  @Input() source: any;
  @Input() index?: number;
}
