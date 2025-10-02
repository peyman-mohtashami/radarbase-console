import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {CacheMetrics} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-cache',
  templateUrl: './metrics-cache.component.html',
  imports: [
    TranslatePipe,
    KeyValuePipe,
    DecimalPipe
  ]
})
export class MetricsCacheComponent {

  @Input() cacheMetrics?: Map<string, CacheMetrics>;

}
