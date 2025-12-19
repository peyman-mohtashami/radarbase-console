import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {HttpServerRequests} from '../../models/radar-metrics.model';

@Component({
  selector: 'app-metrics-request',
  templateUrl: './metrics-request.component.html',
  imports: [
    MatProgressBar,
    KeyValuePipe,
    DecimalPipe
  ]
})
export class MetricsRequestComponent {

  @Input() requestMetrics?: HttpServerRequests;

}
