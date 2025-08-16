import { Component, Input } from '@angular/core';
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {CacheMetrics} from '../../../../../shared/models/radar-metrics.model';

@Component({
  selector: 'rb-metrics-cache',
  templateUrl: './metrics-cache.component.html',
  imports: [
    NgIf,
    TranslatePipe,
    NgForOf,
    KeyValuePipe,
    DecimalPipe
  ]
})
export class MetricsCacheComponent {

  @Input() cacheMetrics?: Map<string, CacheMetrics>;

}
