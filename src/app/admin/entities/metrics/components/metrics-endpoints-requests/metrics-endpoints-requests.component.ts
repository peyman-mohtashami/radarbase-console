import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {HttpMethod, MaxMeanCount} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-endpoints-requests',
  templateUrl: './metrics-endpoints-requests.component.html',
  imports: [
    NgForOf,
    DecimalPipe,
    NgIf,
    KeyValuePipe
  ]
})
export class MetricsEndpointsRequestsComponent {

  @Input() endpointsRequestsMetrics?: Map<string, Map<HttpMethod, MaxMeanCount>>;

}
