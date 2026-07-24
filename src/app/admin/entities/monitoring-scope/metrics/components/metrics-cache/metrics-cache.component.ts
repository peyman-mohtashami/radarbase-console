import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {DecimalPipe, KeyValuePipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {CacheMetrics} from '../../models/radar-metrics.model';

@Component({
  selector: 'app-metrics-cache',
  templateUrl: './metrics-cache.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    TranslatePipe,
    KeyValuePipe,
    DecimalPipe
  ]
})
export class MetricsCacheComponent {

  @Input() cacheMetrics?: Map<string, CacheMetrics>;

}
