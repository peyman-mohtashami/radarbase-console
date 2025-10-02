import { Component, Input } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {Databases} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-datasource',
  templateUrl: './metrics-datasource.component.html',
  imports: [
    TranslatePipe,
    DecimalPipe
  ]
})
export class MetricsDatasourceComponent {

  @Input() datasourceMetrics?: Databases;
}
