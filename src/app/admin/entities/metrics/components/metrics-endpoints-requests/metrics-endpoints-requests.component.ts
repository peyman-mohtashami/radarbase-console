import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe} from "@angular/common";
import {HttpMethod, MaxMeanCount} from '../../models/radar-metrics.model';

@Component({
  selector: 'app-metrics-endpoints-requests',
  templateUrl: './metrics-endpoints-requests.component.html',
  imports: [
    DecimalPipe,
    KeyValuePipe
  ]
})
export class MetricsEndpointsRequestsComponent {

  @Input() endpointsRequestsMetrics?: Map<string, Map<HttpMethod, MaxMeanCount>>;

}
