import { Component, Input } from '@angular/core';
import {DecimalPipe} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {MatProgressBar} from "@angular/material/progress-bar";
import {GarbageCollector} from '../../models/radar-metrics.model';
import {DetailElementComponent} from '../../../../base-entities/components/entity-details/detail-element/detail-element.component';

@Component({
  selector: 'app-metrics-garbage-collector',
  templateUrl: './metrics-garbage-collector.component.html',
  imports: [
    DetailElementComponent,
    TranslatePipe,
    MatProgressBar,
    DecimalPipe
  ]
})
export class MetricsGarbageCollectorComponent {

  @Input() garbageCollectorMetrics?: GarbageCollector;

}
