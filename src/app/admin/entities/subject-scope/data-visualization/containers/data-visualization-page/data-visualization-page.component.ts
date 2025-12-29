import {Component, Input} from "@angular/core";

@Component({
    selector: 'app-subject-data-details-page',
    templateUrl: './data-visualization-page.component.html',
})
export class DataVisualizationPageComponent {
  @Input() entity: any;
  @Input() source: any;
  @Input() index?: number;
}
